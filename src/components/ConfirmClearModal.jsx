import React from "react"
import "./confirmationModal.css"
const ConfirmModal = ({modal, isOpen, onConfirm, onCancel, title }) => {
  if (!isOpen) return null
  return (
    <div className="modal-overlay" onClick={onCancel} >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>

        <div className="modal-buttons">
          <button className="modal-button confirm" onClick={onConfirm}>
            Да
          </button>
          <button className="modal-button cancel" onClick={onCancel}>
            Нет
          </button>
        </div>
      </div>
      <div className="modal-overlay-hint">
        Нажми на темную область чтобы закрыть
      </div>
    </div>
  )
}

export default function ConfirmClearModal({modal, isOpen, onConfirm, onCancel }) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onConfirm={onConfirm}
      onCancel={onCancel}
      title={modal.type === "clear" ? "Вы хотите очистить чат?" : " Вы хотите удалить чат?"}
    />
  )
}
