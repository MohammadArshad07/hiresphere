"use client";
import AuthNavbar from "@/components/AuthNavbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
export default function ApplyJobPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">

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



      <AuthNavbar />



      {/* Hero */}

      <section className="px-8 pt-20 pb-10">

        <div className="max-w-5xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            <p className="text-cyan-400 uppercase tracking-[0.2em] font-semibold mb-5">
              Job Application
            </p>

            <h1 className="text-6xl font-bold leading-tight">

              Apply for Your
              <br />

              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Dream Job
              </span>

            </h1>

            <p className="text-slate-300 text-xl mt-8 leading-relaxed">

              Submit your application, upload your resume,
              and let AI optimize your chances of getting hired.

            </p>

          </motion.div>

        </div>

      </section>



      {/* Application Form */}

      <section className="px-8 pb-24">

        <div className="max-w-5xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-12 shadow-2xl"
          >

            <div className="grid md:grid-cols-2 gap-8">

              {/* Full Name */}

              <div>

                <label className="block text-slate-300 mb-3">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Mohammad Arshad"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />

              </div>



              {/* Email */}

              <div>

                <label className="block text-slate-300 mb-3">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="arshad@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />

              </div>



              {/* Phone */}

              <div>

                <label className="block text-slate-300 mb-3">
                  Phone Number
                </label>

                <input
                  type="text"
                  placeholder="+91 9876543210"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />

              </div>



              {/* Portfolio */}

              <div>

                <label className="block text-slate-300 mb-3">
                  Portfolio / Website
                </label>

                <input
                  type="text"
                  placeholder="https://portfolio.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />

              </div>

            </div>



            {/* LinkedIn */}

            <div className="mt-10">

              <label className="block text-slate-300 mb-3">
                LinkedIn Profile
              </label>

              <input
                type="text"
                placeholder="https://linkedin.com/in/username"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
              />

            </div>



            {/* Skills */}

            <div className="mt-10">

              <label className="block text-slate-300 mb-3">
                Skills
              </label>

              <input
                type="text"
                placeholder="React, Next.js, Python, FastAPI..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
              />

            </div>



            {/* Cover Letter */}

            <div className="mt-10">

              <label className="block text-slate-300 mb-3">
                Cover Letter
              </label>

              <textarea
                rows={7}
                placeholder="Tell the recruiter why you're a great fit..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 resize-none"
              />

            </div>



            {/* Resume Upload */}

            <div className="mt-10">

              <label className="block text-slate-300 mb-4">
                Upload Resume
              </label>

              <div className="border-2 border-dashed border-cyan-400/30 rounded-[30px] p-10 text-center bg-white/5">

                <p className="text-slate-300 text-lg mb-6">
                  Drag & drop your resume here
                </p>

                <input
                  type="file"
                  className="hidden"
                  id="resumeUpload"
                />

                <label
                  htmlFor="resumeUpload"
                  className="inline-block bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-2xl font-semibold cursor-pointer"
                >
                  Upload Resume
                </label>

              </div>

            </div>



            {/* Buttons */}

            <div className="flex items-center gap-5 mt-12">

              <button className="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-2xl font-semibold cursor-pointer">
                Submit Application
              </button>
                <button
                        onClick={() =>
                            toast.success("Application submitted successfully!")
                        }
                        className="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-2xl font-semibold cursor-pointer"
                        >
                        Submit Application
                </button>

              <button className="bg-white/10 hover:bg-white/20 transition px-8 py-4 rounded-2xl border border-white/10 cursor-pointer">
                Save Draft
              </button>

            </div>

          </motion.div>

        </div>

      </section>

    </main>
  );
}