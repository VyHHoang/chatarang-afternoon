import React, { Component } from 'react'

class MessageForm extends Component {
  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.addMessage()
  }

  render() {
    return (
      <form
        className="MessageForm"
        onSubmit={this.handleSubmit}
      >
        <input
          autoFocus
          required
          type="text"
          name="body"
          placeholder="Type a message..."
        />
        <button type="submit">
          Send
        </button>
      </form>
    )
  }
}

export default MessageForm
