"use client";

import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/molecules/cards/postCard";
import { usePosts } from "@/hooks/usePosts";
import Link from "next/link";

export default function Feed() {
  const { data: posts, isLoading, isError } = usePosts();

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur lors du chargement des posts.</p>;
  if (posts?.length === 0) return <p>Aucun post disponible.</p>;

  return (
    <div>
      <Link href="/feed/new">
        <Button className="mb-4">Créer un post</Button>
      </Link>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
