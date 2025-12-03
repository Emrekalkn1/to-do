import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
    try {
        // Test database connection
        const userCount = await db.user.count()
        
        return NextResponse.json({ 
            success: true, 
            message: 'Database connection successful',
            userCount: userCount,
            dbUrl: process.env.DATABASE_URL ? 'Set (hidden for security)' : 'Missing - Please set DATABASE_URL in Vercel Environment Variables'
        })
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        const errorStack = error instanceof Error ? error.stack : undefined
        
        return NextResponse.json({ 
            success: false, 
            error: errorMessage,
            stack: process.env.NODE_ENV === 'development' ? errorStack : undefined,
            dbUrl: process.env.DATABASE_URL ? 'Set' : 'Missing'
        }, { status: 500 })
    }
}

