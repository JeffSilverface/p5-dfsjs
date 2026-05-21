import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { api } from '@/lib/api'
import { useUIStore } from '@/store/ui.store'
import type { SessionUser } from '@p5-dfsjs/shared'

export function useSession() {
  const setUser = useUIStore((state) => state.setUser)

  const query = useQuery({
    queryKey: ['session'],
    queryFn: () => api.get<SessionUser>('/auth/me'),
    retry: false,
    staleTime: Infinity,
  })

  useEffect(() => {
    setUser(query.data ?? null)
  }, [query.data, setUser])

  return {
    ...query,
    isAuthenticated: !!query.data,
  }
}
