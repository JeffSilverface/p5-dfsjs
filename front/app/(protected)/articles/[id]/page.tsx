"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useArticle } from "@/hooks/useArticles";
import { useComments, useCreateComment } from "@/hooks/useComments";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading, isError } = useArticle(id);
  const { data: comments } = useComments(id);
  const createComment = useCreateComment(id);
  const [content, setContent] = useState("");

  if (isLoading) return <p>Chargement...</p>;
  if (isError || !article) return <p>Article introuvable.</p>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;
    await createComment.mutateAsync(content.trim());
    setContent("");
  };

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
        <ul className="flex flex-col gap-4">
          {comments?.map((comment) => (
            <li key={comment.id} className="rounded-md bg-gray-100 p-4">
              <div className="mb-1 flex gap-3 text-sm text-gray-500">
                <span className="font-medium text-gray-700">
                  {comment.author.username}
                </span>
                <span>
                  {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
                </span>
              </div>
              <p className="text-sm">{comment.content}</p>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2">
          <Textarea
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Ajouter un commentaire..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          />
          <Button
            type="submit"
            disabled={createComment.isPending || !content.trim()}
            className="self-end"
          >
            {createComment.isPending ? "Envoi..." : "Commenter"}
          </Button>
        </form>
      </section>
    </div>
  );
}
