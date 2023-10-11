/* eslint-disable no-unused-vars */
import React from 'react'
import { createRoot } from 'react-dom/client'

import NewTaskForm from './components/new-task-form'
import TaskList from './components/task-list'
import Footer from './components/footer'

const root = document.getElementById('root')

export default class App extends React.Component {
  maxId = 10

  state = {
    tasks: [],
    filter: 'active',
  }

  handleCreateTask = (name) => {
    this.setState(({ tasks }) => ({
      tasks: [
        ...tasks,
        {
          name,
          id: this.maxId++,
          done: false,
          isEdit: false,
          date: new Date(),
        },
      ],
    }))
  }

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const newArray = tasks.filter((task) => task.id !== id)
      return {
        tasks: newArray,
      }
    })
  }

  onToggleDone = (id) => {
    //map
    this.setState(({ tasks }) => {
      // const idx = tasks.findIndex((el) => el.id === id)

      // const oldItem = tasks[idx]
      // const newItem = { ...oldItem, done: !oldItem.done }

      // const newArray = [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)]
      const newArray = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            done: !task.done,
          }
        }
        return task
      })
      return {
        tasks: newArray,
      }
    })
  }

  getTasks = () => {
    const { tasks } = this.state
    const { filter } = this.state

    if (filter === 'Active') {
      return tasks.filter((el) => !el.done)
    }
    if (filter === 'Completed') {
      return tasks.filter((el) => el.done)
    }
    return tasks
  }

  onChangeFilter = (text) => {
    this.setState(({ filter }) => ({
      filter: text,
    }))
  }

  onClearCompleted = (id) => {
    this.setState(({ tasks }) => {
      const completedTasks = tasks.filter((el) => !el.done)

      return {
        tasks: completedTasks,
      }
    })
  }

  onEditTask = (id) => {
    //map
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const oldItem = tasks[idx]

      const newItem = { ...oldItem, isEdit: !oldItem.isEdit }

      const newArray = [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)]

      return {
        tasks: newArray,
      }
    })
  }

  newTextEditTask = (id, e) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)

      const oldItem = tasks[idx]

      const newItem = { ...oldItem, name: e, isEdit: false }

      const newArray = [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)]

      return {
        tasks: newArray,
      }
    })
  }

  render() {
    const doneCount = this.state.tasks.filter((el) => !el.done).length

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onCreateTask={this.handleCreateTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={this.getTasks()}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEditTask={this.onEditTask}
            newTextEditTask={this.newTextEditTask}
          />
          <Footer
            doneCount={doneCount}
            onChangeFilter={this.onChangeFilter}
            onClearCompleted={this.onClearCompleted}
            currentFilter={this.state.filter}
          />
        </section>
      </section>
    )
  }
}

createRoot(root).render(<App />)
