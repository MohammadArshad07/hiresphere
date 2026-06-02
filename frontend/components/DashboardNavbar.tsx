"use client";

import Link from "next/link";

export default function DashboardNavbar() {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-black/20 border-b border-white/10">

      <div className="flex items-center justify-between px-8 py-5">

        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <div className="flex items-center gap-4">

          

          <Link href="/">

            <button className="bg-cyan-500 hover:bg-cyan-600 transition px-5 py-3 rounded-2xl text-white cursor-pointer">
              Logout
            </button>

          </Link>

        </div>

      </div>

    </nav>
  );
}