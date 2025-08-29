import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addUser } from "../features/chat/chatSlice"

import { useState } from "react"

import "./login.css"
const Login = () => {

  const users = useSelector(state => state.chat.users)
  const chat = useSelector(state => state.chat)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [nickname, setNickname] = useState("")
  const [error, setError] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    const cleanName = name.trim()
    const cleanNickname = nickname.trim().toLowerCase()
    const existUser = Object.values(users).find(user => user.nickname === cleanNickname)
    if(!cleanName.trim() && !cleanNickname.trim()){
      setError('Введите имя и псевдоним')
      return
    }
    if(existUser){
      setError('"Этот псевдоним занят выберите другой')
      return
    }
    dispatch(addUser(cleanName,cleanNickname))
    navigate('/chat')

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
            <input
              className="login__input"
              type="text"
              placeholder="Ваш псевдоним"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
           
            <button className="login__button" type="submit">
              Войти в чат
            </button>
            <p>{error}</p>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Login
