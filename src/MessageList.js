import React from 'react'

import Message from './Message'

const MessageList = () => {
  const messages = [
    {
      id: 1,
      user: {
        uid: 'sdfs34849327',
        displayName: 'Davey',
        email: 'davey@fretless.com',
      },
      body: 'Chatting up a storm, yo!',
    },

    {
      id: 2,
      user: {
        uid: 'sdlfkj35948',
        displayName: 'Dana',
        email: 'dana@fretless.com',
      },
      body: 'This guy is so annoying. I hate my job.',
    },
  ]

  return (
    <div className="MessageList">
      {
        messages.map(msg => (
          <Message message={msg} key={msg.id} />
        ))
      }
    </div>
  )
}

export default MessageList
