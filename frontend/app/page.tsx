"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <main className="relative text-white overflow-hidden">

      {/* ================= VIDEO BACKGROUND ================= */}

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

      {/* ================= DARK OVERLAY ================= */}

      <div className="fixed inset-0 bg-slate-950/75 -z-10"></div>

      <Navbar />

      {/* ================= HERO ================= */}

      <section className="relative px-8 pt-28 pb-20">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500 rounded-full blur-3xl opacity-20"></div>

        <div className="relative max-w-7xl mx-auto">

          {/* HERO GRID */}

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/10 text-cyan-300 px-5 py-2 rounded-full text-sm font-semibold mb-8">
                AI Powered Recruitment Platform
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">

                Hire Smarter
                <br />

                with{" "}

                <span className="bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                  AI-Powered
                </span>

                <br />

                Recruitment

              </h1>

              <p className="mt-8 text-lg text-slate-300 leading-relaxed max-w-xl">
                Streamline hiring with AI resume analysis,
                ATS scoring, intelligent candidate matching,
                and modern recruitment workflows built for scaling teams.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">

                <Link href="/signup">

                  <button className="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-2xl font-semibold">
                    Get Started
                  </button>

                </Link>

                <Link href="/jobs">
                  <button className="bg-white/10 backdrop-blur-xl border border-white/10 hover:border-cyan-400 hover:bg-white/20 transition px-8 py-4 rounded-2xl font-semibold text-white">
                    Explore Jobs
                  </button>
                </Link>

              </div>

            </div>

            {/* RIGHT */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >

              <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-20 rounded-full"></div>

              <div className="relative bg-white/10 backdrop-blur-2xl rounded-[36px] p-8 shadow-2xl border border-white/10">

                <div className="flex items-center justify-between mb-8">

                  <h3 className="text-2xl font-bold text-white">
                    Hiring Analytics
                  </h3>

                  <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-semibold">
                    Live
                  </div>

                </div>

                <div className="space-y-5">

                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 flex items-center justify-between">

                    <div>

                      <p className="text-slate-300 text-sm">
                        Applications
                      </p>

                      <h2 className="text-4xl font-bold mt-2">
                        12,480
                      </h2>

                    </div>

                    <div className="text-green-400 font-bold text-xl">
                      +18%
                    </div>

                  </div>

                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 flex items-center justify-between">

                    <div>

                      <p className="text-slate-300 text-sm">
                        AI Match Score
                      </p>

                      <h2 className="text-4xl font-bold mt-2">
                        94%
                      </h2>

                    </div>

                    <div className="text-cyan-300 font-bold">
                      Excellent
                    </div>

                  </div>

                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[30px] p-8 text-white">

                    <p className="text-cyan-100">
                      Monthly Hiring Growth
                    </p>

                    <h2 className="text-6xl font-bold mt-4">
                      +32%
                    </h2>

                    <p className="mt-4 text-cyan-100">
                      Compared to last month
                    </p>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

          {/* TRUSTED COMPANIES */}

          <div className="mt-24 overflow-hidden">

            <p className="text-center text-slate-400 text-sm tracking-[0.2em] uppercase mb-10">
              Trusted by innovative companies worldwide
            </p>

            <div className="relative">

              <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>

              <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>

              <div className="flex gap-8 whitespace-nowrap animate-marquee w-max">

                {[
                  "Google",
                  "Spotify",
                  "Airbnb",
                  "HubSpot",
                  "Microsoft",
                  "AWS",
                  "NVIDIA",
                  "MongoDB",
                  "Cloudflare",
                  "Notion",

                  "Google",
                  "Spotify",
                  "Airbnb",
                  "HubSpot",
                  "Microsoft",
                  "AWS",
                  "NVIDIA",
                  "MongoDB",
                  "Cloudflare",
                  "Notion",
                ].map((company, index) => (

                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 backdrop-blur-xl px-8 py-5 rounded-2xl min-w-fit"
                  >

                    <span className="text-slate-200 font-semibold text-lg">
                      {company}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

                <section
            id="features"
            className="px-8 py-28"
          >

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <div className="inline-flex bg-white/10 backdrop-blur-xl border border-white/10 text-cyan-300 px-5 py-2 rounded-full text-sm font-semibold mb-6">
              AI Tools
            </div>

            <h2 className="text-5xl font-bold tracking-tight">
              Resume ATS Score Checker
            </h2>

            <p className="mt-6 text-slate-300 text-lg">
              Analyze resumes instantly with AI-powered ATS scoring.
            </p>

          </div>

          <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 120 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
              }}
              className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[30px] p-10 hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              {/* LOGO */}

              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/20 mb-7 flex items-center justify-center">

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
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M9 15h6" />
                  <path d="M9 11h6" />
                  <path d="M9 19h4" />
                </svg>

              </div>

              <h3 className="text-3xl font-bold mb-4">
                Resume ATS Score Checker
              </h3>

              <p className="text-slate-300 leading-relaxed text-lg">
                Upload your resume and get an AI-generated ATS score,
                skills analysis, and improvement suggestions instantly.
              </p>

              <Link href="/ats-checker">

                <button className="bg-white/10 hover:bg-white/20 transition border border-white/10 px-8 py-4 rounded-2xl font-semibold">

                  Try ATS Checker

                </button>

              </Link>

            </motion.div>

          </div>

        </div>

      </section>

      {/* ================= JOBS ================= */}

      <section className="px-8 py-28">

        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between mb-16">

            <div>

              <div className="inline-flex bg-white/10 backdrop-blur-xl border border-white/10 text-cyan-300 px-5 py-2 rounded-full text-sm font-semibold mb-5">
                Find Your Dream Job
              </div>

              <h2 className="text-5xl font-bold tracking-tight">
                Explore top opportunities
              </h2>

            </div>

            <Link href="/jobs">
              <button className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-6 py-3 rounded-2xl font-semibold">
                View All Jobs
              </button>
            </Link>

          </div>

          {/* SCROLLING JOBS */}

          <div className="relative overflow-hidden">

            <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>

            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>

            <div className="flex gap-8 whitespace-nowrap animate-marquee w-max pb-4">

              {[
                "Frontend Developer",
                "AI Engineer",
                "Backend Developer",
                "UI/UX Designer",
                "DevOps Engineer",
                "Data Scientist",
                "Cloud Engineer",
                "Cybersecurity Analyst",
                "Full Stack Developer",
                "Product Manager",

                "Frontend Developer",
                "AI Engineer",
                "Backend Developer",
                "UI/UX Designer",
                "DevOps Engineer",
                "Data Scientist",
                "Cloud Engineer",
                "Cybersecurity Analyst",
                "Full Stack Developer",
                "Product Manager",
              ].map((job, index) => (

                <motion.div
                  key={index}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[30px] p-8 min-w-[340px] shadow-xl"
                >

                  {/* JOB LOGO */}

                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/20 mb-7 flex items-center justify-center">

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

                  <h3 className="text-2xl font-bold mb-3 whitespace-normal">
                    {job}
                  </h3>

                  <p className="text-slate-300 mb-8 whitespace-normal">
                    Remote • Full Time
                  </p>

                  <div className="flex items-center justify-between">

                    <span className="font-semibold">
                      $90k - $140k
                    </span>

                    <Link href={`/jobs/${job.toLowerCase().replace(/\s+/g, "-")}`}>

                      <button className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-5 py-2 rounded-xl font-semibold">
                        Apply
                      </button>

                    </Link>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer
              id="about" className="backdrop-blur-2xl bg-black/20 border-t border-white/10">

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

            <a
              href="#"
              className="hover:text-cyan-400 transition duration-300"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="hover:text-cyan-400 transition duration-300"
            >
              Terms
            </a>

            <a
              href="#"
              className="hover:text-cyan-400 transition duration-300"
            >
              Support
            </a>

          </div>

        </div>

      </footer>

    </main>
  );
}