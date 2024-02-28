import './account.scss'
import React from 'react'

import { Sidebar } from '@App/components/Sidebar/Sidebar'
import { useAuth } from '@App/hooks/auth'
import { Button } from '@App/ui/Button/Button'
import { useUserStore } from '@App/zustand/stores/userStore'

export const AccountPage = () => {
  const { logout } = useAuth()
  const userId = useUserStore((state) => state.userData.userId)

  return (
    <div className="container">
      <Sidebar />
      <div className={'account-page'}>
        <h1 className={'title'}>Account</h1>
        <p className={'user-id'}>
          UserId:{' '}
          <b>
            <i>{userId}</i>
          </b>
        </p>
        <Button text="Log Out" onClick={logout} height={45} />
      </div>
    </div>
  )
}
