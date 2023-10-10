import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends React.Component {
  render() {
    const { text, onDeleted, onToggleDone, done, onEditTask, isEdit, newTextEditTask, date } = this.props
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
              <span className="description">{text}</span>
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
            <input name="editTask" type="text" className="edit" contentEditable="true" defaultValue={text} />
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
  text: PropTypes.string,
  date: PropTypes.object,
  onToggleDone: PropTypes.func,
  newTextEditTask: PropTypes.func,
}
