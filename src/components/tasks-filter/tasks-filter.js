import React from 'react'
import './index.css'
import PropTypes from 'prop-types'

export default class TasksFilter extends React.Component {
  filterId = 100

  render() {
    const { currentFilter, onChangeFilter } = this.props
    const filters = ['All', 'Active', 'Completed']

    const buttons = filters.map((item) => (
      <li key={this.filterId++}>
        <button
          type="button"
          className={currentFilter === item ? 'selected' : ''}
          onClick={() => {
            onChangeFilter(item)
          }}
        >
          {item}
        </button>
      </li>
    ))

    return <ul className="filters">{buttons}</ul>
  }
}

TasksFilter.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func,
}
