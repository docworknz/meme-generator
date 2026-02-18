"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/db";
import { AppShell } from "../components/AppShell";
import { Login } from "../components/Login";
import { id } from "@instantdb/react";

function GalleryContent() {
  const user = db.useUser();
  const [fullscreenMemeId, setFullscreenMemeId] = useState<string | null>(null);

  const { isLoading, error, data } = db.useQuery({
    memes: {
      image: {},
      author: {},
      upvotes: { $user: {} },
      $: { order: { serverCreatedAt: "desc" } },
    },
  });

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreenMemeId(null);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-[var(--muted)]">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-400">
        Error: {error.message}
      </div>
    );
  }

  const memes = data?.memes ?? [];
  const fullscreenMeme = fullscreenMemeId
    ? memes.find((m) => m.id === fullscreenMemeId)
    : null;

  const toggleUpvote = async (memeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user?.id) return;
    const meme = memes.find((m) => m.id === memeId);
    if (!meme?.upvotes) return;
    const existing = meme.upvotes.find(
      (u: { $user?: { id: string } }) => u.$user?.id === user.id
    );
    if (existing) {
      await db.transact(db.tx.upvotes[existing.id].delete());
    } else {
      const upvoteId = id();
      await db.transact(
        db.tx.upvotes[upvoteId].update({}).link({ meme: memeId, $user: user.id })
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-lg font-semibold text-[var(--text)] mb-4">Gallery</h1>
      {memes.length === 0 ? (
        <p className="text-[var(--muted)]">No memes yet. Create one from the Create page.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {memes.map((meme) => {
            const imageUrl = meme.image?.url;
            const upvoteCount = meme.upvotes?.length ?? 0;
            const hasUpvoted = meme.upvotes?.some(
              (u: { $user?: { id: string } }) => u.$user?.id === user?.id
            );
            return (
              <article
                key={meme.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full block text-left cursor-pointer focus:outline-none focus:ring-0"
                  onClick={() => setFullscreenMemeId(meme.id)}
                  aria-label="View full screen"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Meme"
                      className="w-full aspect-auto object-contain bg-[#1a1a1a]"
                    />
                  ) : (
                    <div className="w-full aspect-video bg-[#2a2a2a] flex items-center justify-center text-[var(--muted)] text-sm">
                      Loading image...
                    </div>
                  )}
                </button>
                <div className="p-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => toggleUpvote(meme.id, e)}
                    disabled={!user?.id}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      hasUpvoted
                        ? "text-[var(--accent)]"
                        : "text-[var(--muted)] hover:text-[var(--text)]"
                    }`}
                    title={user ? (hasUpvoted ? "Remove upvote" : "Upvote") : "Sign in to upvote"}
                  >
                    <span className="tabular-nums">{upvoteCount}</span>
                    <span>upvote</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {fullscreenMeme && fullscreenMeme.image?.url && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setFullscreenMemeId(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Meme full screen"
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-[var(--text)] text-sm font-medium hover:text-[var(--accent)] transition-colors z-10"
            onClick={() => setFullscreenMemeId(null)}
            aria-label="Close"
          >
            Close
          </button>
          <img
            src={fullscreenMeme.image.url}
            alt="Meme"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default function GalleryPage() {
  return (
    <>
      <db.SignedIn>
        <AppShell>
          <GalleryContent />
        </AppShell>
      </db.SignedIn>
      <db.SignedOut>
        <Login />
      </db.SignedOut>
    </>
  );
}
