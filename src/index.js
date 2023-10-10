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
    tasks: [
      // {name: 'сделать кофе', id: 1, done: false, isEdit: false},
      // {name: 'покурить кальян', id: 2, done: false, isEdit: false},
      // {name: 'сдать всё до дедлайна', id: 3, done: false ,isEdit: false},
      // {name: 'правка чекбокса', id: 4, done: false, isEdit: false},
      // {name: 'актуальное время', id: 5, done: false, isEdit: false},
      // {name: 'редактирование', id: 6, done: false, isEdit: false}
    ], // [{}]
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
      const idx = tasks.findIndex((el) => el.id === id)

      const newArray = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)]

      return {
        tasks: newArray,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)

      const oldItem = tasks[idx]
      const newItem = { ...oldItem, done: !oldItem.done }

      const newArray = [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)]

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
