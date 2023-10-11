import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends React.Component {
  render() {
    const { name, onDeleted, onToggleDone, done, onEditTask, isEdit, newTextEditTask, date } = this.props
    let classNames = ''

    switch (true) {
      case done:
        classNames = 'completed'
        break
      case isEdit:
        classNames = 'editing'
        break
      default:
        classNames = ''
    }

    return (
      <li className={classNames}>
        {!isEdit ? (
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={done}
              // onClick={this.onCheckboxClick}
              onChange={onToggleDone}
              contentEditable="true"
            />

            <label>
              <span className="description">{name}</span>
              <span className="created">
                created {formatDistanceToNow(date, { includeSeconds: true, addSuffix: true })}
              </span>
            </label>
            <button className="icon icon-edit" onClick={onEditTask} disabled={done} />
            <button className="icon icon-destroy" onClick={onDeleted} />
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              newTextEditTask(e.target.editTask.value)
            }}
          >
            <input name="editTask" type="text" className="edit" contentEditable="true" defaultValue={name} />
          </form>
        )}
      </li>
    )
  }
}

Task.defaultProps = {
  done: false,
  isEdit: false,
}
Task.propTypes = {
  done: PropTypes.bool,
  isEdit: PropTypes.bool,
  onDeleted: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  name: PropTypes.string,
  date: PropTypes.object,
  onToggleDone: PropTypes.func,
  newTextEditTask: PropTypes.func,
}
