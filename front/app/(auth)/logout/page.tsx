"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function Logout() {
  const queryClient = useQueryClient();

  useEffect(() => {
    fetch("/api/auth/logout", { method: "POST" }).then(() => {
      queryClient.clear();
      window.location.replace("/login");
    });
  }, [queryClient]);

  return null;
}
