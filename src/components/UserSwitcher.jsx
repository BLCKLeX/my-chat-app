import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveUser } from "../features/chat/chatSlice"
const UserSwitcher = () => {
  const dispatch = useDispatch()
  const { users, activeUserId } = useSelector((state) => state.chat)

  const handleChange = (e) => {
    const userId = e.target.value
    console.log(userId);
    dispatch(setActiveUser(userId))
  }
  return (
    <select value={activeUserId || ""} onChange={handleChange}>
      <option value={activeUserId} disabled>
        {" "}
        выберите пользователя
      </option>
      {Object.values(users).map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  )
}

export default UserSwitcher
