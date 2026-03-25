import * as Minio from "minio";

const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || "localhost";
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY || "minioadmin";
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY || "minioadmin";
const MINIO_USE_SSL = process.env.MINIO_USE_SSL === "true";

export const BUCKET_NAME = process.env.MINIO_BUCKET || "smart-agri-uploads";

// Only set port if explicitly provided in env var
// If not provided, MinIO client will use standard ports (80 for HTTP, 443 for HTTPS)
const minioConfig = {
  endPoint: MINIO_ENDPOINT,
  useSSL: MINIO_USE_SSL,
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_KEY,
  ...(process.env.MINIO_PORT && { port: Number(process.env.MINIO_PORT) }),
};

export const minioClient = new Minio.Client(minioConfig);

export async function ensureBucket() {
  const exists = await minioClient.bucketExists(BUCKET_NAME);
  if (!exists) {
    await minioClient.makeBucket(BUCKET_NAME);
    // Set public read policy
    const policy = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: { AWS: ["*"] },
          Action: ["s3:GetObject"],
          Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
        },
      ],
    };
    await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
  }
}

export async function uploadFile(file, fileName) {
  await ensureBucket();
  const buffer = Buffer.from(await file.arrayBuffer());
  await minioClient.putObject(BUCKET_NAME, fileName, buffer, buffer.length, {
    "Content-Type": file.type,
  });

  return getPublicUrl(fileName);
}

export function getPublicUrl(fileName) {
  const protocol = MINIO_USE_SSL ? "https" : "http";
  return `${protocol}://${MINIO_ENDPOINT}/${BUCKET_NAME}/${fileName}`;
}

const PRESIGN_EXPIRY_SECONDS = 600; // 10 minutes

export async function getPresignedUploadUrl(fileName, contentType) {
  await ensureBucket();
  const url = await minioClient.presignedPutObject(
    BUCKET_NAME,
    fileName,
    PRESIGN_EXPIRY_SECONDS
  );
  return url;
}

export async function deleteFile(fileName) {
  await minioClient.removeObject(BUCKET_NAME, fileName);
}
