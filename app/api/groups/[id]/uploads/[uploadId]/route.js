import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { groupUpload } from "@/db/schema";
import { eq } from "drizzle-orm";
import { deleteFile } from "@/lib/minio";

export async function DELETE(request, { params }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, uploadId } = await params;

    const upload = await db.query.groupUpload.findFirst({
      where: eq(groupUpload.id, uploadId),
    });

    if (!upload) {
      return NextResponse.json({ error: "Upload not found" }, { status: 404 });
    }

    if (upload.groupId !== id) {
      return NextResponse.json({ error: "Upload does not belong to this group" }, { status: 400 });
    }

    // Only the uploader can delete their upload
    if (upload.uploadedById !== session.user.id) {
      return NextResponse.json(
        { error: "Only the uploader can delete this upload" },
        { status: 403 }
      );
    }

    // Clean up file from MinIO (best-effort)
    if (upload.imageUrl) {
      try {
        const url = new URL(upload.imageUrl);
        const key = url.pathname.split("/").slice(2).join("/");
        if (key) await deleteFile(key);
      } catch {
        // If it's already a key, try as-is
        try {
          await deleteFile(upload.imageUrl);
        } catch {
          // Best-effort cleanup
        }
      }
    }

    await db.delete(groupUpload).where(eq(groupUpload.id, uploadId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting upload:", error);
    return NextResponse.json(
      { error: "Failed to delete upload" },
      { status: 500 }
    );
  }
}
