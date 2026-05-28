"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { useCreateComment } from "@/hooks/useComments";

type CommentFormProps = {
  articleId: string;
};

export function CommentForm({ articleId }: CommentFormProps) {
  const createComment = useCreateComment(articleId);
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;
    await createComment.mutateAsync(content.trim());
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2">
      <textarea
        className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        placeholder="Ajouter un commentaire..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />
      {createComment.isError && (
        <FieldError className="text-center">
          Une erreur est survenue. Veuillez réessayer.
        </FieldError>
      )}
      <Button
        type="submit"
        disabled={createComment.isPending || !content.trim()}
        className="self-end"
      >
        {createComment.isPending ? "Envoi..." : "Commenter"}
      </Button>
    </form>
  );
}
