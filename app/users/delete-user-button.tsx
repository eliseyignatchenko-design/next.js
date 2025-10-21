"use client";

import React, { useState } from "react";
import "./delete-user-button.css";

interface DeleteUserButtonProps {
  userId: string;
  userName: string;
  onDelete: (id: string) => void;
}

export default function DeleteUserButton({
  userId,
  userName,
  onDelete,
}: DeleteUserButtonProps) {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await fetch(`https://68f62aca6b852b1d6f1645db.mockapi.io/users/${userId}`, {
        method: "DELETE",
      });
      onDelete(userId);
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      alert("Не удалось удалить пользователя");
    } finally {
      setIsDeleting(false);
      setConfirm(false);
    }
  };

  return (
    <div className="delete-container">
      {!confirm ? (
        <button className="delete-btn" onClick={() => setConfirm(true)}>
          🗑 Удалить
        </button>
      ) : (
        <div className="confirm-box">
          <p>Удалить {userName}?</p>
          <div className="confirm-actions">
            <button
              className="confirm-yes"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Удаляю..." : "Да"}
            </button>
            <button
              className="confirm-no"
              onClick={() => setConfirm(false)}
              disabled={isDeleting}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
