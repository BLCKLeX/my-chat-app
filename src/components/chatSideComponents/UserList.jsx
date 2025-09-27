import React from "react"
import { useSelector } from "react-redux"
import "./userList.css"
const UserList = () => {
  const users = useSelector((state) => state.chat.users)
  console.log(users, "users")
  return (
    <div>
      <ul>
        {Object.values(users).map((user) => (
          <li className="user-list__item" key={user.id}>
            {user.name}
            <label className="user-checkbox" htmlFor={user.id}>
              <input type="checkbox" id={user.id} onChange={(e) => console.log(e.target.attributes)} />
              <span className="user-checkbox__checkmark"></span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
