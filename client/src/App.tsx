import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AccountPage } from '@App/pages/AccountPage'
import { Login } from '@App/pages/Login'
import { Registration } from '@App/pages/Registration'

import { Sidebar } from './components/Sidebar'
import { MainPage } from './pages/MainPage'
import { AuthRoute } from './routes/AuthRoute'
import { PrivateRoute } from './routes/PrivateRoute'

function App() {
  const isAuth: boolean = true

  return (
    <React.Suspense fallback={'loading...'}>
      <div className="page">
        <div className="container">
          <Router>
            <Sidebar isAuth={isAuth} />

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
      </div>
    </React.Suspense>
  )
}
export default App
