"use client";

import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/molecules/cards/postCard";
import { usePosts } from "@/hooks/usePosts";
import Link from "next/link";

export default function Feed() {
  const { data: posts, isLoading, isError } = usePosts();

  return (
    <div>
      <Link href="/post/new">
        <Button className="mb-4">Créer un post</Button>
      </Link>
      {isLoading && <p>Chargement...</p>}
      {isError && <p>Erreur lors du chargement des posts.</p>}
      {!isLoading && !isError && posts?.length === 0 && (
        <p>Aucun post disponible.</p>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
