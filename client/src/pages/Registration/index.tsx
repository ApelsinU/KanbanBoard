import './registration.scss'
import logo from '@Assets/images/logo-black-short.png'
import { NavLink } from 'react-router-dom'

import { Button } from '@App/components/Button'
import {useHttp} from "@App/hooks/http";
import {ChangeEvent, useState} from "react";

type RegisterFormData = {
  username: string
  email: string
  password: string
  confirm_password: string
}

export const Registration = () => {
  const {request, isLoading, error} = useHttp()

  const [formData, setFormData] = useState<RegisterFormData | {}>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const onRegisterClick = async () => {
    console.log('click')
    try {
      const data = await request('api/auth/register', 'POST', {...formData})
      console.log('data',data)
    } catch (e) {}
  }

  return (
    <div className="registration-container">
      <div className="registration">
        <div className="header">
          <img className="logo" src={logo} alt="" />
        </div>

        <form className="form">
          <input
            name="username"
            className="input"
            type="text"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="email"
            className="input"
            type="email"
            placeholder="Email *"
            required
            onChange={(e) => handleChange(e)}
          />

          <input
            name="password"
            className="input"
            type="password"
            placeholder="Password *"
            required
            onChange={(e) => handleChange(e)}
          />
          <input
            name="confirm_password"
            className="input"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => handleChange(e)}
          />

          <Button onClick={onRegisterClick} disabled={isLoading}>
            Register
          </Button>
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
