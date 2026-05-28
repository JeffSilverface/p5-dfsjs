import { NewArticleForm } from "@/components/molecules/forms/newArticle";

export default function NewArticle() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Nouvel article</h1>
      <NewArticleForm />
    </div>
  );
}
