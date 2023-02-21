import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

interface IAuthRouteProps {
  isAuth: boolean | null
}

export const AuthRoute = ({ isAuth }: IAuthRouteProps) => {
  if (isAuth === true) return <Navigate to="/account" />

  return (
    <React.Suspense fallback={'loading...'}>
      <Outlet />
    </React.Suspense>
  )
}
