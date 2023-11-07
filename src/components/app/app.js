// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import uuid from 'react-uuid'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'
import './app.css'

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

const togglePropperty = (arr, id, prop) => {
  const newArr = arr.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        [prop]: !task[prop],
      }
    }
    return task
  })
  return newArr
}

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

  const addTask = (text, min, sec) => {
    setTasks((tasks) => [...tasks, createTask(text, min, sec)])
  }

  const onToggleEdit = (id) => {
    setTasks((tasks) => togglePropperty(tasks, id, 'edited'))
  }

  const fillEditTask = (label, id) => {
    setTasks((tasks) => {
      const newArr = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            label,
          }
        }
        return task
      })
      return newArr
    })
  }

  const deleteTask = (id) => {
    setTasks((tasks) => {
      return tasks.filter((task) => task.id !== id)
    })
  }

  const onToggleCompleted = (id) => {
    setTasks((tasks) => togglePropperty(tasks, id, 'completed'))
  }

  const clearCompleted = () => {
    setTasks((tasks) => tasks.filter((el) => !el.completed))
  }

  // const changeStatusFilter = (status) => {
  //   setStatusFilter(status)
  // }

  const completedCount = tasks.filter((el) => el.completed).length
  const activeCount = tasks.length - completedCount
  const filteredTasks = filterTasks(tasks, statusFilter)

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onTaskAdded={addTask} />
      </header>
      <section className="main">
        <TaskList
          todos={filteredTasks}
          onToggleCompleted={onToggleCompleted}
          onToggleEdit={onToggleEdit}
          fillEditTask={fillEditTask}
          onDeleted={deleteTask}
        />
        <Footer
          done={activeCount}
          clearCompleted={clearCompleted}
          statusFilter={statusFilter}
          changeStatusFilter={setStatusFilter}
        />
      </section>
    </section>
  )
}

export default App
