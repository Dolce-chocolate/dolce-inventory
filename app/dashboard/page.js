"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-cover bg-center flex flex-col items-center justify-start p-6" style={{ backgroundImage: 'url("/dolcedo.jpeg")' }}>
      <h1 className="text-3xl font-bold text-[#FFF4B9] mt-8 mb-8">DOLCE</h1>

      <div className="grid grid-cols-1 gap-4 items-center w-full max-w-xs">
        <Link href="/chocolate" legacyBehavior>
          <a className="group relative w-full inline-flex items-center justify-center overflow-hidden rounded-xl border-2 border-yellow-400 bg-yellow-200 px-6 py-3 font-bold text-yellow-900 shadow-lg hover:bg-yellow-300 transition-all">
            <span className="z-10">🍫 مخزن الشكلاطة</span>
          </a>
        </Link>

        <Link href="/packs" legacyBehavior>
          <a className="group relative w-full inline-flex items-center justify-center overflow-hidden rounded-xl border-2 border-yellow-400 bg-yellow-200 px-6 py-3 font-bold text-yellow-900 shadow-lg hover:bg-yellow-300 transition-all">
            <span className="z-10">📦 مخزن الباكوّات</span>
          </a>
        </Link>

        <Link href="/cafe" legacyBehavior>
          <a className="group relative w-full inline-flex items-center justify-center overflow-hidden rounded-xl border-2 border-yellow-400 bg-yellow-200 px-6 py-3 font-bold text-yellow-900 shadow-lg hover:bg-yellow-300 transition-all">
            <span className="z-10">☕ مخزن الكافي</span>
          </a>
        </Link>

        <Link href="/search" legacyBehavior>
          <a className="group relative w-full inline-flex items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-3 text-[#362B1D] border border-[#362B1D] font-medium shadow-sm hover:bg-[#f2f2f2] transition-all">
            <span className="z-10">🔍 البحث بالكود</span>
          </a>
        </Link>

        <Link href="/admin-dashboard/manage-users" legacyBehavior>
          <a className="group relative w-full inline-flex items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-3 text-[#362B1D] border border-[#362B1D] font-medium shadow-sm hover:bg-[#f2f2f2] transition-all">
            <span className="z-10">👥 إدارة المستخدمين</span>
          </a>
        </Link>

        <Link href="/reports" legacyBehavior>
          <a className="group relative w-full inline-flex items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-3 text-[#362B1D] border border-[#362B1D] font-medium shadow-sm hover:bg-[#f2f2f2] transition-all">
            <span className="z-10">📈 التقارير</span>
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
