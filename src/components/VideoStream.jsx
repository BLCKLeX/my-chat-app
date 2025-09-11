import React, { useEffect, useRef, useState } from "react"

const VideoStream = () => {
  const videoRef = useRef(null)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
  
    const qualityMap = {
      low: { width: { ideal: 320 }, height: { ideal: 240 } },
      medium: { width: { ideal: 640 }, height: { ideal: 480 } },
      high: { width: { ideal: 1280 }, height: { ideal: 720 } },
    }
  
    const getConstraints = (quality) => ({
      video: {
      
        ...qualityMap[quality],
      },
      audio: false,
    })
  
    const enableCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const hasVideoInput = devices.some((d) => d.kind === "videoinput")
        if (!hasVideoInput) throw new Error("Камера не найдена")
  
        let mediaStream = null
  
        // 1. Пробуем high
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia(
            getConstraints("high")
          )
        } catch {
          console.warn("High не доступно, пробуем medium…")
        }
  
        // 2. Если high не получилось → medium
        if (!mediaStream) {
          try {
            mediaStream = await navigator.mediaDevices.getUserMedia(
              getConstraints("medium")
            )
          } catch {
            console.warn("Medium не доступно, пробуем low…")
          }
        }
  
        // 3. Если даже medium не удалось → low
        if (!mediaStream) {
          mediaStream = await navigator.mediaDevices.getUserMedia(
            getConstraints("low")
          )
        }
  
        if (isMounted && videoRef.current) {
          videoRef.current.srcObject = mediaStream
          setStream(mediaStream)
          setError(null)
  
          // Лог реального качества
          const track = mediaStream.getVideoTracks()[0]
          const settings = track.getSettings()
          console.log("Камера выдала:", settings.width, "x", settings.height)
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
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }
        setStream(null)
      }
    }
  
    return () => {
      isMounted = false
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }
      }
    }
  }, [isCameraOn])
  return (
    <div className="video-stream">
      {isCameraOn && !error ? (
        <video ref={videoRef} autoPlay playsInline controls className="video-player" />
      ) : (
        <div className="video-placeholder">
          {error ? `⚠️ ${error}` : "Камера выключена"}
        </div>
      )}

      <div className="video-controls">
        <button
          onClick={() => setIsCameraOn((prev) => !prev)}
          className="video-toggle-btn"
        >
          {isCameraOn ? "Выключить камеру" : "Включить камеру"}
        </button>
      </div>
    </div>
  )
}

export default VideoStream