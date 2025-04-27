'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3B2A1A] to-[#5A3F28] flex flex-col items-center p-6">
      <h1 className="text-5xl md:text-6xl font-bold text-[#FFD700] mb-12 drop-shadow-lg tracking-wide animate-pulse">
        DOLCE CHOCOLATE
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl w-full">
        <Button src="/choco1.jpeg" label="مخزن الشكلاطه" href="/chocolate" />
        <Button src="/pack1.jpeg" label="مخزن الباكوات" href="/packs" />
        <Button src="/cafe1.jpeg" label="مخزن الكافي" href="/cafe" />
        <Button src="/ffd1.jpeg" label="البحث عن منتج" href="/search" />
        <Button src="/manage.jpeg" label="إدارة المستخدمين" href="/admin-dashboard/manage-users" />
        <Button src="/reports1.jpeg" label="التقارير" href="/reports" />
        <Button src="/add1.jpeg" label="إضافة منتج" href="/dashboard/add" />
        <Button src="/log1.jpeg" label="تسجيل الخروج" href="/unified-login" clearStorage />
      </div>
    </div>
  );
}

function Button({ src, label, href, clearStorage }) {
  const handleClick = () => {
    if (clearStorage) {
      localStorage.clear();
    }
  };

  return (
    <Link href={href} passHref>
      <div
        onClick={handleClick}
        className="bg-[#3B2A1A] rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_20px_#FFD700] cursor-pointer"
      >
        <div className="w-24 h-24 relative mb-3">
          <Image src={src} alt={label} width={80} height={80} className="object-contain" />
        </div>
        <span className="text-[#FFD700] font-bold text-center leading-tight">
          {label}
        </span>
      </div>
    </Link>
  );
}
