

import React from 'react'; 


interface User {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

const MOCK_API_URL = "https://68f62aca6b852b1d6f1645db.mockapi.io/users"; 

async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch(MOCK_API_URL, {
    
      cache: "no-store",
    });

    if (!res.ok) {
      
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return [];
  }
}

export function UsersTable({ users }: { users: User[] }) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">Аватар</th>
          <th className="border border-gray-300 px-4 py-2">Имя</th>
          <th className="border border-gray-300 px-4 py-2">Дата создания</th>
        </tr>
      </thead>
      <tbody>
      
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2 text-center">
            
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full mx-auto object-cover"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
            <td className="border border-gray-300 px-4 py-2">
              {new Date(user.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}



export default async function UsersPage() {
  

  const users = await getUsers(); 

 
  if (users.length === 0) {
    return (
      <div className="p-8 text-red-500 text-center font-bold">
        ❌ Не удалось загрузить данные пользователей. 
        <br/>Проверьте: 1) полный URL в коде и 2) наличие данных на MockAPI.
      </div>
    );
  }

 
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Список Пользователей</h1>
      <UsersTable users={users} />
    </div>
  );
}