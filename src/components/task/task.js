// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { bool, func, instanceOf, number, string } from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

// import './task.css'

const Task = ({ id, label, date, time, onToggleCompleted, onToggleEdit, onDeleted, completed }) => {
  const [timeLeft, setTimeLeft] = useState(time)
  const [isCounting, setIsCounting] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting && setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0))
    }, 1000)

    if (timeLeft === 0) setIsCounting(false)
    if (completed) setIsCounting(false)
    return () => {
      clearInterval(interval)
    }
  }, [timeLeft, isCounting])

  const timerStart = () => {
    if (timeLeft === 0) setTimeLeft(time)
    setIsCounting(true)
  }

  const timerPause = () => {
    setIsCounting(false)
  }

  const convertTime = (timestamp) => {
    const min = Math.floor(timestamp / 60)
    const sec = timestamp % 60

    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="view">
      <input id={id} className="toggle" onClick={onToggleCompleted} type="checkbox" defaultChecked={completed}></input>
      <label htmlFor={id}>
        <span className="title">{label}</span>
        <span className="description">
          <button className="icon icon-play" onClick={timerStart}></button>
          <button className="icon icon-pause" onClick={timerPause}></button>
          {convertTime(timeLeft)}
        </span>
        <span className="description">
          created{' '}
          {formatDistanceToNow(date, {
            includeSeconds: true,
            addSuffix: true,
          })}
        </span>
      </label>
      <button className="icon icon-edit" onClick={onToggleEdit}></button>
      <button className="icon icon-destroy" onClick={onDeleted}></button>
    </div>
  )
}

Task.defaultProps = {
  completed: false,
}

Task.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  completed: bool,
  date: instanceOf(Date),
  min: number,
  sec: number,
  time: number,
  onToggleEdit: func.isRequired,
  onDeleted: func.isRequired,
  onToggleCompleted: func.isRequired,
}

export default Task
