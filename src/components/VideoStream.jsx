import React, { useEffect, useRef, useState } from "react"
import "./video.css"
const VideoStream = () => {
  const videoRef = useRef(null)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [videoQuality, setVideoQuality] = useState("medium")
  const [facingMode, setFacingMode] = useState("user")
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)

  const getContains = () => {
    const qualityMap = {
      low: { width: { ideal: 320 }, height: { ideal: 240 } }, // Заменяем exact на ideal
      medium: { width: { ideal: 640 }, height: { ideal: 480 } },
      high: { width: { ideal: 1280 }, height: { ideal: 720 } }, // Исправлено hight → high
    };
    return {
      video: {
        facingMode,
        ...qualityMap[videoQuality],
      },
      audio: false,
    }
  }
  useEffect(() => {
    let isMounted = true

    const enableCamera = async () => {
      try {
        // Проверка наличия видеоустройств
        const devices = await navigator.mediaDevices.enumerateDevices()
        const hasVideoInput = devices.some((d) => d.kind === "videoinput")

        if (!hasVideoInput) {
          throw new Error("Камера не найдена")
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia(getContains())
      
        if (isMounted && videoRef.current) {
          videoRef.current.srcObject = mediaStream
          setStream(mediaStream)
          setError(null)
        }
      } catch (err) {
        console.error("Ошибка доступа к камере:", err)
        setIsCameraOn(false)
        setError(err.message || "Ошибка при доступе к камере")
      }
    }

    if (isCameraOn) {
      enableCamera()
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
        setStream(null)
      }
    }

    return () => {
      isMounted = false
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isCameraOn, videoQuality])

  return (
    <div className="video-stream">
      {isCameraOn && !error ? (
        <video ref={videoRef} controls autoPlay  playsInline className="video-player" />
      ) : (
        <div className="video-placeholder">{error ? `⚠️ ${error}` : "Камера выключена"}</div>
      )}
      <div className="video-controls">
        <button onClick={() => setIsCameraOn((prev) => !prev)} className="video-toggle-btn">
          {isCameraOn ? "Выключить камеру" : "Включить камеру"}
        </button>
        <select
          className="video-quality-select"
          value={videoQuality}
          onChange={(e) => setVideoQuality(e.target.value)}
        >
          <option value="low">Низкое качество</option>
          <option value="medium">Среднее качество</option>
          <option value="hight">Высокое качество</option>
        </select>
      </div>
    </div>
  )
}

export default VideoStream
