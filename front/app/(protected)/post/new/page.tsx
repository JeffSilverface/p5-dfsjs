import { NewPostForm } from "@/components/molecules/forms/newPost";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function NewPost() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-row items-center mb-4 gap-x-2">
        <Link href="/feed">
          <Button variant="ghost" size="sm">
            <ArrowLeftIcon />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Nouvel article</h1>
      </div>
      <NewPostForm />
    </div>
  );
}
