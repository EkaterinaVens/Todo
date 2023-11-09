import React from 'react'
import { array, func } from 'prop-types'
import classNames from 'classnames'
import Task from '../task/Task'
import './taskList.css'

const TaskList = ({ todos, setTasks }) => {
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

  const onTaskChange = (e, id) => {
    const label = e.target.value
    fillEditTask(label, id)
  }

  const onKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      onToggleEdit(id)
    }
  }

  const elements = todos.map((item) => {
    const { id, label, completed, edited } = item

    let taskClass = classNames({ completed: completed, editing: edited })

    return (
      <li key={id} className={taskClass}>
        <Task
          onToggleCompleted={() => onToggleCompleted(id)}
          onToggleEdit={() => onToggleEdit(id)}
          onDeleted={() => deleteTask(id)}
          {...item}
        />
        {edited && (
          <input
            className="edit"
            type="text"
            value={label}
            onChange={(e) => {
              onTaskChange(e, id)
            }}
            onKeyDown={(e) => {
              onKeyDown(e, id)
            }}
          />
        )}
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  todos: [],
}

TaskList.propTypes = {
  todos: array,
  setTasks: func.isRequired,
}

export default TaskList
