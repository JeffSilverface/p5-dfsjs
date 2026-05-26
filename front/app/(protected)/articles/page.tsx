import { ArticleCard } from "@/components/molecules/cards/articleCard";

export default function Articles() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </div>
  );
}
