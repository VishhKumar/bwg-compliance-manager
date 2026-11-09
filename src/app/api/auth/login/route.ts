import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { client } from '@/sanity/lib/client'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Query Sanity for active user matching this email
    const query = `*[_type == "appUser" && email == $email && isActive == true][0]{ _id, email }`
    const user = await client.fetch(query, { email })

    if (!user) {
      return NextResponse.json(
        { error: 'Email not authorized by administrator.' },
        { status: 401 }
      )
    }

    // Set secure HTTP-only session cookie
    const cookieStore = await cookies()
    cookieStore.set('app_user_session', user.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({ success: true, email: user.email })
  } catch (error) {
    return NextResponse.json({ error: 'Server authentication failed' }, { status: 500 })
  }
}