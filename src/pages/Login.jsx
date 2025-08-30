import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addUser } from "../features/chat/chatSlice"

import { useState } from "react"

import "./login.css"
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const cleanName = name.trim()

    if (!cleanName.trim()) {
      setError("Введите имя")
      return
    }

    dispatch(addUser(cleanName))
    navigate("/chat")
  }
  return (
    <div className="login__wrapper">
      <div className="login">
        <div className="login__title-wrapper">
          <h2 className="login__title-text">
            <span>L</span>
            <span>o</span>
            <span>g</span>
            <span>i</span>
            <span>n</span>
          </h2>
        </div>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__form-content">
            <input
              className="login__input"
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button className="login__button" type="submit">
              Войти в чат
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Login
