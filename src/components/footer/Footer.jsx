import React from 'react'
import { func, number, string } from 'prop-types'
import TasksFilter from '../tasksFilter'
import './footer.css'

const Footer = ({ done, statusFilter, changeStatusFilter, setTasks }) => {
  const clearCompleted = () => {
    setTasks((tasks) => tasks.filter((el) => !el.completed))
  }
  return (
    <footer className="footer">
      <span className="todo-count">{done} items left</span>
      <TasksFilter statusFilter={statusFilter} changeStatusFilter={changeStatusFilter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  done: 0,
  statusFilter: 'All',
}

Footer.propTypes = {
  done: number,
  statusFilter: string,
  changeStatusFilter: func.isRequired,
  setTasks: func.isRequired,
}

export default Footer
