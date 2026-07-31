"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  slug: string;
  initialLikes: number;
}

export function LikeButton({ slug, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const storageKey = `dtai-liked-${slug}`;

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(storageKey)) {
      setLiked(true);
    }
  }, [storageKey]);

  async function handleLike() {
    if (liked || loading) return;
    setLoading(true);

    // optimistic update
    setLikes((n) => n + 1);
    setLiked(true);
    localStorage.setItem(storageKey, "1");

    try {
      const res = await fetch("/api/insights/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      if (typeof data.likes === "number") setLikes(data.likes);
    } catch {
      // revert on failure
      setLikes((n) => Math.max(0, n - 1));
      setLiked(false);
      localStorage.removeItem(storageKey);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={liked || loading}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-micro ${
        liked
          ? "border-tech-blue bg-tech-blue/10 text-tech-blue"
          : "border-neutral-300/60 text-neutral-600 hover:border-tech-blue hover:text-tech-blue"
      }`}
      aria-pressed={liked}
    >
      <Heart size={16} className={liked ? "fill-tech-blue text-tech-blue" : ""} />
      {likes} {likes === 1 ? "Like" : "Likes"}
    </button>
  );
}
