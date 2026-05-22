"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function Logout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    api.post("/auth/logout", {}).then(() => {
      queryClient.clear();
      router.push("/login");
    });
  }, [queryClient, router]);

  return null;
}
