import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

interface IPrivateRouteProps {
  isAuth: boolean
}

export const PrivateRoute = ({ isAuth }: IPrivateRouteProps) => {
  return (
    <React.Suspense fallback={'loading...'}>
      {isAuth ? <Outlet /> : <Navigate to="/login" />}
    </React.Suspense>
  )
}
