"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminDashboard() {
  const router = useRouter();

  const buttons = [
    { label: "🍫 مخزن الشكلاطة", path: "/chocolate" },
    { label: "🥜 مخزن الباكوات", path: "/packs" },
    { label: "☕ مخزن الكافي", path: "/cafe" },
    { label: "➕ إضافة منتج", path: "/add-product" },
    { label: "👥 إدارة المستخدمين", path: "/admin-dashboard/manage-users" },
    { label: "🔍 البحث بالكود", path: "/search" },
    { label: "📊 التقارير", path: "/reports" },
    { label: "📦 إدارة الطلبات", path: "/admin-orders" },
    { label: "🚪 تسجيل الخروج", path: "/unified-login" },
  ];

  return (
    <main className="bg-amber-50 min-h-screen flex flex-col items-center justify-center p-6 text-chocolate">
      {/* شعار دولتشي أكبر */}
      <Image
        src="/logo.png"
        alt="Dolce Logo"
        width={160}
        height={160}
        className="mb-4"
      />

      <h1 className="text-3xl font-bold mb-6">👨‍💼 لوحة تحكم الأدمن</h1>

      <div className="w-80 flex flex-col gap-4">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => router.push(btn.path)}
            className="w-full bg-gray-200 hover:bg-gray-300 text-lg py-3 px-6 rounded text-chocolate font-semibold shadow border border-gray-300"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </main>
  );
}
