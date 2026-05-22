"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { useSession } from "@/hooks/useSession";

function SessionLoader() {
  useSession();
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionLoader />
      {children}
    </QueryClientProvider>
  );
}
