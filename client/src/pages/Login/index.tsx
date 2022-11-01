import './login.scss'
import logo from '@Assets/images/logo-black-short.png'
import { NavLink } from 'react-router-dom'

import { Button } from '@App/components/Button'

export const Login = () => {
  return (
    <div className="login-container">
      <div className="login">
        <div className="header">
          <img className="logo" src={logo} alt="" />
        </div>

        <form className="form" action="">
          <input
            name="username"
            className="input"
            type="text"
            placeholder="Username"
          />

          <input
            name="password"
            className="input"
            type="password"
            placeholder="Password"
          />
          <Button type="submit" text="Login" />
        </form>

        <div className="footer">
          <span className="text">Don't have account?</span>
          <NavLink className="link" to="/registration">
            Register
          </NavLink>
        </div>
      </div>
    </div>
  )
}
