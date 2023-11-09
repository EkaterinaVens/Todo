import React, { useState } from 'react'
import NewTaskForm from '../newTaskForm'
import TaskList from '../taskList'
import Footer from '../footer'
import './app.css'

const filterTasks = (arr, status) => {
  if (status !== 'All') {
    const newArr = arr.filter((el) => {
      if (status === 'Active') return !el.completed
      return el.completed
    })

    return newArr
  }
  return arr
}

const App = () => {
  const [tasks, setTasks] = useState([])
  const [statusFilter, setStatusFilter] = useState('All')

  const completedCount = tasks.filter((el) => el.completed).length
  const activeCount = tasks.length - completedCount
  const filteredTasks = filterTasks(tasks, statusFilter)

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm setTasks={setTasks} />
      </header>
      <section className="main">
        <TaskList todos={filteredTasks} setTasks={setTasks} />
        <Footer
          done={activeCount}
          setTasks={setTasks}
          statusFilter={statusFilter}
          changeStatusFilter={setStatusFilter}
        />
      </section>
    </section>
  )
}

export default App
