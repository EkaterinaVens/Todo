import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter'

import './index.css'

export default class Footer extends React.Component {
  render() {
    const { doneCount, onChangeFilter, onClearCompleted, currentFilter } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{doneCount} items left</span>
        <TasksFilter onChangeFilter={onChangeFilter} currentFilter={currentFilter} />
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}

Footer.propTypes = {
  doneCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.string,
}
