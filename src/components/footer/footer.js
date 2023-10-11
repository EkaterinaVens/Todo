import PropTypes from 'prop-types'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import TasksFilter from '../tasks-filter'

import './index.css'

const Footer = ({ doneCount, onChangeFilter, onClearCompleted, currentFilter }) => {
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

Footer.propTypes = {
  doneCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.string,
}

export default Footer
