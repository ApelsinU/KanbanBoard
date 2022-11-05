import React, {useEffect, useState} from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AccountPage } from '@App/pages/AccountPage'
import { Login } from '@App/pages/Login'
import { MainPage } from '@App/pages/MainPage'
import { Registration } from '@App/pages/Registration'

import { AuthRoute } from './routes/AuthRoute'
import { PrivateRoute } from './routes/PrivateRoute'

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false)

  useEffect(()=> {
    setIsAuth(localStorage.getItem('isAuth') === 'true')
  }, [isAuth])

  return (
    <React.Suspense fallback={'loading...'}>
      <div className="page">
        <Router>
          <Routes>
            <Route element={<AuthRoute isAuth={isAuth} />}>
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
            </Route>

            <Route element={<PrivateRoute isAuth={isAuth} />}>
              <Route path="/" element={<AccountPage setIsAuth={setIsAuth}/>} />
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
