import './account.scss'
import React from 'react'

import { Sidebar } from '@App/components/Sidebar'
import {Button} from "@App/components/Button";

export const AccountPage = ({setIsAuth}: any) => {
    function onLogOutClick() {
        localStorage.setItem('isAuth','false')
        setIsAuth(false)
    }
  return (
    <div className="container">
      <Sidebar />
      <div>
          <div>Account</div>
          <Button text="Log Out" onClick={() => onLogOutClick()}/>
      </div>

    </div>
  )
}
