import React from "react"
import { useLocation } from "react-router-dom"
import "../components/chat-title.css"
import chatIcon from "../images/svg/chat.svg"
import homeIcon from "../images/svg/home.svg"
function Title({ title, classes }) {
  const safeTitle = typeof title === "string" ? title : String(title || "")
  


  return (
    <h1 className={classes || "chat-title"}>
      {safeTitle.split("").map((char, index) => (
        <span key={index} className="animated-char" style={{ animationDelay: `${index * 0.1}s` }}>
          {char}
        </span>
      ))}

    
    </h1>
  )
}

export default Title
