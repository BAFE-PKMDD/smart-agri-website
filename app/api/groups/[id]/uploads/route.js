import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { groupUpload } from "@/db/schema";
import { uploadFile } from "@/lib/minio";
import { eq, and, desc } from "drizzle-orm";
import { MAX_UPLOAD_SIZE_BYTES, MAX_UPLOAD_SIZE_LABEL } from "@/src/constants/upload";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const moduleSlug = searchParams.get("moduleSlug");

    const conditions = [eq(groupUpload.groupId, id)];
    if (moduleSlug) {
      conditions.push(eq(groupUpload.moduleSlug, moduleSlug));
    }

    const uploads = await db.query.groupUpload.findMany({
      where: and(...conditions),
      orderBy: [desc(groupUpload.uploadedAt)],
      with: {
        uploadedBy: {
          columns: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(uploads);
  } catch (error) {
    console.error("Error fetching uploads:", error);
    return NextResponse.json(
      { error: "Failed to fetch uploads" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const formData = await request.formData();
    const uploadedFile = formData.get("file");
    const moduleSlug = formData.get("moduleSlug");
    const description = formData.get("description");

    if (!uploadedFile || !(uploadedFile instanceof File) || uploadedFile.size === 0) {
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 }
      );
    }

    // Validate file size (20MB)
    if (uploadedFile.size > MAX_UPLOAD_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_UPLOAD_SIZE_LABEL}.` },
        { status: 400 }
      );
    }

    // Validate MIME type
    const mimeType = uploadedFile.type || "";
    if (!mimeType.startsWith("image/") && !mimeType.startsWith("video/")) {
      return NextResponse.json(
        { error: "Only image and video files are allowed." },
        { status: 400 }
      );
    }

    if (!moduleSlug || typeof moduleSlug !== "string") {
      return NextResponse.json(
        { error: "Module slug is required" },
        { status: 400 }
      );
    }

    const ext = uploadedFile.name.split(".").pop();
    const fileName = `uploads/${id}/${moduleSlug}/${crypto.randomUUID()}.${ext}`;
    const imageUrl = await uploadFile(uploadedFile, fileName);

    const [upload] = await db
      .insert(groupUpload)
      .values({
        groupId: id,
        moduleSlug,
        imageUrl,
        description: description || null,
        uploadedById: session.user.id,
      })
      .returning();

    return NextResponse.json(upload, { status: 201 });
  } catch (error) {
    console.error("Error uploading:", error);
    return NextResponse.json(
      { error: "Failed to upload" },
      { status: 500 }
    );
  }
}
