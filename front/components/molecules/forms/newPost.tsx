"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/atoms/inputField";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { CreatePostSchema, CreatePostDto } from "@/lib/schemas/post.schema";
import { useCreatePost } from "@/hooks/usePosts";
import { useTopics } from "@/hooks/useTopics";

export function NewPostForm() {
  const router = useRouter();
  const { data: topics } = useTopics();
  const createPost = useCreatePost();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostDto>({ resolver: zodResolver(CreatePostSchema) });

  const onSubmit = (data: CreatePostDto) => {
    createPost.mutate(data, {
      onSuccess: () => router.push("/feed"),
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
        {errors.topicId && (
          <FieldError data-testid="topicId-error">{errors.topicId.message}</FieldError>
        )}
      </Field>

      <InputField
        id="title"
        label="Titre"
        placeholder="Titre du post"
        error={errors.title?.message}
        {...register("title")}
      />

      <Field>
        <FieldLabel htmlFor="content">Contenu</FieldLabel>
        <textarea
          id="content"
          rows={8}
          placeholder="Contenu du post"
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
          {...register("content")}
        />
        {errors.content && (
          <FieldError data-testid="content-error">{errors.content.message}</FieldError>
        )}
      </Field>

      {createPost.isError && (
        <FieldError className="text-center">
          Une erreur est survenue. Veuillez réessayer.
        </FieldError>
      )}
      <Button type="submit" data-testid="post-submit" disabled={createPost.isPending}>
        {createPost.isPending ? "Création..." : "Créer le post"}
      </Button>
    </form>
  );
}
