"use client"

import { useCurrentUser } from '@/hooks/user-current-user'
import {logout} from '@/actions/logout'
const SettingsPage = () => {
    const user = useCurrentUser()

    const onClick = () => {
        logout()
    }

    return (
        <div className='bg-white p-10 rounded-xl'>
            <form>
                <button onClick={onClick} type="submit">Sign out</button>
            </form>
        </div>
    )
}

export default SettingsPage
