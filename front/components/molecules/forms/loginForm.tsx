"use client";

import { InputField } from "@/components/atoms/inputField";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginDto } from "@shared";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({ resolver: zodResolver(LoginSchema) });

  const { login } = useAuth();

  const onSubmit = (data: LoginDto) => {
    login.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="Saisir votre Email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <InputField
        id="password"
        label="Mot de passe"
        type="password"
        placeholder="Saisir votre mot de passe"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Button type="submit">Se connecter</Button>
    </form>
  );
}
