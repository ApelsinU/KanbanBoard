import './login.scss'
import { useEffect, useState } from 'react'

import logo from '@Assets/images/logo-black-short.png'
import { NavLink } from 'react-router-dom'

import { Button } from '@App/components/Button'
import { login } from '@App/http/auth'
import { ILoginDataRequest } from '@App/http/interfaces'

export const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loginData, setLoginData] = useState<ILoginDataRequest>({
    username: '',
    password: '',
  })

  const onLoginClick = () => {
    // e.preventDefault()
    setIsLoading(true)
    try {
      login(loginData).then((res) => {
        console.log('success', res)
      })
      setIsLoading(false)
    } catch (e) {
      console.log('error', e)
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login">
        <div className="header">
          <img className="logo" src={logo} alt="" />
        </div>

        <form className="form">
          <input
            name="username"
            className="input"
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
          />

          <input
            name="password"
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          {/*<button onClick={(e) => onLoginClick(e)}>ok</button>*/}
          <Button
            text="Login"
            onClick={() => onLoginClick()}
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
