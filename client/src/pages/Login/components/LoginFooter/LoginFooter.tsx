import './login-footer.scss'

import { NavLink } from 'react-router-dom'

export const LoginFooter = () => {
  return (
    <div className="login-footer">
      <span className="text">Don't have account?</span>
      <NavLink className="link" to="/registration">
        Register
      </NavLink>
    </div>
  )
}
