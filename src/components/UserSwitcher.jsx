import React, {useState} from "react"

import { useDispatch, useSelector } from "react-redux"
import { setActiveUser } from "../features/chat/chatSlice"
import './userSwitcher.css'
const UserSwitcher = () => {
    const dispatch = useDispatch()
    const { users, activeUserId } = useSelector((state) => state.chat)
    const [open, setOpen] = useState(false)
  
    const activeUser = users[activeUserId]
  
    const handleSelect = (userId) => {
      dispatch(setActiveUser(userId))
      setOpen(false)
    }
  
    return (
      <div className="user-select">
        <div className="user-select__control" onClick={() => setOpen(!open)}>
          <span>{activeUser ? activeUser.name : "Выберите пользователя"}</span>
          <span className="arrow">{open ? "▲" : "▼"}</span>
        </div>
        {open && (
          <ul className="user-select__list">
            {Object.values(users).map((user) => (
              <li
                key={user.id}
                className={`user-select__option ${
                  user.id === activeUserId ? "active" : ""
                }`}
                onClick={() => handleSelect(user.id)}
              >
                
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

export default UserSwitcher
