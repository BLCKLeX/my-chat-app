import React from 'react'

const ChatHeader = ({showChat, showVideo, onToggleChat, onToggleVideo}) => {
  return (
    <div className="chat__header">
        <div className="chat__tabs-left">
          <button onClick={() => onToggleChat(!showChat)} className="chat__btn-chat">
            {showChat ? "Скрыть чат" : "Показать чат"}
          </button>
          <button onClick={() => onToggleVideo(!showVideo)} className="chat__btn-video">
            {showVideo ? "Скрыть видео" : "Показать видео"}
          </button>
        </div>
      </div>
  )
}

export default ChatHeader
