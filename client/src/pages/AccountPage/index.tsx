import './account.scss'
import React from 'react'

import { Sidebar } from '@App/components/Sidebar'

export const AccountPage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div>
        <div>Account</div>
      </div>
    </div>
  )
}
