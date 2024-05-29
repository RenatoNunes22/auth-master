import {db} from '@/lib/db';

export const getTwoFactorTokenByToken = (token: string) => {
  try{
    const twoFactorToken = db.twoFactorToken.findUnique({
      where: { token }
    })

    return twoFactorToken
  }catch {
    return null
  }
}

export const getTwoFactorTokenByEmail = (email: string) => {
  try{
    const twoFactorToken = db.twoFactorToken.findFirst({
      where: { email }
    })

    return twoFactorToken
  }catch {
    return null
  }
}
