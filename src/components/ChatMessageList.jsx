import React, { useEffect, useRef } from "react"

import ChatMessageListItem from './ChatMessageListItem';

const ChatMessageList = ({messages, handleDeleteMessage, userName, activeChatId}) => {
    const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <ul className="chat__messages">
      {messages.length > 0 ? (
        messages.map((msg) => (
            <ChatMessageListItem key={msg.id} msg={msg} userName={userName} handleDeleteMessage={handleDeleteMessage}/>

        ))
      ) : (
        <li className="chat__no-messages">
          {activeChatId ? "Нет сообщений в этом чате" : "Выберите или создайте чат"}
        </li>
      )}
      <div ref={bottomRef} />
    </ul>
  )
}

export default ChatMessageList
