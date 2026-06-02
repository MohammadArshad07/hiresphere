"use client";
import DashboardNavbar from "@/components/DashboardNavbar";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RecruiterProfilePage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">
         <DashboardNavbar />
      {/* Background */}

      <div className="fixed inset-0 -z-20 overflow-hidden">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8"
            type="application/x-mpegURL"
          />
        </video>

      </div>

      <div className="fixed inset-0 bg-slate-950/85 -z-10"></div>



      {/* Navbar */}

      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

          <Link href="/">
            <h1 className="text-3xl font-bold cursor-pointer">
              HireSphere
            </h1>
          </Link>

          <Link href="/dashboard/recruiter">

            <button className="bg-white/10 hover:bg-white/20 transition px-6 py-3 rounded-2xl border border-white/10 cursor-pointer">
              Back Dashboard
            </button>

          </Link>

        </div>

      </nav>



      {/* Hero */}

      <section className="px-8 pt-20 pb-10">

        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            <p className="text-cyan-400 uppercase tracking-[0.2em] font-semibold mb-5">
              Recruiter Profile
            </p>

            <h1 className="text-6xl font-bold leading-tight">

              Company
              <br />

              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Hiring Profile
              </span>

            </h1>

            <p className="text-slate-300 text-xl mt-8 max-w-3xl leading-relaxed">

              Manage your recruiter identity, company branding,
              hiring information, and recruitment preferences.

            </p>

          </motion.div>

        </div>

      </section>



      {/* Profile Section */}

      <section className="px-8 pb-24">

        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-12 shadow-2xl"
          >

            {/* Top */}

            <div className="flex flex-col md:flex-row items-center gap-10 mb-14">

              {/* Logo */}

              <div className="w-36 h-36 rounded-[35px] bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-5xl font-bold shadow-2xl">
                G
              </div>

              <div className="flex-1">

                <h2 className="text-5xl font-bold">
                  Google
                </h2>

                <p className="text-slate-300 text-lg mt-4 leading-relaxed">

                  Building innovative technology products and
                  empowering people globally through AI,
                  cloud computing, and modern digital experiences.

                </p>

              </div>

            </div>



            {/* Form */}

            <div className="grid md:grid-cols-2 gap-8">

              {/* Recruiter Name */}

              <div>

                <label className="block text-slate-300 mb-3">
                  Recruiter Name
                </label>

                <input
                  type="text"
                  placeholder="Mohammad Arshad"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />

              </div>



              {/* Company Name */}

              <div>

                <label className="block text-slate-300 mb-3">
                  Company Name
                </label>

                <input
                  type="text"
                  placeholder="Google"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />

              </div>



              {/* Email */}

              <div>

                <label className="block text-slate-300 mb-3">
                  Work Email
                </label>

                <input
                  type="email"
                  placeholder="recruiter@google.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />

              </div>



              {/* Website */}

              <div>

                <label className="block text-slate-300 mb-3">
                  Company Website
                </label>

                <input
                  type="text"
                  placeholder="https://google.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />

              </div>



              {/* Industry */}

              <div>

                <label className="block text-slate-300 mb-3">
                  Industry
                </label>

                <input
                  type="text"
                  placeholder="Technology"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />

              </div>



              {/* Company Size */}

              <div>

                <label className="block text-slate-300 mb-3">
                  Company Size
                </label>

                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400">

                  <option>1 - 10 Employees</option>
                  <option>10 - 50 Employees</option>
                  <option>50 - 200 Employees</option>
                  <option>200+ Employees</option>

                </select>

              </div>

            </div>



            {/* Hiring Preferences */}

            <div className="mt-10">

              <label className="block text-slate-300 mb-3">
                Hiring Preferences
              </label>

              <textarea
                rows={6}
                placeholder="Describe your ideal candidates, preferred skills, hiring goals, and recruitment expectations..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 resize-none"
              />

            </div>



            {/* Upload Logo */}

            <div className="mt-10">

              <label className="block text-slate-300 mb-4">
                Upload Company Logo
              </label>

              <div className="border-2 border-dashed border-cyan-400/30 rounded-[30px] p-10 text-center bg-white/5">

                <p className="text-slate-300 text-lg mb-6">
                  Drag & drop company logo here
                </p>

                <input
                  type="file"
                  className="hidden"
                  id="companyLogo"
                />

                <label
                  htmlFor="companyLogo"
                  className="inline-block bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-2xl font-semibold cursor-pointer"
                >
                  Upload Logo
                </label>

              </div>

            </div>



            {/* Buttons */}

            <div className="flex items-center gap-5 mt-12">

              <button className="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-2xl font-semibold cursor-pointer">
                Save Profile
              </button>

              <button className="bg-white/10 hover:bg-white/20 transition px-8 py-4 rounded-2xl border border-white/10 cursor-pointer">
                Preview Company
              </button>

            </div>

          </motion.div>

        </div>

      </section>

    </main>
  );
}