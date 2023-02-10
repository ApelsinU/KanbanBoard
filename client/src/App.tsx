import React, { useEffect, useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useAuth } from '@App/hooks/auth'
import { AccountPage } from '@App/pages/AccountPage/Account'
import { Login } from '@App/pages/Login/Login'
import { MainPage } from '@App/pages/MainPage/MainPage'
import { Registration } from '@App/pages/Registration/Registration'
import { Loader } from '@App/ui/Loader/Loader'

import { AuthRoute } from './routes/AuthRoute'
import { PrivateRoute } from './routes/PrivateRoute'

function App() {
  const { isAuth } = useAuth()

  return (
    <React.Suspense fallback={<Loader />}>
      <div className="page">
        <Router>
          <Routes>
            <Route element={<AuthRoute isAuth={isAuth} />}>
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
            </Route>

            <Route element={<PrivateRoute isAuth={isAuth} />}>
              <Route path="/" element={<AccountPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/kanban" element={<MainPage />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </React.Suspense>
  )
}
export default App
