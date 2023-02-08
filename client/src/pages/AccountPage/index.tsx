import './account.scss'
import React from 'react'

import { Sidebar } from '@App/components/Sidebar'
import { useAuth } from '@App/hooks/auth'

export const AccountPage = () => {
  const { logout } = useAuth()
  return (
    <div className="container">
      <Sidebar />
      <div className={'account-page'}>
        <h1 className={'title'}>Account</h1>
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  )
}
