// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { func } from 'prop-types'

import './new-task-form.css'

const NewTaskForm = ({ onTaskAdded }) => {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onLableChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinutesChange = (e) => {
    setMin(e.target.value)
  }

  const onSecondsChange = (e) => {
    setSec(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const text = e.target[0].value.trim()
    const min = e.target[1].value.trim()
    const sec = e.target[2].value.trim()

    if (text === '' || !text) {
      setLabel('')
      return
    }

    if (min < 0) {
      setMin('')
      return
    }

    if (sec < 0) {
      setSec('')
      return
    }

    onTaskAdded(text, min, sec)

    setLabel('')
    setMin('')
    setSec('')
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="Task"
        onChange={onLableChange}
        type="text"
        value={label}
        // autoFocus
        required
      ></input>
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onMinutesChange}
        type="number"
        value={min}
        required
      ></input>
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onSecondsChange}
        type="number"
        value={sec}
        required
      ></input>
      <button className="visually-hidden" type="submit"></button>
    </form>
  )
}

NewTaskForm.propTypes = {
  onTaskAdded: func.isRequired,
}

export default NewTaskForm
