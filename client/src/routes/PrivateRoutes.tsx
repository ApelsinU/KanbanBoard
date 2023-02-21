import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

interface IPrivateRoutesProps {
  isAuth: boolean | null
}

export const PrivateRoutes = ({ isAuth }: IPrivateRoutesProps) => {
  if (isAuth === false) return <Navigate to="/login" />

  return (
    <React.Suspense fallback={'loading...'}>
      <Outlet />
    </React.Suspense>
  )
}
