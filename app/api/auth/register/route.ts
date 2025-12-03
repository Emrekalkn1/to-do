import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword, signJWT } from '@/lib/auth'

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        const existingUser = await db.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        const hashedPassword = await hashPassword(password)

        // First user is Admin
        const userCount = await db.user.count()
        const role = userCount === 0 ? 'ADMIN' : 'USER'

        const user = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role
            }
        })

        const token = await signJWT({ id: user.id, email: user.email, role: user.role })

        const response = NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } })
        response.cookies.set('token', token, { httpOnly: true, path: '/' })

        return response

    } catch (error) {
        console.error('Register error:', error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({ 
            error: 'Internal Server Error',
            details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        }, { status: 500 })
    }
}
