import React, { useRef, useState } from "react"

const MessageInput = ({ handleSubmit, setInputValue, inputValue, handleFileSend }) => {
  const fileInputRef = useRef(null)
  const [attachedFiles, setAttachedFiles] = useState([])

  const onFileChange = (e) => {
    const files = Array.from(e.target.files)
    setAttachedFiles((prev) => [...prev, ...files])
    e.target.value = ""
  }
  const removeFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim() && attachedFiles.length === 0) return
    handleSubmit({ text: inputValue.trim(), files: attachedFiles })
    setInputValue("")
    setAttachedFiles([])
  }
  return (
    <div>
      {attachedFiles.length > 0 && (
        <div className="chat__attached-files">
          {attachedFiles.map((file, index) => (
            <div key={index} className="chat__attached-file">
              📎 {file.name} ({(file.size / 1024).toFixed(1)} KB)
              <button type="button" className="chat__remove-file" onClick={() => removeFile(index)}>
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
      <form className="chat__form" onSubmit={onSubmit}>
        <textarea
          className="chat__textarea"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              onSubmit(e)
            }
          }}
          placeholder={`Введите сообщение (Shift+Enter — перенос строки)...`}
          rows={1}
        />

        <input
          type="file"
          id="fileUpload"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => onFileChange(e)}
        />
        <label htmlFor="fileUpload" className="chat__file-btn">
          📎
        </label>
        <button
          className="chat__send-btn"
          type="submit"
          disabled={!inputValue.trim() && attachedFiles.length === 0}
        >
          Отправить
        </button>
      </form>
    </div>
  )
}

export default MessageInput
