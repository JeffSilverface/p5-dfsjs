"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/molecules/cards/postCard";
import { usePosts } from "@/hooks/usePosts";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

export default function Feed() {
  const { data: posts, isLoading, isError } = usePosts();
  const [order, setOrder] = useState<"desc" | "asc">("desc");

  const sortedPosts = useMemo(() => {
    if (!posts) return [];
    return [...posts].sort((a, b) => {
      const diff =
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return order === "desc" ? -diff : diff;
    });
  }, [posts, order]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Link href="/post/new">
          <Button>Créer un post</Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOrder((o) => (o === "desc" ? "asc" : "desc"))}
        >
          Trier par
          {order === "desc" ? (
            <ArrowDownIcon className="mr-1 h-4 w-4" />
          ) : (
            <ArrowUpIcon className="mr-1 h-4 w-4" />
          )}
        </Button>
      </div>
      {isLoading && <p>Chargement...</p>}
      {isError && <p>Erreur lors du chargement des posts.</p>}
      {!isLoading && !isError && posts?.length === 0 && (
        <p>Aucun post disponible.</p>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {sortedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
