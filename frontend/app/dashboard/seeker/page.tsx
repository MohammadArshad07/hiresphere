"use client";

import { motion } from "framer-motion";

import Link from "next/link";

import { useEffect, useRef, useState } from "react";

import { useSession } from "next-auth/react";

import ProtectedRoute from "@/components/ProtectedRoute";

import { toast } from "sonner";
import { apiUrl } from "@/lib/api";


export default function SeekerDashboardPage() {

  const { data: session } = useSession();

  const [userName, setUserName] =
    useState("User");

  const [applicationsCount, setApplicationsCount] =
    useState(0);

  const [recentApplications, setRecentApplications] =
    useState<any[]>([]);

  const [uploadingResume, setUploadingResume] =
    useState(false);

  const [resumeUploaded, setResumeUploaded] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement | null>(
      null
    );


  useEffect(() => {

    // GOOGLE USER

    if (session?.user?.name) {

      setUserName(session.user.name);

    }


    // NORMAL LOGIN USER

    const localUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );


    if (localUser?.name) {

      setUserName(localUser.name);

    }


    // EMAIL FALLBACK

    else if (localUser?.email) {

      const extractedName =
        localUser.email
          .split("@")[0]
          .replace(/[0-9]/g, "")
          .replace(".", " ");

      setUserName(extractedName);

    }


    // CHECK EXISTING RESUME

    if (localUser?.resume_url) {

      setResumeUploaded(true);

    }


    // FETCH DASHBOARD

    const fetchDashboard = async () => {

      try {

        const token =
          localStorage.getItem("token");

        if (!token) return;


        const response = await fetch(
          apiUrl("/dashboard/seeker"),
          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }
        );


        const data =
          await response.json();


        setApplicationsCount(
          data.applications_count || 0
        );


        setRecentApplications(
          data.recent_applications || []
        );

      } catch (error) {

        console.log(error);

      }

    };


    fetchDashboard();

  }, [session]);


  const handleResumeUpload =
    async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {

      try {

        const file =
          event.target.files?.[0];

        if (!file) return;


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


        setUploadingResume(true);


        const token =
          localStorage.getItem("token");


        if (!token) {

          toast.error(
            "Please login first"
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
          apiUrl("/auth/upload-resume"),
          {

            method: "POST",

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

            body: formData,

          }
        );


        const data =
          await response.json();


        if (!response.ok) {

          toast.error(
            data.detail ||
              "Resume upload failed"
          );

          return;
        }


        // UPDATE LOCAL USER

        const localUser = JSON.parse(
          localStorage.getItem("user") ||
            "{}"
        );


        localUser.resume_url =
          data.resume_url;


        localStorage.setItem(
          "user",
          JSON.stringify(localUser)
        );


        setResumeUploaded(true);

        toast.success(
          "Resume uploaded successfully"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Something went wrong"
        );

      } finally {

        setUploadingResume(false);

      }

    };


  return (

    <ProtectedRoute allowedRole="jobseeker">

      <main className="relative min-h-screen text-white overflow-hidden">

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



        {/* PAGE CONTENT */}

        <div className="p-8 lg:p-12">

          {/* HEADER */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-14"
          >

            <div>

              <p className="text-cyan-400 uppercase tracking-[0.2em] text-sm font-semibold mb-4">

                Job Seeker Dashboard

              </p>


              <h1 className="text-5xl font-bold leading-tight">

                Welcome back,

                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">

                  {" "}
                  {userName}

                </span>

              </h1>


              <p className="text-slate-300 text-lg mt-5 max-w-2xl">

                Start exploring opportunities and build your professional journey with HireSphere AI.

              </p>

            </div>



            {/* ACTIONS */}

            <div className="flex flex-wrap gap-4">

              <Link href="/jobs">

                <button className="bg-cyan-500 hover:bg-cyan-600 transition px-7 py-4 rounded-2xl font-semibold shadow-xl cursor-pointer">

                  Explore Jobs

                </button>

              </Link>


              <Link href="/ats-checker">

                <button className="bg-white/10 hover:bg-white/20 transition border border-white/10 px-7 py-4 rounded-2xl font-semibold cursor-pointer">

                  ATS Checker

                </button>

              </Link>


              {/* HIDDEN FILE INPUT */}

              <input
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                onChange={
                  handleResumeUpload
                }
                className="hidden"
              />


              {/* RESUME BUTTON */}

              <button
                disabled={uploadingResume}
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="bg-white/10 hover:bg-white/20 transition border border-white/10 px-7 py-4 rounded-2xl font-semibold cursor-pointer disabled:opacity-50"
              >

                {uploadingResume
                  ? "Uploading..."
                  : resumeUploaded
                  ? "Resume Uploaded"
                  : "Upload Resume"}

              </button>

            </div>

          </motion.div>



          {/* STATS */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-14">

            {[
              {
                title: "Applications",
                value:
                  applicationsCount.toString(),
                growth:
                  applicationsCount > 0
                    ? "Applications submitted"
                    : "No applications yet",
              },
              {
                title: "Interviews",
                value: "0",
                growth:
                  "No interviews scheduled",
              },
              {
                title: "Resume",
                value:
                  resumeUploaded
                    ? "YES"
                    : "NO",
                growth:
                  resumeUploaded
                    ? "Resume uploaded"
                    : "Upload resume",
              },
              {
                title: "ATS Score",
                value: "--",
                growth:
                  "ATS analyzer coming soon",
              },
            ].map((card, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 70,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[30px] p-8 shadow-2xl"
              >

                <p className="text-slate-300 text-sm">

                  {card.title}

                </p>


                <h2 className="text-5xl font-bold mt-5">

                  {card.value}

                </h2>


                <div className="mt-6 inline-flex bg-white/10 text-slate-300 px-4 py-2 rounded-full text-sm font-semibold">

                  {card.growth}

                </div>

              </motion.div>

            ))}

          </div>



          {/* MAIN GRID */}

          <div className="grid xl:grid-cols-3 gap-8">

            {/* RECENT APPLICATIONS */}

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
              className="xl:col-span-2 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[35px] p-8 shadow-2xl"
            >

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-3xl font-bold">

                    Recent Applications

                  </h2>


                  <p className="text-slate-300 mt-2">

                    Applications will appear here once you apply for jobs.

                  </p>

                </div>

              </div>


              {recentApplications.length === 0 ? (

                <div className="flex flex-col items-center justify-center py-20 text-center">

                  <h3 className="text-2xl font-semibold mb-4">

                    No applications yet

                  </h3>


                  <p className="text-slate-400 max-w-lg mb-8">

                    Start applying to jobs and track your progress here professionally.

                  </p>


                  <Link href="/jobs">

                    <button className="bg-cyan-500 hover:bg-cyan-600 transition px-7 py-4 rounded-2xl font-semibold cursor-pointer">

                      Explore Jobs

                    </button>

                  </Link>

                </div>

              ) : (

                <div className="space-y-5">

                  {recentApplications.map(
                    (
                      app,
                      index
                    ) => (

                      <div
                        key={index}
                        className="bg-white/5 border border-white/10 rounded-2xl p-5"
                      >

                        <h3 className="text-xl font-semibold">

                          {
                            app.job_title
                          }

                        </h3>


                        <p className="text-cyan-300 mt-2">

                          {app.company}

                        </p>


                        <div className="mt-4 inline-flex bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm">

                          {app.status}

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

            </motion.div>



            {/* ACTIVITY FEED */}

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
              className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[35px] p-8 shadow-2xl"
            >

              <h2 className="text-3xl font-bold mb-8">

                Activity Feed

              </h2>


              <div className="space-y-6">

                <div className="flex items-start gap-4">

                  <div className="w-3 h-3 rounded-full bg-cyan-400 mt-2"></div>

                  <p className="text-slate-300 leading-relaxed">

                    Your activity history will appear here.

                  </p>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </main>

    </ProtectedRoute>

  );
}