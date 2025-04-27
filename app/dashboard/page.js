'use client';

import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f5e8dc] flex flex-col items-center p-8">
      <h1 className="text-5xl font-bold text-[#FFD700] mb-12 tracking-wide">
        DOLCE CHOCOLATE
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <Button src="/choco1.jpeg" href="/chocolate" />
        <Button src="/pack1.jpeg" href="/packs" />
        <Button src="/cafe1.jpeg" href="/cafe" />
        <Button src="/ffd1.jpeg" href="/search" />
        <Button src="/manage.jpeg" href="/admin-dashboard/manage-users" />
        <Button src="/reports1.jpeg" href="/reports" />
        <Button src="/add1.jpeg" href="/dashboard/add" />
        <Button src="/log1.jpeg" href="/unified-login" clearStorage />
      </div>
    </div>
  );
}

function Button({ src, href, clearStorage }) {
  const handleClick = () => {
    if (clearStorage) {
      localStorage.clear();
    }
  };

  return (
    <Link href={href}>
      <div
        onClick={handleClick}
        className="bg-[#3B2A1A] p-4 rounded-2xl flex flex-col items-center justify-center shadow-md hover:shadow-[0_0_15px_#FFD700] transition-all cursor-pointer w-[120px] h-[120px]"
      >
        <img
          src={src}
          alt="button"
          className="object-contain w-[70px] h-[70px]"
        />
      </div>
    </Link>
  );
}
