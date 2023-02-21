import './sidebar.scss'

// import { AccountIcon } from '@Assets/icons/AccountIcon'
// import { KanbanIcon } from '@Assets/icons/KanbanIcon'
import { KanbanIcon, UserIcon } from '@Assets/icons/StrokeIcons'
import logo from '@Assets/images/logo-black-short.png'
import { NavLink, useLocation } from 'react-router-dom'

import { DropMenuLink } from '@App/components/DropMenuLink/DropMenuLink'

export const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="sidebar-inner">
      <img className="logo" src={logo} alt="Logo tick icon" />
      <nav className="nav">
        <NavLink
          className={`nav-link ${location.pathname === '/account' && 'active'}`}
          to="/account"
        >
          <div className="nav-link-icon">
            <UserIcon className="icon" width="22" height="22" />
            {/*<AccountIcon className="icon" width="15" />*/}
          </div>
          <span>Account</span>
        </NavLink>
        {/*<DropMenuLink />*/}
        <NavLink className={`nav-link ${location.pathname === '/kanban' && 'active'}`} to="/kanban">
          <div className="nav-link-icon">
            <KanbanIcon className="icon" width="32" height="32" />
          </div>
          <span>Kanban</span>
        </NavLink>
      </nav>
    </div>
  )
}
