import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AccountPage } from '@App/pages/AccountPage/Account'
import { Login } from '@App/pages/Login/Login'
import { MainPage } from '@App/pages/MainPage/MainPage'
import { Registration } from '@App/pages/Registration/Registration'
import { AuthRoute } from '@App/routes/AuthRoute'
import { PrivateRoute } from '@App/routes/PrivateRoute'

interface IRouterContainer {
  isAuth: boolean
}

export const RouterContainer = ({ isAuth }: IRouterContainer) => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthRoute isAuth={isAuth} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Route>

        <Route path="/" element={<PrivateRoute isAuth={isAuth} />}>
          {/*<Route path="/" element={<AccountPage />} />*/}
          <Route path="/account" element={<AccountPage />} />
          <Route path="/kanban" element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
