import React, { useRef, useEffect } from "react"

const NotFound = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    canvas.width = canvas.offsetWidth
    canvas.height = 60

    const barCount = 60
    const barWidth = canvas.width / barCount
    let time = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.05

      for (let i = 0; i < barCount; i++) {
        const x = i * barWidth
        const wave = Math.sin(i * 0.3 + time)
        const height = (wave + 1) * 20 + 10

        // Вертикальный градиент от чёрного к белому
        const gradient = ctx.createLinearGradient(0, canvas.height - height, 0, canvas.height)
        gradient.addColorStop(0, "#000")
        gradient.addColorStop(1, "#fff")

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - height, barWidth * 0.3, height)
      }

      requestAnimationFrame(draw)
    }

    draw()
  }, [])
  return (
    <div className="notfound">
      <h2 className="notfound__title">
        Страница не найдена - <span className="notfound__span">404</span>{" "}
      </h2>
      <canvas ref={canvasRef} className="login__wave" />
    </div>
  )
}

export default NotFound
