import React, { memo } from "react"

function ChatListItem({ chat, isActive, handleSelectChat, handleDeleteChat }) {
  return (
    <li className={isActive ? "active" : ""}>
      <div
        className="chat__list-content"
        onClick={() => handleSelectChat(chat.chatId)}
      >
        {/* показываем только строку */}
        <span className="chat__list-title">
          {chat.title || `Чат ${chat.chatId}`}
        </span>

        <div className="chat__wrapper-list-count">
         
          <span className="chat__list-count">
            {(chat.messages?.length || 0) + " сообщ."}
          </span>

          <button
            className="chat__delete-btn"
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteChat(chat.chatId)
            }}
            title="Удалить чат"
          >
            ×
          </button>
        </div>
      </div>
    </li>
  )
}

export default memo(ChatListItem)