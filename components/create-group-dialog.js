"use client";

import { useState } from "react";

export default function CreateGroupDialog({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
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
    if (!name.trim()) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/groups", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setName("");
        setImageFile(null);
        setImagePreview(null);
        setOpen(false);
        onCreated?.();
      }
    } catch (error) {
      console.error("Failed to create group:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        className="btn btn--primary"
        onClick={() => setOpen(true)}
        type="button"
      >
        + Create Group
      </button>
    );
  }

  return (
    <div className="dialog-overlay" onClick={() => setOpen(false)}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog__header">
          <h3 className="dialog__title">Create Group</h3>
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
            <label className="form-field__label" htmlFor="group-name">
              Group Name
            </label>
            <input
              id="group-name"
              type="text"
              className="form-field__input"
              placeholder="e.g. Team Alpha"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-field__label" htmlFor="group-image">
              Group Photo
            </label>
            <input
              id="group-image"
              type="file"
              className="form-field__input"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="form-field__preview"
              />
            )}
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
              disabled={loading || !name.trim()}
            >
              {loading ? "Creating..." : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
