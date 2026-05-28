"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useArticle } from "@/hooks/useArticles";
import { useComments } from "@/hooks/useComments";
import { CommentForm } from "@/components/molecules/forms/commentForm";
import { CommentCard } from "@/components/molecules/cards/commentCard";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading, isError } = useArticle(id);
  const { data: comments } = useComments(id);

  if (isLoading) return <p>Chargement...</p>;
  if (isError || !article) return <p>Article introuvable.</p>;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="mb-2 text-sm text-gray-500">{article.topic.name}</p>
      <div className="mb-4 flex flex-row items-center gap-x-2">
        <Link href="/articles">
          <Button variant="ghost" size="sm">
            <ArrowLeftIcon />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">{article.title}</h1>
      </div>
      <div className="mb-6 flex gap-4 text-sm text-gray-500">
        <span>{article.author.username}</span>
        <span>{new Date(article.createdAt).toLocaleDateString("fr-FR")}</span>
      </div>
      <p className="whitespace-pre-wrap text-base leading-relaxed">
        {article.content}
      </p>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold">
          Commentaires ({comments?.length ?? 0})
        </h2>
        <div className="flex flex-col gap-4">
          {comments?.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
        <CommentForm articleId={id} />
      </section>
    </div>
  );
}
