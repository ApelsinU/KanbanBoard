import './login.scss'
import { ChangeEvent, useState } from 'react'

import logo from '@Assets/images/logo-black-short.png'
import { NavLink } from 'react-router-dom'

import { Button } from '@App/components/Button'
import { useAuth } from '@App/hooks/auth'
import { useHttp } from '@App/hooks/http'
import { UserResponseData } from '@App/types/http'

type LoginFormData = {
  username: string
  password: string
}

export const Login = () => {
  const { request, isLoading } = useHttp()
  const { login } = useAuth()
  const [formData, setFormData] = useState<LoginFormData | {}>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleLogin(e: any) {
    e.preventDefault()

    try {
      await request('/api/auth/login', 'POST', formData).then(
        (data: UserResponseData) => login(data),
      )
    } catch (e) {
      console.log('Login error: ', e)
    }
  }

  return (
    <div className="login-container">
      <div className="login">
        <div className="header">
          <img className="logo" src={logo} alt="" />
        </div>

        <form className="form" onSubmit={handleLogin}>
          <input
            name="username"
            className="input"
            type="text"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
          />

          <input
            name="password"
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <Button text="Login" height={45} isLoading={isLoading} />
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
