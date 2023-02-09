import './drop-menu-link.scss'
import React from 'react'

import { AccountIcon } from '@Assets/icons/AccountIcon'
import { NavLink, useLocation } from 'react-router-dom'

import { Button } from '@App/ui/Button'

export const DropMenuLink = ({ setIsAuth }: any) => {
  const location = useLocation()
  function onLogOutClick() {
    localStorage.setItem('isAuth', 'false')
    setIsAuth(false)
  }
  return (
    <>
      <NavLink
        className={`nav-link ${location.pathname === '/account' && 'active'}`}
        to="/account"
      >
        <div className="nav-link-icon">
          <AccountIcon className="icon" width="15" />
        </div>
        <span>Account</span>
      </NavLink>

      <div className="dropdown">
        <NavLink
          className={`nav-link ${location.pathname === '/account' && 'active'}`}
          to="/account"
        >
          <div className="nav-link-icon">
            <AccountIcon className="icon" width="15" />
          </div>
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          className={`nav-link ${location.pathname === '/account' && 'active'}`}
          to="/account"
        >
          <div className="nav-link-icon">
            <AccountIcon className="icon" width="15" />
          </div>
          <span>Account</span>
        </NavLink>
        <Button onClick={() => onLogOutClick()} text={'Log Out'} />
      </div>
    </>
  )
}
