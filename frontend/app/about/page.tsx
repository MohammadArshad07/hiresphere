"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* Background Video */}

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


      {/* Overlay */}

      <div className="fixed inset-0 bg-slate-950/80 -z-10"></div>



      {/* Navbar */}

      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

          <Link href="/">
            <h1 className="text-3xl font-bold tracking-tight text-white cursor-pointer">
              HireSphere
            </h1>
          </Link>

          <div className="flex items-center gap-8 text-slate-300">

            <Link href="/" className="hover:text-white transition">
              Home
            </Link>

            <Link href="/jobs" className="hover:text-white transition">
              Jobs
            </Link>

            <Link href="/about" className="text-cyan-400 font-semibold">
              About
            </Link>

          </div>

        </div>

      </nav>



      {/* Hero */}

      <section className="px-8 pt-28 pb-24">

        <div className="max-w-7xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <p className="text-cyan-400 font-semibold mb-6 tracking-[0.2em] uppercase">
              About HireSphere
            </p>

            <h1 className="text-6xl lg:text-7xl font-bold leading-tight max-w-5xl mx-auto">

              Revolutionizing
              <br />

              Hiring with
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {" "}AI Technology
              </span>

            </h1>

            <p className="mt-10 text-slate-300 text-xl leading-relaxed max-w-3xl mx-auto">

              HireSphere is a modern AI-powered recruitment platform
              designed to simplify hiring for recruiters and help
              job seekers discover meaningful opportunities faster.

            </p>

          </motion.div>

        </div>

      </section>



      {/* Mission Cards */}

      <section className="px-8 pb-28">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          {/* Card 1 */}

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-10"
          >

            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/20 mb-8 flex items-center justify-center">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-cyan-300"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5Z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>

            </div>

            <h2 className="text-3xl font-bold mb-5">
              Our Mission
            </h2>

            <p className="text-slate-300 leading-relaxed">
              We aim to bridge the gap between talented professionals
              and innovative companies using intelligent recruitment tools.
            </p>

          </motion.div>



          {/* Card 2 */}

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-10"
          >

            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/20 mb-8 flex items-center justify-center">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-cyan-300"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
              </svg>

            </div>

            <h2 className="text-3xl font-bold mb-5">
              Our Vision
            </h2>

            <p className="text-slate-300 leading-relaxed">
              To become a globally trusted recruitment ecosystem
              where AI enhances hiring efficiency and transparency.
            </p>

          </motion.div>



          {/* Card 3 */}

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-10"
          >

            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/20 mb-8 flex items-center justify-center">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-cyan-300"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>

            </div>

            <h2 className="text-3xl font-bold mb-5">
              Our Community
            </h2>

            <p className="text-slate-300 leading-relaxed">
              HireSphere supports both recruiters and job seekers
              by creating a seamless, modern, and transparent hiring process.
            </p>

          </motion.div>

        </div>

      </section>



      {/* Footer */}

      <footer className="backdrop-blur-2xl bg-black/20 border-t border-white/10">

        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

          <div>

            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              HireSphere
            </h2>

            <p className="text-slate-400 mt-2 text-sm">
              AI-powered recruitment platform for modern hiring.
            </p>

          </div>

          <div className="flex items-center gap-8 text-sm text-slate-400">

            <Link href="/privacy-policy" className="hover:text-cyan-400 transition">
              Privacy Policy
            </Link>

            <Link href="/support" className="hover:text-cyan-400 transition">
              Support
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}