"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#3e2723] text-[#3e2723] p-6 font-sans flex flex-col items-center justify-center">
      <h1 className="text-center text-4xl font-extrabold text-[#f5e8dc] mb-8 tracking-widest">
        DOLCE
      </h1>

      <div className="grid grid-cols-3 gap-6 justify-items-center">
        <Link href="/chocolate">
          <div className="w-24 h-24 bg-[#f5e8dc] rounded-xl flex flex-col items-center justify-center shadow hover:brightness-95">
            <img src="/choco1.jpeg" alt="Chocolate" className="w-8 h-8" />
          </div>
        </Link>

        <Link href="/packs">
          <div className="w-24 h-24 bg-[#f5e8dc] rounded-xl flex flex-col items-center justify-center shadow hover:brightness-95">
            <img src="/pack1.jpeg" alt="Pack" className="w-8 h-8" />
          </div>
        </Link>

        <Link href="/search">
          <div className="w-24 h-24 bg-[#f5e8dc] rounded-xl flex flex-col items-center justify-center shadow hover:brightness-95">
            <img src="/ffd1.jpeg" alt="Search" className="w-8 h-8" />
          </div>
        </Link>

        <Link href="/cafe">
          <div className="w-24 h-24 bg-[#f5e8dc] rounded-xl flex flex-col items-center justify-center shadow hover:brightness-95">
            <img src="/cofe1.jpeg" alt="Coffee" className="w-8 h-8" />
          </div>
        </Link>

        <Link href="/admin-dashboard/manage-users">
          <div className="w-24 h-24 bg-[#f5e8dc] rounded-xl flex flex-col items-center justify-center shadow hover:brightness-95">
            <img src="/manage.jpeg" alt="Manage" className="w-8 h-8" />
          </div>
        </Link>

        <Link href="/reports">
          <div className="w-24 h-24 bg-[#f5e8dc] rounded-xl flex flex-col items-center justify-center shadow hover:brightness-95">
            <img src="/reports1.jpeg" alt="Reports" className="w-8 h-8" />
          </div>
        </Link>

        <Link href="/add">
          <div className="w-24 h-24 bg-[#f5e8dc] rounded-xl flex flex-col items-center justify-center shadow hover:brightness-95">
            <img src="/add1.jpeg" alt="Add Product" className="w-8 h-8" />
          </div>
        </Link>

        <button
          onClick={() => {
            localStorage.clear();
            router.push("/unified-login?loggedout=true");
          }}
          className="w-24 h-24 bg-[#f5e8dc] rounded-xl flex flex-col items-center justify-center shadow hover:brightness-95"
        >
          <img src="/log1.jpeg" alt="Logout" className="w-8 h-8" />
        </button>
      </div>
    </main>
  );
}
