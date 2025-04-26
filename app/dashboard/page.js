"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <main dir="rtl" className="min-h-screen bg-gradient-to-br from-[#3B2A1A] to-[#5A3F28] p-5 text-center font-sans text-gold">
      <h1 className="text-4xl font-extrabold mb-10 text-gold drop-shadow-lg">DOLCE CHOCOLATE</h1>

      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        <a href="/chocolate" className="bg-[#3B2A1A] rounded-2xl p-5 w-36 h-36 flex flex-col justify-center items-center shadow hover:shadow-gold transition transform hover:scale-105">
          <img src="/choco1.jpeg" alt="مخزن الشكلاطه" className="w-20 h-20 mb-2 object-contain" />
          <span className="text-gold font-bold text-sm">مخزن الشكلاطه</span>
        </a>

        <a href="/packs" className="bg-[#3B2A1A] rounded-2xl p-5 w-36 h-36 flex flex-col justify-center items-center shadow hover:shadow-gold transition transform hover:scale-105">
          <img src="/pack1.jpeg" alt="مخزن الباكوات" className="w-20 h-20 mb-2 object-contain" />
          <span className="text-gold font-bold text-sm">مخزن الباكوات</span>
        </a>

        <a href="/cafe" className="bg-[#3B2A1A] rounded-2xl p-5 w-36 h-36 flex flex-col justify-center items-center shadow hover:shadow-gold transition transform hover:scale-105">
          <img src="/cafe1.jpeg" alt="مخزن الكافي" className="w-20 h-20 mb-2 object-contain" />
          <span className="text-gold font-bold text-sm">مخزن الكافي</span>
        </a>

        <a href="/search" className="bg-[#3B2A1A] rounded-2xl p-5 w-36 h-36 flex flex-col justify-center items-center shadow hover:shadow-gold transition transform hover:scale-105">
          <img src="/ffd1.jpeg" alt="البحث عن منتج" className="w-20 h-20 mb-2 object-contain" />
          <span className="text-gold font-bold text-sm">البحث عن منتج</span>
        </a>

        <a href="/admin-dashboard/manage-users" className="bg-[#3B2A1A] rounded-2xl p-5 w-36 h-36 flex flex-col justify-center items-center shadow hover:shadow-gold transition transform hover:scale-105">
          <img src="/manage.jpeg" alt="إدارة المستخدمين" className="w-20 h-20 mb-2 object-contain" />
          <span className="text-gold font-bold text-sm">إدارة المستخدمين</span>
        </a>

        <a href="/reports" className="bg-[#3B2A1A] rounded-2xl p-5 w-36 h-36 flex flex-col justify-center items-center shadow hover:shadow-gold transition transform hover:scale-105">
          <img src="/reports1.jpeg" alt="التقارير" className="w-20 h-20 mb-2 object-contain" />
          <span className="text-gold font-bold text-sm">التقارير</span>
        </a>

        <a href="/dashboard/add" className="bg-[#3B2A1A] rounded-2xl p-5 w-36 h-36 flex flex-col justify-center items-center shadow hover:shadow-gold transition transform hover:scale-105">
          <img src="/add1.jpeg" alt="إضافة منتج" className="w-20 h-20 mb-2 object-contain" />
          <span className="text-gold font-bold text-sm">إضافة منتج</span>
        </a>

        <button
          onClick={() => {
            localStorage.clear();
            router.push("/unified-login");
          }}
          className="bg-[#3B2A1A] rounded-2xl p-5 w-36 h-36 flex flex-col justify-center items-center shadow hover:shadow-gold transition transform hover:scale-105"
        >
          <img src="/log1.jpeg" alt="تسجيل الخروج" className="w-20 h-20 mb-2 object-contain" />
          <span className="text-gold font-bold text-sm">تسجيل الخروج</span>
        </button>
      </div>
    </main>
  );
}
