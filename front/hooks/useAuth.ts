import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { RegisterDto, LoginDto } from '@/lib/schemas/auth.schema'
import type { SessionUser } from '@/types/user.types'

export function useAuth() {
  const register = useMutation({
    mutationFn: (data: RegisterDto) =>
      api.post<SessionUser>('/auth/register', data),
  })

  const login = useMutation({
    mutationFn: (data: LoginDto) =>
      api.post<SessionUser>('/auth/login', data),
  })

  return { register, login }
}
