import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useUIStore } from "@/store/ui.store";
import type { SessionUser } from "@/types/user.types";

export function useSession() {
  const setUser = useUIStore((state) => state.setUser);
  const router = useRouter();

  const query = useQuery({
    queryKey: ["session"],
    queryFn: () => api.get<SessionUser>("/auth/me"),
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    setUser(query.data ?? null);
  }, [query.data, setUser]);

  useEffect(() => {
    if (query.isError) router.push("/login");
  }, [query.isError, router]);

  return {
    ...query,
    isAuthenticated: !!query.data,
  };
}
