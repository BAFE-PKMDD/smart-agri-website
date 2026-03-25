"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import LoginButton from "@/components/login-button";
import CreateGroupDialog from "@/components/create-group-dialog";
import LoadingScreen from "@/components/loading-screen";
import { useSession } from "@/lib/auth-client";

export default function GroupsPage() {
  const { data: session } = useSession();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGroups = useCallback(async () => {
    try {
      const res = await fetch("/api/groups");
      if (res.ok) {
        const data = await res.json();
        setGroups(data);
      }
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return (
    <div className="groups-page">
      <header className="groups-page__header">
        <div className="container">
          <div className="groups-page__header-row">
            <Link href="/" className="module-page__back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Home
            </Link>
            <LoginButton />
          </div>
        </div>
      </header>

      <main className="groups-page__body">
        <div className="container">
          <div className="groups-page__title-row">
            <div>
              <h1 className="groups-page__title">Training Groups</h1>
              <p className="groups-page__subtitle">
                View team groups, their module uploads, and documentation from the workshop.
              </p>
            </div>
            {session?.user && (
              <CreateGroupDialog onCreated={fetchGroups} />
            )}
          </div>

          {loading ? (
            <LoadingScreen message="Loading groups..." />
          ) : groups.length === 0 ? (
            <div className="groups-page__empty">
              <p>No groups yet. {session?.user ? "Create the first one!" : "Sign in to create a group."}</p>
            </div>
          ) : (
            <div className="groups-grid">
              {groups.map((group) => (
                <Link
                  key={group.id}
                  href={`/groups/${group.id}`}
                  className="group-card"
                >
                  <div className="group-card__img-wrap">
                    {group.imageUrl ? (
                      <img
                        src={group.imageUrl}
                        alt={group.name}
                        className="group-card__img"
                      />
                    ) : (
                      <div className="group-card__placeholder">
                        {group.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="group-card__body">
                    <h3 className="group-card__name">{group.name}</h3>
                    <div className="group-card__meta">
                      <span>{group.uploads?.length || 0} uploads</span>
                      <span>by {group.createdBy?.name || "Unknown"}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
