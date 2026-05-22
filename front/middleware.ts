import { NextRequest } from 'next/server'
import { handleAuth } from '@/lib/middleware/auth'

export function middleware(request: NextRequest) {
  return handleAuth(request)
}

export const config = {
  matcher: ['/((?!_next|images|favicon.ico).*)'],
}
