import React from 'react'

import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import { useAuth } from '@App/hooks/auth'
import { AccountPage } from '@App/pages/AccountPage/Account'
import { Login } from '@App/pages/Login/Login'
import { MainPage } from '@App/pages/MainPage/MainPage'
import { NotFoundPage } from '@App/pages/NotFoundPage/NotFoundPage'
import { Registration } from '@App/pages/Registration/Registration'
import { AuthRoute } from '@App/routes/AuthRoutes'
import { PrivateRoutes } from '@App/routes/PrivateRoutes'

export const RouterContainer = () => {
  const { isAuth } = useAuth()
  return (
    <Router>
      <Routes>
        <Route element={<AuthRoute isAuth={isAuth} />}>
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Route>

        <Route element={<PrivateRoutes isAuth={isAuth} />}>
          <Route path="/" element={<Navigate to="/account" replace />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="kanban" element={<MainPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}
