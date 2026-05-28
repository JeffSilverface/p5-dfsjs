import { NewArticleForm } from "@/components/molecules/forms/newArticle";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function NewArticle() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-row items-center mb-4">
        <Link href="/articles">
          <Button className="" variant={"ghost"} size="sm">
            <ArrowLeftIcon />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Nouvel article</h1>
      </div>
      <NewArticleForm />
    </div>
  );
}
