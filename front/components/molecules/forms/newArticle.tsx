"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/atoms/inputField";
import { Field } from "@/components/ui/field";
import { FieldLabel } from "@/components/ui/field";
import { FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  CreateArticleSchema,
  CreateArticleDto,
} from "@/lib/schemas/article.schema";
import { useCreateArticle } from "@/hooks/useArticles";
import { useTopics } from "@/hooks/useTopics";

export function NewArticleForm() {
  const router = useRouter();
  const { data: topics } = useTopics();
  const createArticle = useCreateArticle();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateArticleDto>({ resolver: zodResolver(CreateArticleSchema) });

  const onSubmit = (data: CreateArticleDto) => {
    createArticle.mutate(data, {
      onSuccess: () => router.push("/articles"),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Field>
        <FieldLabel htmlFor="topicId">Thème</FieldLabel>
        <select
          id="topicId"
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
          {...register("topicId")}
        >
          <option value="">Sélectionner un thème</option>
          {topics?.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {errors.topicId && <FieldError>{errors.topicId.message}</FieldError>}
      </Field>

      <InputField
        id="title"
        label="Titre"
        placeholder="Titre de l'article"
        error={errors.title?.message}
        {...register("title")}
      />

      <Field>
        <FieldLabel htmlFor="content">Contenu</FieldLabel>
        <textarea
          id="content"
          rows={8}
          placeholder="Contenu de l'article"
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
          {...register("content")}
        />
        {errors.content && <FieldError>{errors.content.message}</FieldError>}
      </Field>

      <Button type="submit" disabled={createArticle.isPending}>
        {createArticle.isPending ? "Création..." : "Créer l'article"}
      </Button>
    </form>
  );
}
