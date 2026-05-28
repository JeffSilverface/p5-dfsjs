import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { CommentWithAuthor } from "@/types/comment.types";

type CommentCardProps = {
  comment: CommentWithAuthor;
};

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <Card className="bg-gray-100">
      <CardContent>
        <div className="flex gap-3 text-sm text-gray-500 justify-between">
          <span className="font-medium text-gray-700">
            {comment.author.username}
          </span>
          <span>{new Date(comment.createdAt).toLocaleDateString("fr-FR")}</span>
        </div>
        <p className="text-sm">{comment.content}</p>
      </CardContent>
    </Card>
  );
}
