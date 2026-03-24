"use client";

import { useState } from "react";

export default function UploadDialog({ groupId, moduleSlug, moduleName, onUploaded }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
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
        setImageFile(null);
        setImagePreview(null);
        setOpen(false);
        onUploaded?.();
      }
    } catch (error) {
      console.error("Failed to upload:", error);
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
        📷 Upload Photo
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
            <label className="form-field__label" htmlFor="upload-image">
              Photo
            </label>
            <input
              id="upload-image"
              type="file"
              className="form-field__input"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
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
              disabled={loading || !imageFile}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
