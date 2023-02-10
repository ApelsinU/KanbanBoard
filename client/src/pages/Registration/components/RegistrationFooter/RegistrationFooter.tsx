import './registration-footer.scss'

import { NavLink } from 'react-router-dom'

export const RegistrationFooter = () => {
  return (
    <div className="footer">
      <span className="text">Already have account?</span>
      <NavLink className="link" to="/login">
        Login
      </NavLink>
    </div>
  )
}
