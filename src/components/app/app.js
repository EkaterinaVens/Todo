import React from 'react'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

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
    this.setState(({ tasks }) => {
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
    // eslint-disable-next-line no-unused-vars
    this.setState(() => ({
      filter: text,
    }))
  }

  onClearCompleted = () => {
    this.setState(({ tasks }) => {
      const completedTasks = tasks.filter((el) => !el.done)

      return {
        tasks: completedTasks,
      }
    })
  }

  onEditTask = (id) => {
    this.setState(({ tasks }) => {
      const newArray = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isEdit: !task.isEdit,
          }
        }
        return task
      })

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
