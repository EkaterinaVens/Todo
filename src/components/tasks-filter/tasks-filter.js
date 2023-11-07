// eslint-disable-next-line no-unused-vars
import React from 'react'
import { func, string } from 'prop-types'

import './tasks-filter.css'

const FILTERS = ['All', 'Active', 'Completed']

let filterId = 100
const TasksFilter = ({ statusFilter, changeStatusFilter }) => {
  const buttons = FILTERS.map((item) => (
    <li key={filterId++}>
      <button
        type="button"
        className={statusFilter === item ? 'selected' : ''}
        onClick={() => {
          changeStatusFilter(item)
        }}
      >
        {item}
      </button>
    </li>
  ))
  return <ul className="filters">{buttons}</ul>
}

TasksFilter.defaultProps = {
  statusFilter: 'All',
}

TasksFilter.propTypes = {
  statusFilter: string,
  changeStatusFilter: func.isRequired,
}

export default TasksFilter
