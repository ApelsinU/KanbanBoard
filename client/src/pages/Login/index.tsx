import './login.scss'

import logo from '@Assets/images/logo-black-short.png'
import { NavLink } from 'react-router-dom'

import { LoginFooter } from './components/LoginFooter/LoginFooter'
import { LoginForm } from './components/LoginForm/LoginForm'
import { LoginHeader } from './components/LoginHeader/LoginHeader'

export const Login = () => {
  return (
    <div className="login-container">
      <div className="login">
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </div>
    </div>
  )
}
