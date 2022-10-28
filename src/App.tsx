import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AccountPage } from '@App/pages/AccountPage'

import { Sidebar } from './components/Sidebar'
import { MainPage } from './pages/MainPage'

function App() {
  return (
    <div className="page">
      <div className="container">
        <Router>
          <div className="left">
            <Sidebar />
          </div>

          <Routes>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/kanban" element={<MainPage />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}
export default App
