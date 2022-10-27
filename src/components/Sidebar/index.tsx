import './sidebar.scss'

import Logo from '@Assets/images/logo.png'

export const Sidebar = () => {
  return (
    <div className="sidebar-inner">
      <img className="logo" src={Logo} alt="Logo tick icon" />
    </div>
  )
}
