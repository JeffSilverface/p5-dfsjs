"use client";

import { InputField } from "@/components/atoms/inputField";
import { FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginDto } from "@/lib/schemas/auth.schema";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({ resolver: zodResolver(LoginSchema) });

  const { login } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const onSubmit = (data: LoginDto) => {
    login.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["session"] });
        router.push("/feed");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
      noValidate
    >
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="Saisir votre Email"
        autoComplete="username email"
        data-testid="login-email"
        error={errors.email?.message}
        {...register("email")}
      />
      <InputField
        id="password"
        label="Mot de passe"
        type="password"
        placeholder="Saisir votre mot de passe"
        autoComplete="current-password"
        data-testid="login-password"
        error={errors.password?.message}
        {...register("password")}
      />
      {login.isError && (
        <FieldError data-testid="login-error" className="text-center">
          Connexion impossible : Identifiants invalides
        </FieldError>
      )}
      <Button
        type="submit"
        data-testid="login-submit"
        disabled={login.isPending}
      >
        {login.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Se connecter"
        )}
      </Button>
    </form>
  );
}
