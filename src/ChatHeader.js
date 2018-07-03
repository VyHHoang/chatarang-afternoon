import React, { Component } from 'react'

class ChatHeader extends Component {
  render() {
    return (
      <header className="ChatHeader">
        <div className="roomInfo">
          <h2>#general</h2>
          <p>Announcements and general chat</p>
        </div>
      </header>
    )
  }
}

export default ChatHeader
