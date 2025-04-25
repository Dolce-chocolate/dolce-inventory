"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#5c4033] text-[#f5e8dc] p-4 font-sans flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-4 mt-6">STORAGE</h1>

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-sm bg-[#f5e8dc] text-[#3e2c23] rounded-full px-4 py-2 mb-6">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none w-full placeholder:text-[#3e2c23]"
        />
      </div>

      {/* Main Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Link href="/chocolate">
          <a className="bg-[#f5e8dc] text-[#3e2c23] w-36 h-36 flex flex-col justify-center items-center rounded-xl shadow hover:brightness-90">
            <Image src="/icons/chocolate-bar.svg" width={40} height={40} alt="Chocolate" />
            <span className="mt-2 font-semibold">Chocolate Store</span>
          </a>
        </Link>

        <Link href="/packs">
          <a className="bg-[#f5e8dc] text-[#3e2c23] w-36 h-36 flex flex-col justify-center items-center rounded-xl shadow hover:brightness-90">
            <Image src="/icons/box.svg" width={40} height={40} alt="Pack" />
            <span className="mt-2 font-semibold">Pack Store</span>
          </a>
        </Link>

        <Link href="/admin-dashboard/manage-users">
          <a className="bg-[#f5e8dc] text-[#3e2c23] w-36 h-36 flex flex-col justify-center items-center rounded-xl shadow hover:brightness-90">
            <Image src="/icons/users.svg" width={40} height={40} alt="Users" />
            <span className="mt-2 font-semibold">User Management</span>
          </a>
        </Link>

        <Link href="/cafe">
          <a className="bg-[#f5e8dc] text-[#3e2c23] w-36 h-36 flex flex-col justify-center items-center rounded-xl shadow hover:brightness-90">
            <Image src="/icons/coffee.svg" width={40} height={40} alt="Coffee" />
            <span className="mt-2 font-semibold">Coffee Store</span>
          </a>
        </Link>
      </div>

      {/* Bottom Buttons */}
      <div className="flex gap-4">
        <Link href="/admin-dashboard/manage-users">
          <a className="bg-[#3e2c23] text-[#f5e8dc] w-24 h-16 flex flex-col justify-center items-center rounded-md hover:brightness-125">
            <Image src="/icons/users.svg" width={20} height={20} alt="Users Small" />
            <span className="text-sm mt-1">User Management</span>
          </a>
        </Link>

        <Link href="/reports">
          <a className="bg-[#3e2c23] text-[#f5e8dc] w-24 h-16 flex flex-col justify-center items-center rounded-md hover:brightness-125">
            <Image src="/icons/chart.svg" width={20} height={20} alt="Reports" />
            <span className="text-sm mt-1">Reports</span>
          </a>
        </Link>

        <button
          onClick={() => {
            localStorage.clear();
            router.push("/unified-login?loggedout=true");
          }}
          className="bg-[#3e2c23] text-[#f5e8dc] w-24 h-16 flex flex-col justify-center items-center rounded-md hover:brightness-125"
        >
          <Image src="/icons/logout.svg" width={20} height={20} alt="Logout" />
          <span className="text-sm mt-1">Log Out</span>
        </button>
      </div>
    </main>
  );
}
