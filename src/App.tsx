import React from 'react'

import { Sidebar } from './components/Sidebar'
import { MainPage } from './pages/MainPage'

function App() {
  return (
    <div className="page">
      <div className="container">
        <div className="left">
          <Sidebar />
        </div>
        <MainPage />
      </div>
    </div>
  )
}
export default App
