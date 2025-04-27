'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3B2A1A] to-[#5A3F28] flex flex-col items-center justify-start p-6 animate-fade-in">
      <h1 className="text-5xl md:text-6xl font-bold text-[#FFD700] mb-12 tracking-wide drop-shadow-[0_0_15px_gold] hover:scale-105 transition-transform duration-300">
        DOLCE CHOCOLATE
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl w-full">
        <DashboardButton src="/choco1.jpeg" label="مخزن الشكلاطه" href="/chocolate" />
        <DashboardButton src="/pack1.jpeg" label="مخزن الباكوات" href="/packs" />
        <DashboardButton src="/cafe1.jpeg" label="مخزن الكافي" href="/cafe" />
        <DashboardButton src="/ffd1.jpeg" label="البحث عن منتج" href="/search" />
        <DashboardButton src="/manage.jpeg" label="إدارة المستخدمين" href="/admin-dashboard/manage-users" />
        <DashboardButton src="/reports1.jpeg" label="التقارير" href="/reports" />
        <DashboardButton src="/add1.jpeg" label="إضافة منتج" href="/dashboard/add" />
        <DashboardButton src="/log1.jpeg" label="تسجيل الخروج" href="/unified-login" clearStorage />
      </div>
    </div>
  );
}

function DashboardButton({ src, label, href, clearStorage }) {
  const handleClick = () => {
    if (clearStorage) {
      localStorage.clear();
    }
  };

  return (
    <Link href={href}>
      <div
        onClick={handleClick}
        className="bg-[#4B342E] rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg transition-all hover:scale-110 hover:shadow-[0_0_25px_#FFD700] cursor-pointer duration-300"
      >
        <div className="relative w-24 h-24 mb-4">
          <Image src={src} alt={label} fill className="object-contain rounded-xl" />
        </div>
        <span className="text-[#FFD700] font-bold text-lg text-center leading-tight">
          {label}
        </span>
      </div>
    </Link>
  );
}
