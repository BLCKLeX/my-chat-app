import React from 'react'
import { isImage, isAudio, isVideo } from "../utils/fileType"
const ChatMessageMediaItem = ({ file, i }) => {
  if (isImage(file.type)) {
    return (
      <img key={i} src={file.url} alt={file.name} className="chat__file-image" />
    )
  }
  if (isAudio(file.type)) {
    return (
      <audio
        key={i}
        controls
        preload="metadata"
        src={file.url}
        className="chat__file-audio"
      />
    )
  }
  if (isVideo(file.type)) {
    return (
      <video
        key={i}
        src={file.url}
        controls
        preload="metadata"
        playsInline
      />
    )
  }
  return (
    <a
      key={i}
      className="chat__link-file"
      href={file.url}
      download={file.name}
      target="_blank"
      rel="noopener noreferrer"
    >
      📎 {file.name} ({(file.size / 1024).toFixed(1)} KB)
    </a>
  )
}

export default ChatMessageMediaItem