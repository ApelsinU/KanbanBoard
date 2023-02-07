import './login.scss'
import {ChangeEvent, useState} from 'react'

import logo from '@Assets/images/logo-black-short.png'
import { NavLink } from 'react-router-dom'

import { Button } from '@App/components/Button'
import { useHttp } from "@App/hooks/http";

type LoginFormData = {
  username: string
  password: string
}

export const Login = () => {
  const { request, isLoading } = useHttp()
  const [formData, setFormData] = useState<LoginFormData | {}>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleLogin(e:any) {
    e.preventDefault()
    try {
      const data = await request('/api/auth/login', 'POST', formData)

      if (data && data.token) {
        window.localStorage.setItem("jwt-token", data.token)
      }
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
          {/*<button onClick={(e) => onLoginClick(e)}>ok</button>*/}
          <Button
            text="Login"
            height={45}
            //onClick={() => onLoginClick()}
            isLoading={isLoading}
          />
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
