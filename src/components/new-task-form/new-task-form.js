import React from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends React.Component {
  onAdd = (event) => {
    if (event.code === 'Enter') {
      if (event.target.value.replace(/\s*/, '') !== '') {
        this.props.onCreateTask(event.target.value)
      }
      event.target.value = ''
    }
  }

  render() {
    return <input className="new-todo" type="text" placeholder="What needs to be done?" onKeyUp={this.onAdd} />
  }
}

NewTaskForm.propTypes = {
  onCreateTask: PropTypes.func,
}
