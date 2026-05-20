"use client";

import { LoginForm } from "@/components/molecules/forms/loginForm";
import { LoginDto } from "@p5-dfsjs/shared";

export default function Login() {
  const handleSubmit = (data: LoginDto) => {
    console.log("credentials:", data);
  };

  return <LoginForm onSubmit={handleSubmit} />;
}
