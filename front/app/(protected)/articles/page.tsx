"use client";

import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/molecules/cards/articleCard";
import { useArticles } from "@/hooks/useArticles";
import Link from "next/link";

export default function Articles() {
  const { data: articles, isLoading, isError } = useArticles();

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur lors du chargement des articles.</p>;
  if (articles?.length === 0) return <p>Aucun article disponible.</p>;

  return (
    <div>
      <Link href="/articles/new">
        <Button className="mb-4">Créer un article</Button>
      </Link>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {articles?.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
