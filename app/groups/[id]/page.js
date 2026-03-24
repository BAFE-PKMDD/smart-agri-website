"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginButton from "@/components/login-button";
import UploadDialog from "@/components/upload-dialog";
import { useSession } from "@/lib/auth-client";
import { MODULE_DATA } from "@/data/modules";

export default function GroupDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: session } = useSession();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deletingUploadId, setDeletingUploadId] = useState(null);
  const [activeModule, setActiveModule] = useState(null);

  const fetchGroup = useCallback(async () => {
    try {
      const res = await fetch(`/api/groups/${id}`);
      if (res.ok) {
        const data = await res.json();
        setGroup(data);
      }
    } catch (error) {
      console.error("Failed to fetch group:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchGroup();
  }, [fetchGroup]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${group.name}"? This will permanently remove the group and all its uploads.`
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/groups/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/groups");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete group");
      }
    } catch (error) {
      console.error("Error deleting group:", error);
      alert("Failed to delete group");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteUpload = async (uploadId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this upload?"
    );
    if (!confirmed) return;

    setDeletingUploadId(uploadId);
    try {
      const res = await fetch(`/api/groups/${id}/uploads/${uploadId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchGroup();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete upload");
      }
    } catch (error) {
      console.error("Error deleting upload:", error);
      alert("Failed to delete upload");
    } finally {
      setDeletingUploadId(null);
    }
  };

  const isCreator = session?.user?.id === group?.createdById;

  if (loading) {
    return (
      <div className="groups-page">
        <div className="container">
          <div className="groups-page__loading">Loading group...</div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="groups-page">
        <div className="container">
          <div className="groups-page__empty">Group not found.</div>
        </div>
      </div>
    );
  }

  const uploadsForModule = (slug) =>
    group.uploads?.filter((u) => u.moduleSlug === slug) || [];

  return (
    <div className="groups-page">
      <header className="groups-page__header">
        <div className="container">
          <div className="groups-page__header-row">
            <Link href="/groups" className="module-page__back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              All Groups
            </Link>
            <LoginButton />
          </div>
        </div>
      </header>

      <main className="groups-page__body">
        <div className="container">
          {/* Group Header */}
          <div className="group-detail__hero">
            <div className="group-detail__img-wrap">
              {group.imageUrl ? (
                <img
                  src={group.imageUrl}
                  alt={group.name}
                  className="group-detail__img"
                />
              ) : (
                <div className="group-card__placeholder group-card__placeholder--lg">
                  {group.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h1 className="groups-page__title">{group.name}</h1>
              <p className="groups-page__subtitle">
                Created by {group.createdBy?.name || "Unknown"} •{" "}
                {group.uploads?.length || 0} uploads
              </p>
            </div>
            {isCreator && (
              <button
                className="group-detail__delete-btn"
                onClick={handleDelete}
                disabled={deleting}
                title="Delete this group"
                type="button"
              >
                {deleting ? (
                  <span className="group-detail__delete-spinner" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                )}
                {deleting ? "Deleting..." : "Delete Group"}
              </button>
            )}
          </div>

          {/* Module Grid */}
          <h2 className="group-detail__section-title">Module Uploads</h2>
          <div className="group-modules-grid">
            {MODULE_DATA.map((mod) => {
              const uploads = uploadsForModule(mod.slug);
              const isActive = activeModule === mod.slug;

              return (
                <div key={mod.slug} className="group-module-card">
                  <button
                    className={`group-module-card__header ${isActive ? "group-module-card__header--active" : ""}`}
                    onClick={() =>
                      setActiveModule(isActive ? null : mod.slug)
                    }
                    type="button"
                  >
                    <div>
                      <span className="group-module-card__id">
                        Module {mod.id}
                      </span>
                      <h3 className="group-module-card__title">{mod.title}</h3>
                    </div>
                    <span className="group-module-card__count">
                      {uploads.length} 📷
                    </span>
                  </button>

                  {isActive && (
                    <div className="group-module-card__body">
                      {session?.user && (
                        <div className="group-module-card__upload-row">
                          <UploadDialog
                            groupId={id}
                            moduleSlug={mod.slug}
                            moduleName={mod.title}
                            onUploaded={fetchGroup}
                          />
                        </div>
                      )}

                      {uploads.length === 0 ? (
                        <p className="group-module-card__empty">
                          No uploads yet for this module.
                        </p>
                      ) : (
                        <div className="group-uploads-grid">
                          {uploads.map((upload) => (
                            <div key={upload.id} className="group-upload-card">
                              <div className="group-upload-card__img-wrap">
                                <img
                                  src={upload.imageUrl}
                                  alt={upload.description || "Module upload"}
                                  className="group-upload-card__img"
                                />
                                {session?.user?.id === upload.uploadedById && (
                                  <button
                                    className="group-upload-card__delete"
                                    onClick={() => handleDeleteUpload(upload.id)}
                                    disabled={deletingUploadId === upload.id}
                                    title="Delete this upload"
                                    type="button"
                                  >
                                    {deletingUploadId === upload.id ? (
                                      <span className="group-detail__delete-spinner" />
                                    ) : (
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                      </svg>
                                    )}
                                  </button>
                                )}
                              </div>
                              {upload.description && (
                                <p className="group-upload-card__desc">
                                  {upload.description}
                                </p>
                              )}
                              <span className="group-upload-card__meta">
                                by {upload.uploadedBy?.name || "Unknown"}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

