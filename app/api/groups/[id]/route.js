import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { group } from "@/db/schema";
import { eq } from "drizzle-orm";
import { deleteFile } from "@/lib/minio";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const result = await db.query.group.findFirst({
      where: eq(group.id, id),
      with: {
        createdBy: {
          columns: {
            id: true,
            name: true,
            image: true,
          },
        },
        uploads: {
          with: {
            uploadedBy: {
              columns: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!result) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching group:", error);
    return NextResponse.json(
      { error: "Failed to fetch group" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await db.query.group.findFirst({
      where: eq(group.id, id),
    });

    if (!existing) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    if (existing.createdById !== session.user.id) {
      return NextResponse.json(
        { error: "Only the group creator can edit this group" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const updates = {};

    if (typeof body.description === "string") {
      updates.description = body.description || null;
    }
    if (typeof body.memberNames === "string") {
      updates.memberNames = body.memberNames || null;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    await db.update(group).set(updates).where(eq(group.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating group:", error);
    return NextResponse.json(
      { error: "Failed to update group" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Fetch group with uploads to clean up files
    const existing = await db.query.group.findFirst({
      where: eq(group.id, id),
      with: { uploads: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    // Only the creator can delete the group
    if (existing.createdById !== session.user.id) {
      return NextResponse.json(
        { error: "Only the group creator can delete this group" },
        { status: 403 }
      );
    }

    // Clean up files from MinIO (best-effort, don't block delete on failure)
    const filesToDelete = [];

    if (existing.imageUrl) {
      // Extract the object key from the full URL (e.g. "groups/uuid.png")
      try {
        const url = new URL(existing.imageUrl);
        const key = url.pathname.split("/").slice(2).join("/");
        if (key) filesToDelete.push(key);
      } catch {
        // If it's already a key, use as-is
        filesToDelete.push(existing.imageUrl);
      }
    }

    for (const upload of existing.uploads || []) {
      if (upload.imageUrl) {
        try {
          const url = new URL(upload.imageUrl);
          const key = url.pathname.split("/").slice(2).join("/");
          if (key) filesToDelete.push(key);
        } catch {
          filesToDelete.push(upload.imageUrl);
        }
      }
    }

    // Delete files in parallel (best-effort)
    await Promise.allSettled(filesToDelete.map((key) => deleteFile(key)));

    // Delete group (uploads cascade automatically via schema)
    await db.delete(group).where(eq(group.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting group:", error);
    return NextResponse.json(
      { error: "Failed to delete group" },
      { status: 500 }
    );
  }
}
