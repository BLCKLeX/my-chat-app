import React from "react"
import { useDispatch } from "react-redux"
import { setUserAvatar } from "../features/chat/chatSlice"
import UserSwitcher from "./UserSwitcher"

const ChatHeader = ({  activeUserId, users }) => {
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
         <img src={user.avatar} alt="choise photo"  className="chat__avatar" />

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
           <UserSwitcher/>
      </div>
    <div>
   
    </div>
      {/* Правая часть: кнопки */}
    
    </div>
  )
}

export default ChatHeader
