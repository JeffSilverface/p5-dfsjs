"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { usePost } from "@/hooks/usePosts";
import { useComments } from "@/hooks/useComments";
import { CommentForm } from "@/components/molecules/forms/commentForm";
import { CommentCard } from "@/components/molecules/cards/commentCard";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, isError } = usePost(id);
  const { data: comments } = useComments(id);

  if (isLoading) return <p>Chargement...</p>;
  if (isError || !post) return <p>Post introuvable.</p>;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="mb-2 text-sm text-gray-500">{post.topic.name}</p>
      <div className="mb-4 flex flex-row items-center gap-x-2">
        <Link href="/feed">
          <Button variant="ghost" size="sm">
            <ArrowLeftIcon />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">{post.title}</h1>
      </div>
      <div className="mb-6 flex gap-4 text-sm text-gray-500">
        <span>{post.author.username}</span>
        <span>{new Date(post.createdAt).toLocaleDateString("fr-FR")}</span>
      </div>
      <p className="whitespace-pre-wrap text-base leading-relaxed">
        {post.content}
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
