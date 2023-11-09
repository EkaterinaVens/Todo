import React, { useState } from 'react'
import { func } from 'prop-types'

import './newTaskForm.css'

const NewTaskForm = ({ onTaskAdded }) => {
  const [label, setLabel] = useState('')
  const [time, setTime] = useState({ min: '', sec: '' })

  const onLableChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinutesChange = (e) => {
    setTime({ ...time, min: e.target.value })
  }

  const onSecondsChange = (e) => {
    setTime({ ...time, sec: e.target.value })
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
      setTime({ ...time, min: '' })
      return
    }

    if (sec < 0) {
      setTime({ ...time, sec: '' })
      return
    }

    onTaskAdded(text, min, sec)

    setLabel('')
    setTime({ min: '', sec: '' })
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
        value={time.min}
        required
      ></input>
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onSecondsChange}
        type="number"
        value={time.sec}
        max={59}
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
