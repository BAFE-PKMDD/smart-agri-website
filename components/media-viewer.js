"use client";

import { useEffect, useCallback } from "react";
import { isVideoUrl } from "@/src/constants/upload";

export default function MediaViewer({ url, alt, onClose }) {
  const isVideo = isVideoUrl(url);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div className="media-viewer" onClick={onClose}>
      <button className="media-viewer__close" onClick={onClose} type="button">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div
        className="media-viewer__content"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <video
            src={url}
            controls
            autoPlay
            className="media-viewer__media"
          />
        ) : (
          <img src={url} alt={alt || "Uploaded media"} className="media-viewer__media" />
        )}
      </div>
    </div>
  );
}
