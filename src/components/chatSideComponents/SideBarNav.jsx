import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setActiveSection } from "../../features/chat/chatSlice"
import "./sideBarNav.css"
const SideBarNav = () => {
  const dispatch = useDispatch()
  const activeSection = useSelector((state) => state.chat.activeSection)
  return (
    <nav className="sidebar__nav">
      <ul>
        <li
          className={activeSection === "chats" ? "active" : ""}
          onClick={() => dispatch(setActiveSection("chats"))}
        >
          Чаты
        </li>
        <li
          className={activeSection === "users" ? "active" : ""}
          onClick={() => dispatch(setActiveSection("users"))}
        >
          Пользователи
        </li>
      </ul>
    </nav>
  )
}

export default SideBarNav
