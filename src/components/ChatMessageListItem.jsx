import React from 'react'
import ChatMessageMediaItem from "./ChatMessageMediaItem"

const ChatMessageListItem = ({ msg, userName, handleDeleteMessage }) => {
  return (
    <li
      className={`chat__message ${
        msg.userName === userName ? "chat__message--own" : "chat__message--other"
      }`}
    >
      <div className="chat__message-header">
        <span className="chat__message-username">{msg.userName}</span>
        <span className="chat__message-time">
          {new Date(msg.timestamp).toLocaleTimeString()}
        </span>
      </div>

      {/* 🔥 важно — выводим только msg.text, а не msg целиком */}
      {msg.text && typeof msg.text === "string" && (
        <div className="chat__message-text">{msg.text}</div>
      )}

      {msg.files && msg.files.length > 0 && (
        <div className="chat__message-file">
          {msg.files.map((file, i) => (
            <ChatMessageMediaItem file={file} key={i} />
          ))}
        </div>
      )}

      {msg.userName === userName && (
        <button
          className="chat__delete-msg-btn"
          onClick={() => handleDeleteMessage(msg.id)}
          title="Удалить сообщение"
        >
          удалить
        </button>
      )}
    </li>
  )
}

export default ChatMessageListItem