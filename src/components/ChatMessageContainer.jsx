import React from "react"


import ChatMessageList from "./ChatMessageList"

const ChatMessageContainer = ({
  messages,
  userName,
  handleDeleteMessage,
  activeChatId,
  handleClearChat,
}) => {

  return (
    <div className="chat__messages-container">
      {activeChatId && (
        <div className="chat__messages-toolbar">
          <button
            onClick={handleClearChat}
            disabled={messages.length === 0}
            className="chat__clear-btn"
          >
            Очистить чат
          </button>
        </div>
      )}
      <ChatMessageList activeChatId={activeChatId} messages={messages} handleDeleteMessage={handleDeleteMessage} userName={userName}/>
    
    </div>
  )
}

export default ChatMessageContainer
