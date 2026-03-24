import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { group } from "@/db/schema";
import { uploadFile } from "@/lib/minio";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const groups = await db.query.group.findMany({
      orderBy: [desc(group.createdAt)],
      with: {
        createdBy: {
          columns: {
            id: true,
            name: true,
            image: true,
          },
        },
        uploads: true,
      },
    });

    return NextResponse.json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    return NextResponse.json(
      { error: "Failed to fetch groups" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get("name");
    const imageFile = formData.get("image");

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Group name is required" },
        { status: 400 }
      );
    }

    let imageUrl = null;

    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      const ext = imageFile.name.split(".").pop();
      const fileName = `groups/${crypto.randomUUID()}.${ext}`;
      imageUrl = await uploadFile(imageFile, fileName);
    }

    const [newGroup] = await db
      .insert(group)
      .values({
        name: name.trim(),
        imageUrl,
        createdById: session.user.id,
      })
      .returning();

    return NextResponse.json(newGroup, { status: 201 });
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { error: "Failed to create group" },
      { status: 500 }
    );
  }
}
