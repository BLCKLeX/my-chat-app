import React from "react"
import { Link } from "react-router-dom"
import Title from "../components/Title"

const Home = () => {
  return (
    <div className="home">
      <Title title='C h a t ' classes='chat-stream__title login__title'/>
      <Title title='Stream   ' classes='chat-stream__title login__title'/>
      <h2 className="home__title">Добро пожаловать на главную страницу</h2>
      <Link className="home__link" to="/login">
        перейти в чат
      </Link>

  
    </div>
  )
}
export default Home
