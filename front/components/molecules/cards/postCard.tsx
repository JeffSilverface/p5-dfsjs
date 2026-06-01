import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { PostWithRelations } from "@/types/post.types";

type PostCardProps = {
  post: PostWithRelations;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/post/${post.id}`} className="h-full">
      <Card className="h-full flex flex-col bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
        <CardHeader>
          <h2 className="text-lg font-bold">{post.title}</h2>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-md line-clamp-3">{post.content}</p>
        </CardContent>
        <CardFooter>
          <span className="flex-1 text-sm">{post.author.username}</span>
          <span className="flex-1 text-sm">
            {new Date(post.createdAt).toLocaleDateString("fr-FR")}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
