import './registration.scss'
import { ChangeEvent, useEffect, useState } from 'react'

import logo from '@Assets/images/logo-black-short.png'
import { NavLink } from 'react-router-dom'

import { useHttp } from '@App/hooks/http'
import { Button } from '@App/ui/Button'

type RegisterFormData = {
  username: string
  email: string
  password: string
  confirm_password: string
}

export const Registration = () => {
  const { request, isLoading } = useHttp()
  const [formData, setFormData] = useState<RegisterFormData | {}>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleRegister(e: any) {
    e.preventDefault()
    try {
      const data = await request('/api/auth/register', 'POST', formData)
      console.log('Registration response: ', data)
    } catch (e) {
      console.log('Registration error: ', e)
    }
  }

  return (
    <div className="registration-container">
      <div className="registration">
        <div className="header">
          <img className="logo" src={logo} alt="" />
        </div>

        <form className="form" onSubmit={handleRegister}>
          <input
            name="username"
            className="input"
            type="text"
            placeholder="Username *"
            required
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
          {/*<input*/}
          {/*  name="confirm_password"*/}
          {/*  className="input"*/}
          {/*  type="password"*/}
          {/*  placeholder="Confirm Password"*/}
          {/*  onChange={(e) => handleChange(e)}*/}
          {/*/>*/}

          <Button
            text={'Register'}
            height={45}
            // onClick={(e: React.FormEvent<HTMLInputElement>) =>
            //   onRegisterClick(e)
            // }
            isLoading={isLoading}
          />
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
