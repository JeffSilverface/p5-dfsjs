"use client";

import { InputField } from "@/components/atoms/inputField";
import { Button } from "@/components/ui/button";
import { RegisterDto, RegisterSchema } from "@p5-dfsjs/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterDto) => {
    console.log("register:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <InputField
        id="name"
        label="Nom"
        type="text"
        placeholder="Votre nom"
        error={errors.username?.message}
        {...register("username")}
      />
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="Votre Email"
        error={errors.email?.message}
        {...register("email")}
      />
      <InputField
        id="password"
        label="Mot de passe"
        type="password"
        placeholder="Votre mot de passe"
        error={errors.password?.message}
        {...register("password")}
      />
      <Button>Créer un compte</Button>
    </form>
  );
}
