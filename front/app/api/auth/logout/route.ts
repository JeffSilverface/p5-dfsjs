import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export async function POST(request: NextRequest) {
  const sessionCookie = request.cookies.get('connect.sid')

  await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Cookie: sessionCookie ? `connect.sid=${sessionCookie.value}` : '',
    },
  })

  const response = NextResponse.json({ message: 'Logged out' })
  response.cookies.delete('connect.sid')
  return response
}
