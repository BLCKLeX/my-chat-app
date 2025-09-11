import React from "react"
import ChatListItem from "../ChatListItem"
const ChatList = ({ chats, handleDeleteChat, handleSelectChat, activeChatId,onAddChat,onChangeNewTitle,newChatTitle }) => {
  return (
    <>
      <div className="chat__add-chat-form">
        <input
          className="chat__form-input"
          type="text"
          value={newChatTitle}
          onChange={(e) => onChangeNewTitle(e.target.value)}
          placeholder="Название нового чата"
          onKeyDown={(e) => e.key === "Enter" && onAddChat()}
        />
        <button onClick={onAddChat} className="chat__add-btn">
          + Создать
        </button>
      </div>
      <ul className="chat__list">
        {chats.map((chat) => (
          <ChatListItem
            key={chat.chatId}
            chat={chat}
            isActive={chat.chatId === activeChatId}
            handleSelectChat={handleSelectChat}
            handleDeleteChat={handleDeleteChat}
          />
        ))}
      </ul>
    </>
  )
}

export default ChatList
