'use-client'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

const Social = () => {
    const onClick = (provider: 'google' | 'github') => {
        signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT })
    }
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                className="w-full"
                variant="outline"
                size="lg"
                onClick={() => onClick('github')}
            >
                <FaGithub />
            </Button>
            <Button
                className="w-full"
                variant="outline"
                size="lg"
                onClick={() => onClick('google')}
            >
                <FcGoogle />
            </Button>
        </div>
    )
}
export default Social
