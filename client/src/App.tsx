import React from 'react'

import { RouterContainer } from '@App/routes/RouterContainer'
import { Loader } from '@App/ui/Loader/Loader'

function App() {
  return (
    <React.Suspense fallback={<Loader />}>
      <div className="page">
        <RouterContainer />
      </div>
    </React.Suspense>
  )
}

export default App
