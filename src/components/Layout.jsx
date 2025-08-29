import React from "react"
import Title from "./Title.jsx"
export default function Layout({ children }) {
  return (
    <div className="chat-stream">
      {/* <Title title="Stream Chat" classes='chat-stream__title'  /> */}

      {children}
    </div>
  )
}
