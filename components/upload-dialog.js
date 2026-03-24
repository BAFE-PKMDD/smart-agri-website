"use client";

import { useState } from "react";
import {
  MAX_UPLOAD_SIZE_BYTES,
  MAX_UPLOAD_SIZE_LABEL,
  ACCEPTED_FILE_TYPES,
} from "@/src/constants/upload";

export default function UploadDialog({ groupId, moduleSlug, moduleName, onUploaded }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null); // "image" or "video"
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    setError("");
    if (!selected) return;

    if (selected.size > MAX_UPLOAD_SIZE_BYTES) {
      setError(`File too large. Maximum size is ${MAX_UPLOAD_SIZE_LABEL}.`);
      e.target.value = "";
      return;
    }

    setFile(selected);
    setFilePreview(URL.createObjectURL(selected));
    setFileType(selected.type.startsWith("video") ? "video" : "image");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("moduleSlug", moduleSlug);
      if (description.trim()) {
        formData.append("description", description.trim());
      }

      const res = await fetch(`/api/groups/${groupId}/uploads`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setDescription("");
        setFile(null);
        setFilePreview(null);
        setFileType(null);
        setError("");
        setOpen(false);
        onUploaded?.();
      } else {
        const data = await res.json();
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Failed to upload:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        className="btn btn--primary btn--sm"
        onClick={() => setOpen(true)}
        type="button"
      >
        Upload File
      </button>
    );
  }

  return (
    <div className="dialog-overlay" onClick={() => setOpen(false)}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog__header">
          <h3 className="dialog__title">Upload for {moduleName}</h3>
          <button
            className="dialog__close"
            onClick={() => setOpen(false)}
            type="button"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="dialog__form">
          <div className="form-field">
            <label className="form-field__label" htmlFor="upload-file">
              Photo / Video
              <span className="form-field__hint">Max {MAX_UPLOAD_SIZE_LABEL}</span>
            </label>
            <input
              id="upload-file"
              type="file"
              className="form-field__input"
              accept={ACCEPTED_FILE_TYPES}
              onChange={handleFileChange}
              required
            />
            {error && <p className="form-field__error">{error}</p>}
            {filePreview && fileType === "image" && (
              <img
                src={filePreview}
                alt="Preview"
                className="form-field__preview"
              />
            )}
            {filePreview && fileType === "video" && (
              <video
                src={filePreview}
                controls
                className="form-field__preview"
              />
            )}
          </div>

          <div className="form-field">
            <label className="form-field__label" htmlFor="upload-desc">
              Description (optional)
            </label>
            <textarea
              id="upload-desc"
              className="form-field__textarea"
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="dialog__actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={loading || !file}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
