"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/atoms/inputField";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useUIStore } from "@/store/ui.store";
import { UpdateUserSchema, type UpdateUserDto } from "@/lib/schemas/auth.schema";
import type { SessionUser } from "@/types/user.types";

export function UserForm() {
  const user = useUIStore((state) => state.user);
  const setUser = useUIStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserDto>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: { username: user?.username ?? "", password: "" },
  });

  useEffect(() => {
    if (user) reset({ username: user.username, password: "" });
  }, [user, reset]);

  if (!user) return <p>Chargement...</p>;

  const onSubmit = async (data: UpdateUserDto) => {
    const payload = {
      username: data.username,
      ...(data.password ? { password: data.password } : {}),
    };
    const updated = await api.patch<SessionUser>("/auth/profile", payload);
    setUser(updated);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <InputField
        id="username"
        label="Nom d'utilisateur"
        placeholder="Nom d'utilisateur"
        error={errors.username?.message}
        {...register("username")}
      />
      <InputField
        id="email"
        label="Email"
        type="email"
        value={user.email}
        disabled
        readOnly
      />
      <InputField
        id="password"
        label="Mot de passe"
        type="password"
        placeholder="Nouveau mot de passe"
        error={errors.password?.message}
        {...register("password")}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enregistrement..." : "Enregistrer"}
      </Button>
    </form>
  );
}
