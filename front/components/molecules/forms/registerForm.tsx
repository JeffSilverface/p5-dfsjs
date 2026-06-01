"use client";

import { InputField } from "@/components/atoms/inputField";
import { Button } from "@/components/ui/button";
import { RegisterDto, RegisterSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: zodResolver(RegisterSchema),
  });

  const { register: registerUser, login } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const onSubmit = (data: RegisterDto) => {
    registerUser.mutate(data, {
      onSuccess: () => {
        login.mutate(
          { email: data.email, password: data.password },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["session"] });
              router.push("/feed");
            },
          },
        );
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
      noValidate
      autoComplete="off"
    >
      <InputField
        id="name"
        label="Nom"
        type="text"
        placeholder="Votre nom"
        autoComplete="off"
        error={errors.username?.message}
        {...register("username")}
      />
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="Votre Email"
        autoComplete="off"
        error={errors.email?.message}
        {...register("email")}
      />
      <InputField
        id="password"
        label="Mot de passe"
        type="password"
        placeholder="Votre mot de passe"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Button data-testid="register-submit">Créer un compte</Button>
    </form>
  );
}
