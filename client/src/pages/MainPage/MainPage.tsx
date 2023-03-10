import React, { useEffect } from 'react'

import './main-page.scss'
import { Sidebar } from '@App/components/Sidebar/Sidebar'

import { Board } from './components/Board/Board'

export const MainPage = () => {
  // useEffect(() => {
  //   const todos = getTodos()
  //   console.log('todos', todos)
  // }, [])
  //
  // async function getTodos() {
  //   return await request('api/todos/', 'GET')
  // }

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
