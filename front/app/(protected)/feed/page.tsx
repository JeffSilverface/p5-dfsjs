"use client";

import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/molecules/cards/postCard";
import { usePosts } from "@/hooks/usePosts";
import Link from "next/link";

export default function Feed() {
  const { data: posts, isLoading, isError } = usePosts();

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur lors du chargement des articles.</p>;
  if (posts?.length === 0) return <p>Aucun article disponible.</p>;

  return (
    <div>
      <Link href="/post/new">
        <Button className="mb-4">Créer un article</Button>
      </Link>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
