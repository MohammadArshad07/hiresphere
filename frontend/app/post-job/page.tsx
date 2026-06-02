"use client";

import { useState } from "react";

import DashboardNavbar from "@/components/DashboardNavbar";

import Link from "next/link";

import { motion } from "framer-motion";

import { toast } from "sonner";

import ProtectedRoute from "@/components/ProtectedRoute";


export default function PostJobPage() {

  const [title, setTitle] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [salary, setSalary] =
    useState("");

  const [requirements, setRequirements] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleCreateJob = async () => {

    // VALIDATION

    if (
      !title ||
      !company ||
      !location ||
      !salary ||
      !requirements ||
      !description
    ) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }


    try {

      setLoading(true);


      const token =
        localStorage.getItem("token");


      const response = await fetch(
        "http://127.0.0.1:8000/jobs/create",
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,

          },

          body: JSON.stringify({

            title,
            company,
            location,
            salary,
            description,
            requirements,

          }),

        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        toast.error(
          data.detail ||
            "Failed to create job"
        );

        return;
      }


      toast.success(
        "Job published successfully!"
      );


      // RESET FORM

      setTitle("");

      setCompany("");

      setLocation("");

      setSalary("");

      setRequirements("");

      setDescription("");

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <ProtectedRoute allowedRole="recruiter">

      <main className="relative min-h-screen text-white overflow-hidden">

        <DashboardNavbar />



        {/* BACKGROUND */}

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



        {/* NAVBAR */}

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



        {/* HERO */}

        <section className="px-8 pt-20 pb-10">

          <div className="max-w-5xl mx-auto">

            <motion.div
              initial={{
                opacity: 0,
                y: 70,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >

              <p className="text-cyan-400 uppercase tracking-[0.2em] font-semibold mb-5">

                Recruiter Portal

              </p>


              <h1 className="text-6xl font-bold leading-tight">

                Post a New

                <br />


                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">

                  Job Opening

                </span>

              </h1>


              <p className="text-slate-300 text-xl mt-8 leading-relaxed">

                Create intelligent job listings and attract high-quality candidates with HireSphere recruitment tools.

              </p>

            </motion.div>

          </div>

        </section>



        {/* FORM SECTION */}

        <section className="px-8 pb-24">

          <div className="max-w-5xl mx-auto">

            <motion.div
              initial={{
                opacity: 0,
                y: 70,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-12 shadow-2xl"
            >

              <div className="grid md:grid-cols-2 gap-8">

                {/* JOB TITLE */}

                <div>

                  <label className="block text-slate-300 mb-3">

                    Job Title

                  </label>


                  <input
                    type="text"
                    placeholder="Frontend Developer"
                    value={title}
                    onChange={(e) =>
                      setTitle(
                        e.target.value
                      )
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                  />

                </div>



                {/* COMPANY */}

                <div>

                  <label className="block text-slate-300 mb-3">

                    Company Name

                  </label>


                  <input
                    type="text"
                    placeholder="Google"
                    value={company}
                    onChange={(e) =>
                      setCompany(
                        e.target.value
                      )
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                  />

                </div>



                {/* LOCATION */}

                <div>

                  <label className="block text-slate-300 mb-3">

                    Location

                  </label>


                  <input
                    type="text"
                    placeholder="Bangalore, India"
                    value={location}
                    onChange={(e) =>
                      setLocation(
                        e.target.value
                      )
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                  />

                </div>



                {/* SALARY */}

                <div>

                  <label className="block text-slate-300 mb-3">

                    Salary Range

                  </label>


                  <input
                    type="text"
                    placeholder="₹12L - ₹18L"
                    value={salary}
                    onChange={(e) =>
                      setSalary(
                        e.target.value
                      )
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                  />

                </div>

              </div>



              {/* SKILLS */}

              <div className="mt-10">

                <label className="block text-slate-300 mb-3">

                  Required Skills

                </label>


                <input
                  type="text"
                  placeholder="React, Next.js, TypeScript, Tailwind CSS"
                  value={requirements}
                  onChange={(e) =>
                    setRequirements(
                      e.target.value
                    )
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />

              </div>



              {/* DESCRIPTION */}

              <div className="mt-10">

                <div className="flex items-center justify-between mb-4">

                  <label className="text-slate-300">

                    Job Description

                  </label>


                  <button
                    type="button"
                    disabled
                    className="bg-white/10 text-slate-400 px-5 py-2 rounded-xl font-semibold cursor-not-allowed"
                  >

                    Coming Soon

                  </button>

                </div>


                <textarea
                  rows={8}
                  placeholder="Describe the job role, responsibilities, qualifications, and expectations..."
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 resize-none"
                />

              </div>



              {/* BUTTONS */}

              <div className="flex items-center gap-5 mt-12">

                <button
                  onClick={handleCreateJob}
                  disabled={loading}
                  className="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-2xl font-semibold cursor-pointer disabled:opacity-50"
                >

                  {loading
                    ? "Publishing..."
                    : "Publish Job"}

                </button>


                <button
                  disabled
                  className="bg-white/10 text-slate-400 px-8 py-4 rounded-2xl border border-white/10 cursor-not-allowed"
                >

                  Save Draft

                </button>

              </div>

            </motion.div>

          </div>

        </section>

      </main>

    </ProtectedRoute>

  );
}