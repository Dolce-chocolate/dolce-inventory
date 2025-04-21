"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ManageUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");
    setUsers(storedUsers);
  }, []);

  const handleAddUser = () => {
    if (!username || !password) return alert("يرجى تعبئة كل الحقول");

    const updatedUsers = {
      ...users,
      [username]: { password, role },
    };

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setUsername("");
    setPassword("");
  };

  const handleDeleteUser = (name) => {
    const updated = { ...users };
    delete updated[name];
    localStorage.setItem("users", JSON.stringify(updated));
    setUsers(updated);
  };

  return (
    <main className="min-h-screen bg-amber-50 p-6 text-center text-chocolate">
      <h1 className="text-2xl font-bold mb-4">👤 إدارة المستخدمين</h1>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded text-center"
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded text-center"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 border rounded text-center"
        >
          <option value="client">عميل</option>
          <option value="warehouse">أمين مخزن</option>
          <option value="admin">أدمن</option>
        </select>
        <button
          onClick={handleAddUser}
          className="bg-chocolate text-white px-4 py-2 rounded hover:opacity-90"
        >
          ➕ إضافة
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-3">📋 قائمة المستخدمين</h2>
      <table className="mx-auto border text-sm mb-6">
        <thead>
          <tr className="bg-chocolate text-white">
            <th className="border px-3 py-1">الاسم</th>
            <th className="border px-3 py-1">الدور</th>
            <th className="border px-3 py-1">إجراء</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(users).map(([name, info]) => (
            <tr key={name}>
              <td className="border px-3 py-1">{name}</td>
              <td className="border px-3 py-1">
                {info.role === "client"
                  ? "عميل"
                  : info.role === "warehouse"
                  ? "أمين مخزن"
                  : "أدمن"}
              </td>
              <td className="border px-3 py-1">
                <button
                  onClick={() => handleDeleteUser(name)}
                  className="text-red-600 hover:underline"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => router.push("/dashboard")}
        className="bg-gray-300 text-chocolate px-6 py-2 rounded hover:opacity-90"
      >
        ⬅️ العودة إلى لوحة التحكم
      </button>
    </main>
  );
}
