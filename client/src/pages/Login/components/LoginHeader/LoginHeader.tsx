import './login-header.scss'

import logo from '@Assets/images/logo-black-short.png'

export const LoginHeader = () => {
  return (
    <div className="login-header">
      <img className="logo" src={logo} alt="" />
    </div>
  )
}
