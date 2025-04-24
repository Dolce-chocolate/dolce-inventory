"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

export default function ManageUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    });

    return () => unsubscribe();
  }, []);

  const handleAddUser = async () => {
    if (!username || !password) return alert("يرجى تعبئة كل الحقول");

    try {
      await addDoc(collection(db, "users"), { username, password, role });
      setUsername("");
      setPassword("");
    } catch (error) {
      alert("❌ حدث خطأ أثناء الإضافة");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
    } catch (error) {
      alert("❌ حدث خطأ أثناء الحذف");
    }
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
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-3 py-1">{user.username}</td>
              <td className="border px-3 py-1">
                {user.role === "client"
                  ? "عميل"
                  : user.role === "warehouse"
                  ? "أمين مخزن"
                  : "أدمن"}
              </td>
              <td className="border px-3 py-1">
                <button
                  onClick={() => handleDeleteUser(user.id)}
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
