import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

interface IAuthRouteProps {
  isAuth: boolean
}

export const AuthRoute = ({ isAuth }: IAuthRouteProps) => {
  return (
    <React.Suspense fallback={'loading...'}>
      {!isAuth ? <Outlet /> : <Navigate to="/account" />}
    </React.Suspense>
  )
}
