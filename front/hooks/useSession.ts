import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/lib/api";
import { useUIStore } from "@/store/ui.store";
import type { SessionUser } from "@/types/user.types";
import { protectedRoutes } from "@/lib/middleware/routes";

export function useSession() {
  const setUser = useUIStore((state) => state.setUser);
  const router = useRouter();
  const pathname = usePathname();

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
    const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
    if (query.isError && isProtected) router.push("/login");
  }, [query.isError, router]);

  return {
    ...query,
    isAuthenticated: !!query.data,
  };
}
