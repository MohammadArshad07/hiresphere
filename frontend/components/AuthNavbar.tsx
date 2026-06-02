"use client";

import Link from "next/link";

export default function AuthNavbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        <Link href="/">
          <h1 className="text-3xl font-bold text-white cursor-pointer">
            HireSphere
          </h1>
        </Link>

        <Link href="/">
          <button className="border border-white/20 px-6 py-3 rounded-2xl text-white hover:bg-white/10 transition cursor-pointer">
            Back Home
          </button>
        </Link>

      </div>

    </nav>
  );
}