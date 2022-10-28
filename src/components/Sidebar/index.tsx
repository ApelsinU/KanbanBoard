import './sidebar.scss'

import { AccountIcon } from '@Assets/icons/AccountIcon'
import { KanbanIcon } from '@Assets/icons/KanbanIcon'
import Logo from '@Assets/images/logo-black-short.png'
import { NavLink, useLocation } from 'react-router-dom'

export const Sidebar = () => {
  const location = useLocation()
  console.log('location', location)
  return (
    <div className="sidebar-inner">
      <img className="logo" src={Logo} alt="Logo tick icon" />
      <nav className="nav">
        <NavLink
          className={`nav-link ${location.pathname === '/account' && 'active'}`}
          to="/account"
        >
          <div className="nav-link-icon">
            <AccountIcon className="icon" width="15" />
          </div>
          <span>Account</span>
        </NavLink>
        <NavLink
          className={`nav-link ${location.pathname === '/kanban' && 'active'}`}
          to="/kanban"
        >
          <div className="nav-link-icon">
            <KanbanIcon className="icon" width="20" />
          </div>
          <span>Kanban</span>
        </NavLink>
      </nav>
    </div>
  )
}
