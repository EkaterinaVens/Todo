// eslint-disable-next-line no-unused-vars
import React from 'react'
import { array, func } from 'prop-types'
import classNames from 'classnames'
import Task from '../task'
import './task-list.css'

const TaskList = ({ todos, onDeleted, onToggleEdit, fillEditTask, onToggleCompleted }) => {
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
          onDeleted={() => onDeleted(id)}
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
  onDeleted: func.isRequired,
  onToggleEdit: func.isRequired,
  fillEditTask: func.isRequired,
  onToggleCompleted: func.isRequired,
}

export default TaskList
