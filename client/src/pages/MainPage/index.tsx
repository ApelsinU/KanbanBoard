import React from 'react'

import './main-page.scss'
import { Sidebar } from '@App/components/Sidebar'

import { Board } from './components/Board'

export const MainPage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="main-page">
        <h1 className="title">Kanban</h1>
        <Board />
      </div>
    </div>
  )
}
