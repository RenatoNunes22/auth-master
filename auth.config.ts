import bcrypt from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from '@/schemas'
import { getUserByEmail } from './data/user'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import type { NextAuthConfig } from 'next-auth'

export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const validateFields = LoginSchema.safeParse(credentials)
                if (validateFields.success) {
                    const { email, password } = validateFields.data
                    const user = await getUserByEmail(email)
                    if (!user || !user.password) return null
                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    )
                    if (passwordMatch) return user
                    return null
                } else {
                    return null
                }
            },
        }),
    ],
} satisfies NextAuthConfig
