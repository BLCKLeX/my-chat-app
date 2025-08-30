import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  setActiveChat,
  addMessageToActiveChat,
  addChat,
  deleteChat,
  deleteMessage,
  clearChatMessages,
} from "../features/chat/chatSlice"

import "./chat.css"
import ChatHeader from "../components/ChatHeader"
import ChatSideBar from "../components/ChatSideBar"
import ChatMessageContainer from "../components/ChatMessageContainer"
import MessageInput from "../components/MessageInput"
import VideoPanel from "../components/VideoPanel"
import ConfirmClearModal from "../components/ConfirmClearModal"
import { cleanupMessages, cleanupFiles } from "../utils/revokeObject"

const Chat = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // достаём из redux
  const { activeUserId, activeChatId, chats, users } = useSelector((state) => state.chat)

  // текущий юзер
  const currentUser = activeUserId ? users[activeUserId] : null
  const userName = currentUser ? currentUser.name : "Аноним"

  // чаты текущего юзера
  const userChats = activeUserId ? Object.values(chats[activeUserId] || {}) : []

  // активный чат
  const activeChat =
    activeUserId && activeChatId
      ? chats[activeUserId]?.[activeChatId] || { messages: [] }
      : { messages: [] }

  // сообщения активного чата
  const messages = activeChat.messages

  const [inputValue, setInputValue] = useState("")
  const [newChatTitle, setNewChatTitle] = useState("")
  const [modal, setModal] = useState({ open: false, type: null, chatId: null })

  const [showChat, setShowChat] = useState(
    () => JSON.parse(localStorage.getItem("showChat")) ?? true
  )
  const [showVideo, setShowVideo] = useState(
    () => JSON.parse(localStorage.getItem("showVideo")) ?? true
  )

  // если нет юзера → редирект на login
  useEffect(() => {
    if (!activeUserId) navigate("/login")
  }, [activeUserId, navigate])

  // отправка текста/файлов
  const handleSubmit = ({ text, files }) => {
    if (activeUserId && activeChatId) {
      dispatch(
        addMessageToActiveChat({
          userName,
          text,
          files: files?.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file),
          })),
        })
      )
    }
  }

  // создать новый чат
  const handleAddChat = () => {
    const title = newChatTitle.trim()
    if (title) {
      dispatch(addChat(title))
      setNewChatTitle("")
    }
  }

  // выбрать чат
  const handleSelectChat = (chatId) => {
    dispatch(setActiveChat(chatId))
  }

  // удалить сообщение
  const handleDeleteMessage = (messageId) => {
    
    if (!activeUserId || !activeChatId) return

    const msg = messages.find((message) => message.id === messageId)

    if (msg?.files) {
      cleanupFiles(msg.files)
      dispatch(deleteMessage({ chatId: activeChatId, messageId }))
    }
  }

  // модалка на удаление/очистку
  const handleDeleteChat = (chatId) => {
    setModal({ open: true, type: "delete", chatId })
  }
  const handleClearChat = () => {
    setModal({ open: true, type: "clear", chatId: activeChatId })
  }

  // подтверждение модалки
  const confrimModal = () => {
    if (!activeUserId || !modal.chatId) return
    const msgs = chats[activeUserId]?.[modal.chatId]?.messages || []

    if (modal.type === "clear") {
      cleanupMessages(msgs)
      dispatch(clearChatMessages(modal.chatId))
    } else if (modal.type === "delete") {
      cleanupMessages(msgs)
      dispatch(deleteChat(modal.chatId))
    }
    setModal({ open: false, type: null, chatId: null })
  }

  // отправка файлов (картинка/аудио/видео/док)
  const handleFileSend = (file) => {
    if (!file || !activeUserId || !activeChatId) return
    dispatch(
      addMessageToActiveChat({
        userName,
        text: "",
        files: [
          {
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file),
          },
        ],
      })
    )
  }

  const cancelModal = () => setModal({ open: false, type: null, chatId: null })

  // сохраняем состояние вкладок
  useEffect(() => {
    localStorage.setItem("showChat", JSON.stringify(showChat))
    localStorage.setItem("showVideo", JSON.stringify(showVideo))
  }, [showChat, showVideo])

  return (
    <div className="chat">
      <ChatHeader
        showChat={showChat}
        onToggleChat={setShowChat}
        showVideo={showVideo}
        onToggleVideo={setShowVideo}
      />

      <div className="chat__layout">
        <ChatSideBar
          chats={userChats}
          activeChatId={activeChatId}
          newChatTitle={newChatTitle}
          onChangeNewTitle={setNewChatTitle}
          onAddChat={handleAddChat}
          handleSelectChat={handleSelectChat}
          handleDeleteChat={handleDeleteChat}
        />

        {showChat && (
          <ChatMessageContainer
            userName={userName}
            handleClearChat={handleClearChat}
            activeChatId={activeChatId}
            messages={messages}
            handleDeleteMessage={handleDeleteMessage}
          />
        )}

        {showVideo && <VideoPanel />}
      </div>

      {showChat && activeChatId && (
        <MessageInput
          handleSubmit={handleSubmit}
          setInputValue={setInputValue}
          inputValue={inputValue}
          handleFileSend={handleFileSend}
        />
      )}

      <Link to="/" className="chat__home-link">
        На главную
      </Link>

      <ConfirmClearModal
        onConfirm={confrimModal}
        onCancel={cancelModal}
        modal={modal}
        isOpen={modal.open}
      />
    </div>
  )
}

export default Chat
