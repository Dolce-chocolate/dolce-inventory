'use client';

import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f5e8dc] flex flex-col items-center p-6">
      <h1 className="text-5xl md:text-6xl font-bold text-[#FFD700] mb-12 drop-shadow-lg tracking-wide">
        DOLCE CHOCOLATE
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl w-full">
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
        className="bg-[#3B2A1A] p-6 rounded-3xl flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105 hover:shadow-[0_0_20px_#FFD700] cursor-pointer"
      >
        <img
          src={src}
          alt="Button"
          className="w-24 h-24 object-contain mb-2"
        />
      </div>
    </Link>
  );
}
