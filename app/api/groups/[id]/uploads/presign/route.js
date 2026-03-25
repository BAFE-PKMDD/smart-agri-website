import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getPresignedUploadUrl, getPublicUrl } from "@/lib/minio";
import { MAX_UPLOAD_SIZE_BYTES, MAX_UPLOAD_SIZE_LABEL } from "@/src/constants/upload";

export async function POST(request, { params }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { fileName: originalName, contentType, fileSize, moduleSlug } = body;

    if (!originalName || !contentType || !moduleSlug) {
      return NextResponse.json(
        { error: "fileName, contentType, and moduleSlug are required" },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (!contentType.startsWith("image/") && !contentType.startsWith("video/")) {
      return NextResponse.json(
        { error: "Only image and video files are allowed." },
        { status: 400 }
      );
    }

    // Validate file size
    if (fileSize && fileSize > MAX_UPLOAD_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_UPLOAD_SIZE_LABEL}.` },
        { status: 400 }
      );
    }

    const ext = originalName.split(".").pop();
    const objectKey = `uploads/${id}/${moduleSlug}/${crypto.randomUUID()}.${ext}`;

    const presignedUrl = await getPresignedUploadUrl(objectKey, contentType);
    const publicUrl = getPublicUrl(objectKey);

    return NextResponse.json({
      presignedUrl,
      publicUrl,
      objectKey,
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
