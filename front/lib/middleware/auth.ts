import { NextRequest, NextResponse } from 'next/server'
import { protectedRoutes, authRoutes } from './routes'

export function handleAuth(request: NextRequest) {
  const session = request.cookies.get('connect.sid')
  const { pathname } = request.nextUrl

  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r))
  const isAuth = authRoutes.some((r) => pathname.startsWith(r)) || pathname === '/'

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuth && session) {
    return NextResponse.redirect(new URL('/articles', request.url))
  }

  return NextResponse.next()
}
