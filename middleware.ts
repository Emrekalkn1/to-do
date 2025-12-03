import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJWT } from '@/lib/auth'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl

    // Public paths
    if (pathname === '/login' || pathname === '/register' || pathname.startsWith('/api/auth')) {
        return NextResponse.next()
    }

    // Protected paths
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const payload = await verifyJWT(token)
    if (!payload) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
