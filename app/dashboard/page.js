"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#3e2723] text-[#3e2723] p-6 font-sans">
      <h1 className="text-center text-4xl font-extrabold text-[#f5e8dc] mb-8 tracking-widest">
        DOLCE
      </h1>

      <div className="grid grid-cols-3 gap-4 justify-items-center">
        <Link href="/chocolate">
          <a className="w-28 h-28 bg-[#f5e8dc] rounded-xl flex flex-col items-center justify-center shadow hover:brightness-95">
            <img src="/choco1.jpeg" alt="Chocolate" className="w-10 h-10 mb-1" />
            <span className="text-xs font-semibold text-center">Chocolate Store</span>
          </a>
        </Link>

        <Link href="/packs">
          <a className="w-28 h-28 bg-[#f5e8dc] rounded-xl flex flex-col items-center justify-center shadow hover:brightness-95">
            <img src="/pack1.jpeg" alt="Pack" className="w-10 h-10 mb-1" />
            <span className="text-xs font-semibold text-center">Pack Store</span>
          </a>
        </Link>

        <Link href="/search">
          <a className="w-28 h-28 bg-[#f5e8dc] rounded-xl flex flex-col items-center justify-center shadow hover:brightness-95">
            <img src="/ffd1.jpeg" alt="Search" className="w-10 h-10 mb-1" />
            <span className="text-xs font-semibold text-center">Product Search</span>
          </a>
        </Link>

        <Link href="/cafe">
          <a className="w-28 h-28 bg-[#f5e8dc] rounded-xl flex flex-col items-center justify-center shadow hover:brightness-95">
            <img src="/cofe1.jpeg" alt="Coffee" className="w-10 h-10 mb-1" />
            <span className="text-xs font-semibold text-center">Coffee Store</span>
          </a>
        </Link>

        <Link href="/admin-dashboard/manage-users">
          <a className="w-28 h-28 bg-[#f5e8dc] rounded-xl flex flex-col items-center justify-center shadow hover:brightness-95">
            <img src="/manage.jpeg" alt="Manage" className="w-10 h-10 mb-1" />
            <span className="text-xs font-semibold text-center">User Management</span>
          </a>
        </Link>

        <Link href="/reports">
          <a className="w-28 h-28 bg-[#f5e8dc] rounded-xl flex flex-col items-center justify-center shadow hover:brightness-95">
            <img src="/reports1.jpeg" alt="Reports" className="w-10 h-10 mb-1" />
            <span className="text-xs font-semibold text-center">Order Reports</span>
          </a>
        </Link>

        <button
          onClick={() => {
            localStorage.clear();
            router.push("/unified-login?loggedout=true");
          }}
          className="w-28 h-28 bg-[#f5e8dc] rounded-xl flex flex-col items-center justify-center shadow hover:brightness-95"
        >
          <img src="/log1.jpeg" alt="Logout" className="w-10 h-10 mb-1" />
          <span className="text-xs font-semibold text-center">Log Out</span>
        </button>
      </div>
    </main>
  );
}
