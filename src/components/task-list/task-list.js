import React from 'react'
import PropTypes from 'prop-types'
import Task from '../task'

export default class TaskList extends React.Component {
  render() {
    const { tasks, onDeleted, onToggleDone, onEditTask, newTextEditTask } = this.props

    return (
      <ul className="todo-list">
        {tasks.map((task) => (
          <Task
            key={task.id}
            text={task.name}
            onDeleted={() => onDeleted(task.id)}
            onToggleDone={() => onToggleDone(task.id)}
            done={task.done}
            onEditTask={() => onEditTask(task.id)}
            isEdit={task.isEdit}
            newTextEditTask={(newTaskName) => {
              newTextEditTask(task.id, newTaskName)
            }}
            date={task.date}
          />
        ))}
      </ul>
    )
  }
}
TaskList.propTypes = {
  tasks: PropTypes.array,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditTask: PropTypes.func,
  newTextEditTask: PropTypes.func,
}
