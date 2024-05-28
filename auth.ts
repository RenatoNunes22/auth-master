import NextAuth from 'next-auth'
import { getUserById } from '@/data/user'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import authConfig from './auth.config'
import { UserRole } from '@prisma/client'

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
} = NextAuth({
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            })
        },
    },
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token
            const existUser = await getUserById(token.sub)
            if (!existUser) return token
            token.role = existUser.role
            return token
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
})
