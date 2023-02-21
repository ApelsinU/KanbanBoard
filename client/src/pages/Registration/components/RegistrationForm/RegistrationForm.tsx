import './registration-form.scss'

import { ChangeEvent, useState } from 'react'

import { useHttp } from '@App/hooks/http'
import { Button } from '@App/ui/Button/Button'
import { Input } from '@App/ui/Input/Input'

type RegisterFormData = {
  username: string
  email: string
  password: string
  confirm_password: string
}
export const RegistrationForm = () => {
  const { request, isLoading } = useHttp()
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  })

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
    <form className="registration-form" onSubmit={handleRegister}>
      <Input
        name="username"
        type="text"
        placeholder="Username *"
        required={true}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        value={formData.username}
      />
      <Input
        name="email"
        type="email"
        placeholder="Email *"
        required={true}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        value={formData.email}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password *"
        required={true}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        value={formData.password}
      />

      <Input
        name="confirm_password"
        type="password"
        placeholder="Confirm Password *"
        required={true}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        value={formData.confirm_password}
      />

      <Button text={'Register'} height={45} isLoading={isLoading} />
    </form>
  )
}
