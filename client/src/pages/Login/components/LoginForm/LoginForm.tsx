import { ChangeEvent, useState } from 'react'
import './login-form.scss'

import { useAuth } from '@App/hooks/auth'
import { useHttp } from '@App/hooks/http'
import { UserResponseData } from '@App/types/http'
import { Button } from '@App/ui/Button/Button'

type LoginFormData = {
  username: string
  password: string
}

export const LoginForm = () => {
  const { login } = useAuth()
  const [formData, setFormData] = useState<LoginFormData | {}>({})
  const { request, isLoading } = useHttp()

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
    <form className="login-form" onSubmit={handleLogin}>
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
  )
}
