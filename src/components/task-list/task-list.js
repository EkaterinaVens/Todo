// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import Task from '../task'

const TaskList = ({ tasks, onDeleted, onToggleDone, onEditTask, newTextEditTask }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          onDeleted={() => onDeleted(task.id)}
          onToggleDone={() => onToggleDone(task.id)}
          onEditTask={() => onEditTask(task.id)}
          newTextEditTask={(newTaskName) => {
            newTextEditTask(task.id, newTaskName)
          }}
        />
      ))}
    </ul>
  )
}
TaskList.propTypes = {
  tasks: PropTypes.array,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditTask: PropTypes.func,
  newTextEditTask: PropTypes.func,
}

export default TaskList
