"use client";

import { useState, useEffect, useCallback } from "react";
import { isVideoUrl } from "@/src/constants/upload";

export default function MediaViewer({ mediaList, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  
  const currentMedia = mediaList[currentIndex];
  const isVideo = currentMedia ? isVideoUrl(currentMedia.url) : false;

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    if (currentIndex < mediaList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, mediaList.length]);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
    },
    [onClose, handleNext, handlePrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!currentMedia) return null;

  const handleDownload = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(currentMedia.url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      const fileName = currentMedia.url.split('/').pop() || "download";
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="media-viewer" onClick={onClose}>
      <div className="media-viewer__actions" onClick={(e) => e.stopPropagation()}>
        <button 
          className="media-viewer__btn media-viewer__download" 
          onClick={handleDownload} 
          title="Download" 
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
        <button className="media-viewer__btn media-viewer__close" onClick={onClose} title="Close" type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {currentIndex > 0 && (
        <button className="media-viewer__nav media-viewer__nav--prev" onClick={handlePrev} type="button">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {currentIndex < mediaList.length - 1 && (
        <button className="media-viewer__nav media-viewer__nav--next" onClick={handleNext} type="button">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      <div
        className="media-viewer__content"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <video
            src={currentMedia.url}
            controls
            autoPlay
            className="media-viewer__media"
          />
        ) : (
          <div className="media-viewer__img-container">
            <img src={currentMedia.url} alt={currentMedia.alt || "Uploaded media"} className="media-viewer__media" />
            {currentMedia.alt && (
              <div className="media-viewer__caption">{currentMedia.alt}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
