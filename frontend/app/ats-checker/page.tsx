"use client";

import AuthNavbar from "@/components/AuthNavbar";

import Link from "next/link";

import { motion } from "framer-motion";

import { useState } from "react";

import { toast } from "sonner";


export default function ATSCheckerPage() {

  const [loading, setLoading] =
    useState(false);

  const [atsScore, setAtsScore] =
    useState<number | null>(null);

  const [
    detectedSkills,
    setDetectedSkills,
  ] = useState<string[]>([]);

  const [feedback, setFeedback] =
    useState<string[]>([]);


  const analyzeResume = async (
    file: File
  ) => {

    try {

      setLoading(true);


      // PDF VALIDATION

      if (
        file.type !==
        "application/pdf"
      ) {

        toast.error(
          "Only PDF resumes allowed"
        );

        return;
      }


      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );


      const response = await fetch(
        "http://127.0.0.1:8000/auth/auth/analyze-resume",
        {

          method: "POST",

          body: formData,

        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        toast.error(
          data.detail ||
            "ATS analysis failed"
        );

        return;
      }


      setAtsScore(
        data.ats_score
      );


      setDetectedSkills(
        data.detected_skills || []
      );


      setFeedback(
        data.feedback || []
      );


      toast.success(
        "ATS analysis completed"
      );

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

    <main className="relative min-h-screen text-white overflow-hidden">

      {/* BACKGROUND VIDEO */}

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


      {/* OVERLAY */}

      <div className="fixed inset-0 bg-slate-950/80 -z-10"></div>



      <AuthNavbar />



      {/* HERO */}

      <section className="px-8 pt-24 pb-20">

        <div className="max-w-7xl mx-auto text-center">

          <motion.div
            initial={{
              opacity: 0,
              y: 80,
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

              AI Resume Analysis

            </p>


            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">

              Resume ATS

              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">

                {" "}
                Score Checker

              </span>

            </h1>


            <p className="text-slate-300 text-xl max-w-3xl mx-auto mt-8 leading-relaxed">

              Upload your resume and receive instant ATS analysis,
              keyword optimization, skill suggestions, and AI-powered
              improvements for better hiring success.

            </p>

          </motion.div>

        </div>

      </section>



      {/* ATS SECTION */}

      <section className="px-8 pb-24">

        <div className="max-w-5xl mx-auto">

          <motion.div
            initial={{
              opacity: 0,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-14 shadow-2xl"
          >

            {/* UPLOAD BOX */}

            <div className="border-2 border-dashed border-cyan-400/30 rounded-[30px] p-16 text-center bg-white/5">

              <div className="w-24 h-24 rounded-3xl bg-cyan-500/20 border border-cyan-400/20 mx-auto mb-8 flex items-center justify-center">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-12 h-12 text-cyan-300"
                >

                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />

                  <polyline points="17 8 12 3 7 8" />

                  <line x1="12" x2="12" y1="3" y2="15" />

                </svg>

              </div>


              <h2 className="text-4xl font-bold mb-5">

                Upload Your Resume

              </h2>


              <p className="text-slate-300 mb-10 text-lg">

                Analyze your resume using AI-powered ATS scoring.

              </p>


              <input
                type="file"
                accept=".pdf"
                className="hidden"
                id="resumeUpload"
                onChange={(e) => {

                  const file =
                    e.target.files?.[0];

                  if (file) {

                    analyzeResume(file);

                  }

                }}
              />


              <label
                htmlFor="resumeUpload"
                className="inline-block bg-cyan-500 hover:bg-cyan-600 transition px-10 py-4 rounded-2xl font-semibold text-lg cursor-pointer"
              >

                {loading
                  ? "Analyzing..."
                  : "Choose Resume"}

              </label>

            </div>



            {/* ATS RESULTS */}

            {atsScore !== null && (

              <div className="mt-14 grid md:grid-cols-2 gap-8">

                {/* ATS SCORE */}

                <div className="bg-white/5 border border-white/10 rounded-[30px] p-10">

                  <p className="text-slate-400 mb-4">

                    ATS Compatibility Score

                  </p>


                  <h3 className="text-7xl font-bold text-cyan-400">

                    {atsScore}%

                  </h3>


                  <div className="w-full bg-white/10 rounded-full h-4 mt-8 overflow-hidden">

                    <div
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full"
                      style={{
                        width: `${atsScore}%`,
                      }}
                    ></div>

                  </div>

                </div>



                {/* FEEDBACK */}

                <div className="bg-white/5 border border-white/10 rounded-[30px] p-10">

                  <h3 className="text-3xl font-bold mb-6">

                    AI Suggestions

                  </h3>


                  <ul className="space-y-5 text-slate-300">

                    {feedback.length > 0 ? (

                      feedback.map(
                        (
                          item,
                          index
                        ) => (

                          <li key={index}>

                            ✅ {item}

                          </li>

                        )
                      )

                    ) : (

                      <li>

                        ✅ Excellent resume structure

                      </li>

                    )}

                  </ul>

                </div>



                {/* DETECTED SKILLS */}

                <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-[30px] p-10">

                  <h3 className="text-3xl font-bold mb-8">

                    Detected Skills

                  </h3>


                  <div className="flex flex-wrap gap-4">

                    {detectedSkills.length > 0 ? (

                      detectedSkills.map(
                        (
                          skill,
                          index
                        ) => (

                          <div
                            key={index}
                            className="bg-cyan-500/20 border border-cyan-400/20 px-5 py-3 rounded-2xl text-cyan-300 font-semibold"
                          >

                            {skill}

                          </div>

                        )
                      )

                    ) : (

                      <p className="text-slate-400">

                        No skills detected

                      </p>

                    )}

                  </div>

                </div>

              </div>

            )}

          </motion.div>

        </div>

      </section>



      {/* FOOTER */}

      <footer className="backdrop-blur-2xl bg-black/20 border-t border-white/10">

        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

          <div>

            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">

              HireSphere

            </h2>


            <p className="text-slate-400 mt-2 text-sm">

              AI-powered recruitment platform.

            </p>

          </div>


          <div className="flex items-center gap-8 text-sm text-slate-400">

            <Link
              href="/privacy-policy"
              className="hover:text-cyan-400 transition"
            >

              Privacy Policy

            </Link>


            <Link
              href="/support"
              className="hover:text-cyan-400 transition"
            >

              Support

            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}