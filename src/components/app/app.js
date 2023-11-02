// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import uuid from 'react-uuid'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'
import './app.css'

const App = () => {
  const [todoData, setTodoData] = useState([])
  const [statusFilter, setStatusFilter] = useState('All')

  function createTask(label, min, sec) {
    const minNum = Number(min)
    const secNum = Number(sec)
    const time = minNum * 60 + secNum

    return {
      id: uuid(),
      label,
      completed: false,
      edited: false,
      date: new Date(),
      min: minNum,
      sec: secNum,
      time,
    }
  }

  const findIdxTask = (id) => {
    return todoData.findIndex((el) => el.id === id)
  }

  const togglePropperty = (arr, id, prop) => {
    const idx = findIdxTask(id)

    const oldItem = arr[idx]
    const newItem = { ...oldItem, [prop]: !oldItem[prop] }

    return arr.toSpliced(idx, 1, newItem)
  }

  const addTask = (text, min, sec) => {
    setTodoData((todoData) => [...todoData, createTask(text, min, sec)])
  }

  const onToggleEdit = (id) => {
    setTodoData((todoData) => togglePropperty(todoData, id, 'edited'))
  }

  const fillEditTask = (label, id) => {
    setTodoData((todoData) => {
      const idx = findIdxTask(id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, label }

      const newTodoData = todoData.toSpliced(idx, 1, newItem)

      return newTodoData
    })
  }

  const deleteTask = (id) => {
    setTodoData((todoData) => {
      const idx = findIdxTask(id)
      const newTodoData = todoData.toSpliced(idx, 1)

      return newTodoData
    })
  }

  const onToggleCompleted = (id) => {
    setTodoData((todoData) => togglePropperty(todoData, id, 'completed'))
  }

  const clearCompleted = () => {
    setTodoData((todoData) => todoData.filter((el) => !el.completed))
  }

  const changeStatusFilter = (status) => {
    setStatusFilter(status)
  }

  const filterTask = (arr, status) => {
    if (status !== 'All') {
      const newArr = arr.filter((el) => {
        if (status === 'Active') return !el.completed // Active
        return el.completed // Completed
      })

      return newArr
    }
    return arr // All
  }

  const completedCount = todoData.filter((el) => el.completed).length
  const activeCount = todoData.length - completedCount

  const renderTodoData = filterTask(todoData, statusFilter)

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onTaskAdded={addTask} />
      </header>
      <section className="main">
        <TaskList
          todos={renderTodoData}
          onToggleCompleted={onToggleCompleted}
          onToggleEdit={onToggleEdit}
          fillEditTask={fillEditTask}
          onDeleted={deleteTask}
        />
        <Footer
          done={activeCount}
          clearCompleted={clearCompleted}
          statusFilter={statusFilter}
          changeStatusFilter={changeStatusFilter}
        />
      </section>
    </section>
  )
}

export default App
