"use server"

import *  as z from 'zod'
import bcrypt from 'bcryptjs'
import { SettingsSchema } from '@/schemas'

import { getUserByEmail, getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const settings = async (data: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser()

  if(!user){
    return { error: "Unauthorized!" }
  }

  const dbUser = await getUserById(user.id!)

  if(!dbUser){
    return { error: "Unauthorized!" }
  }

  if(user.isOAuth){
    data.email = undefined
    data.password = undefined
    data.newPassword = undefined
    data.isTwoFactorEnabled = undefined
  }

  if(data.email && data.email !== user.email){
    const existingUser = await getUserByEmail(data.email)

    if(existingUser && existingUser.id !== dbUser.id){
      return { error: "Email already exists!" }
    }

    const verificationToken = await generateVerificationToken(data.email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: "Verification email sent!" }
  }

  if(data.password && data.newPassword && dbUser.password){
    const passwordsMatch = await bcrypt.compare(data.password, dbUser.password)

    if(!passwordsMatch){
      return { error: "Incorrect Password!" }
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10)

    data.password = hashedPassword
    data.newPassword = undefined
  }

await db.user.update({
    where: { id: dbUser.id},
    data: {
      ...data,
    }
  })

  return { success: "Settings Updated!" }
}
