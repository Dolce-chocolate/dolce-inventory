"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-cover bg-center flex flex-col items-center justify-start p-6" style={{ backgroundImage: 'url("/dolcedo.jpeg")' }}>
      <h1 className="text-3xl font-bold text-[#362B1D] mt-8 mb-8">لوحة تحكم <span className="text-[#362B1D]">Dolce</span></h1>

      <div className="flex flex-col gap-4 items-center w-full max-w-sm">
        <Link href="/chocolate" legacyBehavior>
          <a className="bg-[#E8E0D2] hover:bg-[#d5c6af] transition duration-200 text-[#362B1D] font-bold py-3 px-6 rounded-xl shadow-md w-full text-center">
            🍫 مخزن الشكلاطة
          </a>
        </Link>

        <Link href="/packs" legacyBehavior>
          <a className="bg-[#E8E0D2] hover:bg-[#d5c6af] transition duration-200 text-[#362B1D] font-bold py-3 px-6 rounded-xl shadow-md w-full text-center">
            📦 مخزن الباكوّات
          </a>
        </Link>

        <Link href="/cafe" legacyBehavior>
          <a className="bg-[#E8E0D2] hover:bg-[#d5c6af] transition duration-200 text-[#362B1D] font-bold py-3 px-6 rounded-xl shadow-md w-full text-center">
            ☕ مخزن الكافي
          </a>
        </Link>

        <Link href="/search" legacyBehavior>
          <a className="mt-6 bg-white text-[#362B1D] border border-[#362B1D] px-5 py-2 rounded-lg hover:bg-[#f2f2f2] w-full text-center">
            🔍 البحث بالكود
          </a>
        </Link>

        <Link href="/admin-dashboard/manage-users" legacyBehavior>
          <a className="bg-white text-[#362B1D] border border-[#362B1D] px-5 py-2 rounded-lg hover:bg-[#f2f2f2] w-full text-center">
            👥 إدارة المستخدمين
          </a>
        </Link>

        <Link href="/reports" legacyBehavior>
          <a className="bg-white text-[#362B1D] border border-[#362B1D] px-5 py-2 rounded-lg hover:bg-[#f2f2f2] w-full text-center">
            📈 التقارير
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
