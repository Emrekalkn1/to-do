import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { comparePassword, signJWT } from '@/lib/auth'

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        const user = await db.user.findUnique({ where: { email } })
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const token = await signJWT({ id: user.id, email: user.email, role: user.role })

        const response = NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } })
        response.cookies.set('token', token, { httpOnly: true, path: '/' })

        return response

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
