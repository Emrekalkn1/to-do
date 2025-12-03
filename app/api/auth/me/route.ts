import { NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'

export async function GET() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const payload = await verifyJWT(token)
        if (!payload) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const user = await db.user.findUnique({
            where: { id: payload.id as string },
            select: { id: true, email: true, name: true, role: true, avatar: true }
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        return NextResponse.json({ user })

    } catch (error: any) {
        console.error('API Error:', error)
        return NextResponse.json({ 
            error: 'Internal Server Error',
            message: error?.message || 'Unknown error'
        }, { status: 500 })
    }
}
