import './registration.scss'
import logo from '@Assets/images/logo-black-short.png'
import { NavLink } from 'react-router-dom'

import { Button } from '@App/components/Button'

export const Registration = () => {
  return (
    <div className="registration-container">
      <div className="registration">
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
            name="email"
            className="input"
            type="email"
            placeholder="Email"
          />

          <input
            name="password"
            className="input"
            type="password"
            placeholder="Password"
          />
          <input
            name="confirm_password"
            className="input"
            type="password"
            placeholder="Confirm Password"
          />
          <Button type="submit" text="Register" />
        </form>

        <div className="footer">
          <span className="text">Already have account?</span>
          <NavLink className="link" to="/login">
            Login
          </NavLink>
        </div>
      </div>
    </div>
  )
}
