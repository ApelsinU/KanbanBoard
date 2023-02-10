import './registration-header.scss'

import logo from '@Assets/images/logo-black-short.png'

export const RegistrationHeader = () => {
  return (
    <div className="registartion-header">
      <img className="logo" src={logo} alt="" />
    </div>
  )
}
