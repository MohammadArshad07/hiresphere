"use client";

import Link from "next/link";

import { useEffect, useState } from "react";


export default function DashboardSidebar() {

  const [role, setRole] = useState("");


  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    setRole(user?.role || "");

  }, []);


  return (

    <aside className="w-[280px] min-h-screen bg-black/30 backdrop-blur-2xl border-r border-white/10 p-8 hidden lg:block">

      <Link href="/">

        <h1 className="text-3xl font-bold text-white mb-14 cursor-pointer">
          HireSphere
        </h1>

      </Link>


      <div className="space-y-4">

        {/* Job Seeker Sidebar */}

        {role === "jobseeker" && (
          <>

            <Link href="/dashboard/seeker">

              <div className="bg-white/5 hover:bg-white/10 transition border border-white/10 rounded-2xl px-5 py-4 cursor-pointer">
                Job Seeker Dashboard
              </div>

            </Link>


            <Link href="/jobs">

              <div className="bg-white/5 hover:bg-white/10 transition border border-white/10 rounded-2xl px-5 py-4 cursor-pointer">
                Explore Jobs
              </div>

            </Link>


            <Link href="/ats-checker">

              <div className="bg-white/5 hover:bg-white/10 transition border border-white/10 rounded-2xl px-5 py-4 cursor-pointer">
                ATS Checker
              </div>

            </Link>

          </>
        )}


        {/* Recruiter Sidebar */}

        {role === "recruiter" && (
          <>

            <Link href="/dashboard/recruiter">

              <div className="bg-white/5 hover:bg-white/10 transition border border-white/10 rounded-2xl px-5 py-4 cursor-pointer">
                Recruiter Dashboard
              </div>

            </Link>


            <Link href="/post-job">

              <div className="bg-white/5 hover:bg-white/10 transition border border-white/10 rounded-2xl px-5 py-4 cursor-pointer">
                Post Jobs
              </div>

            </Link>


            <Link href="/recruiter-profile">

              <div className="bg-white/5 hover:bg-white/10 transition border border-white/10 rounded-2xl px-5 py-4 cursor-pointer">
                Recruiter Profile
              </div>

            </Link>

          </>
        )}

      </div>

    </aside>
  );
}