import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { ArticleWithRelations } from "@/types/article.types";

type ArticleCardProps = {
  article: ArticleWithRelations;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.id}`}>
    <Card className="bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
      <CardHeader>
        <h2 className="text-lg font-bold">{article.title}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-md line-clamp-3">{article.content}</p>
      </CardContent>
      <CardFooter>
        <span className="flex-1 text-sm">{article.author.username}</span>
        <span className="flex-1 text-sm">
          {new Date(article.createdAt).toLocaleDateString("fr-FR")}
        </span>
      </CardFooter>
    </Card>
    </Link>
  );
}
