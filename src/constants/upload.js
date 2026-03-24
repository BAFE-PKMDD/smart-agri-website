export const MAX_UPLOAD_SIZE_BYTES = 20 * 1024 * 1024; // 20MB
export const MAX_UPLOAD_SIZE_LABEL = "20MB";
export const ACCEPTED_FILE_TYPES = "image/*,video/*";
export const VIDEO_EXTENSIONS = ["mp4", "mov", "webm", "avi", "mkv"];

export function isVideoUrl(url) {
  if (!url) return false;
  const ext = url.split(".").pop()?.toLowerCase();
  return VIDEO_EXTENSIONS.includes(ext);
}
