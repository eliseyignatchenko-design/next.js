"use client";

import React, { useEffect, useState } from "react";
import "./table.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface User {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

const MOCK_API_URL = "https://68f62aca6b852b1d6f1645db.mockapi.io/users";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(MOCK_API_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить пользователей");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${MOCK_API_URL}/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Ошибка при удалении:", err);
      alert("Не удалось удалить пользователя.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Загрузка...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text font-bold  text-center">
        Список Пользователей
      </h1>

      <table className="users-table">
        <thead>
          <tr className="users-table-header-row">
            <th>Аватар</th>
            <th>Имя</th>
            <th>Дата создания</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="fade-in">
              <td className="text-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="user-avatar"
                />
              </td>
              <td>{user.name}</td>
              <td>
                {new Date(user.createdAt).toLocaleString("uk-UA", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Удалить</Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle>Удалить пользователя?</DialogTitle>
                    <DialogDescription>
                      Це дія є незворотною. Ви впевнені, що хочете видалити
                      користувача <strong>{user.name}</strong>?
                    </DialogDescription>
                    <DialogHeader>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(user.id)}
                      >
                        Видалити
                      </Button>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
