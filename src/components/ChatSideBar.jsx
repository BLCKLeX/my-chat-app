import React from "react"

import SideBarNav from "./chatSideComponents/SideBarNav"
import ChatList from "./chatSideComponents/ChatList"
import { useSelector, useDispatch } from "react-redux"
import UserList from "./chatSideComponents/UserList"

// Сайдбар со списком чатов + форма добавления
export default function ChatSidebar({
  chats,
  activeChatId,
  newChatTitle,
  onChangeNewTitle,
  onAddChat,
  handleSelectChat,
  handleDeleteChat,
}) {
  const activeSection = useSelector((state) => state.chat.activeSection)
  return (
    <aside className="chat__sidebar">
      <SideBarNav />
      {activeSection === 'users' &&(
        <UserList/>
      )}
      {activeSection === "chats" && (
        <ChatList
          newChatTitle={newChatTitle}
          onChangeNewTitle={onChangeNewTitle}
          onAddChat={onAddChat}
          chats={chats}
          handleDeleteChat={handleDeleteChat}
          handleSelectChat={handleSelectChat}
          activeChatId={activeChatId}
        />
      )}
    </aside>
  )
}
