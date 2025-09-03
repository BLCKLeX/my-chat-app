import React from "react"
import { useDispatch } from "react-redux"
import { setUserAvatar } from "../features/chat/chatSlice"
import UserSwitcher from "./UserSwitcher"

const ChatHeader = ({ showChat, showVideo, onToggleChat, onToggleVideo, activeUserId, users }) => {
  const dispatch = useDispatch()
  const user = users[activeUserId]
  console.log(users)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (activeUserId) {
      dispatch(setUserAvatar(activeUserId, file))
    }
  }

  return (
    <div className="chat__header">
      {/* Левая часть: аватар + имя */}
      <div className="chat__user-info">
        {user?.avatar && <img src={user.avatar} alt="avatar" className="chat__avatar" />}

        {/* Кнопка загрузки картинки */}
        <label className="chat__upload-label">
          <span className="chat__avatar-plus">+</span>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
        </label>
        <span className="chat__user-name">{user?.name || "Неизвестный"}</span>
      </div>
    <div>
      <UserSwitcher/>
    </div>
      {/* Правая часть: кнопки */}
      <div className="chat__tabs-right">
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
