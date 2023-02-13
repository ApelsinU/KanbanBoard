import React from 'react'

import { useAuth } from '@App/hooks/auth'
import { RouterContainer } from '@App/routes/RouterContainer'
import { Loader } from '@App/ui/Loader/Loader'

function App() {
  const { isAuth } = useAuth()

  return (
    <React.Suspense fallback={<Loader />}>
      <div className="page">
        <RouterContainer isAuth={isAuth} />
      </div>
    </React.Suspense>
  )
}
export default App
