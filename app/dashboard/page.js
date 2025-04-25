"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-cover bg-center flex flex-col items-center justify-start p-6" style={{ backgroundImage: 'url("/dolcedo.jpeg")' }}>
      <h1 className="text-3xl font-bold text-[#FFF4B9] mt-8 mb-8">DOLCE</h1>

      <div className="grid grid-cols-1 gap-1 items-center w-full max-w-xs">
        <Link href="/chocolate" legacyBehavior>
          <a className="w-[150px] h-[50px] bg-[#713600] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform flex items-center justify-center">
            🍫 مخزن الشكلاطة
          </a>
        </Link>

        <Link href="/packs" legacyBehavior>
          <a className="w-[150px] h-[50px] bg-[#713600] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform flex items-center justify-center">
            📦 مخزن الباكوّات
          </a>
        </Link>

        <Link href="/cafe" legacyBehavior>
          <a className="w-[150px] h-[50px] bg-[#713600] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform flex items-center justify-center">
            ☕ مخزن الكافي
          </a>
        </Link>

        <Link href="/search" legacyBehavior>
          <a className="w-[150px] h-[50px] bg-[#713600] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform flex items-center justify-center">
            🔍 البحث بالكود
          </a>
        </Link>

        <Link href="/admin-dashboard/manage-users" legacyBehavior>
          <a className="w-[150px] h-[50px] bg-[#713600] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform flex items-center justify-center">
            👥 إدارة المستخدمين
          </a>
        </Link>

        <Link href="/reports" legacyBehavior>
          <a className="w-[150px] h-[50px] bg-[#713600] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform flex items-center justify-center">
            📈 التقارير
          </a>
        </Link>

        <Link href="/add-product" legacyBehavior>
          <a className="w-[150px] h-[50px] bg-[#713600] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform flex items-center justify-center">
            ➕ إضافة منتج
          </a>
        </Link>

        <button
          onClick={() => {
            localStorage.clear();
            router.push("/unified-login?loggedout=true");
          }}
          className="mt-8 bg-red-500 text-white font-semibold px-6 py-2 rounded hover:bg-red-600"
        >
          تسجيل الخروج
        </button>
      </div>
    </main>
  );
}
