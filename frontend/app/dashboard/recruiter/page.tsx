"use client";

import { motion } from "framer-motion";

import Link from "next/link";

import { useEffect, useState } from "react";

// import { useSession } from "next-auth/react";

import ProtectedRoute from "@/components/ProtectedRoute";

import { toast } from "sonner";
import { apiUrl } from "@/lib/api";


export default function RecruiterDashboardPage() {

  // const { data: session } = useSession();

  const [userName, setUserName] =
    useState("Recruiter");


  const [jobsPosted, setJobsPosted] =
    useState(0);


  const [
    applicationsReceived,
    setApplicationsReceived,
  ] = useState(0);


  const [recentApplicants, setRecentApplicants] =
    useState<any[]>([]);


  const [loading, setLoading] =
    useState(false);



  // FETCH DASHBOARD

  const fetchDashboard = async () => {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await fetch(
        apiUrl("/dashboard/recruiter"),
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      const data =
        await response.json();


      setJobsPosted(
        data.jobs_posted || 0
      );


      setApplicationsReceived(
        data.applications_received || 0
      );


      setRecentApplicants(
        data.recent_applicants || []
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load dashboard"
      );

    }

  };



  // LOAD USER

  useEffect(() => {

    // Google OAuth disabled
    // if (session?.user?.name) {
    //   setUserName(session.user.name);
    // }

    // NORMAL LOGIN USER

    const localUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );


    if (localUser?.name) {

      setUserName(
        localUser.name
      );

    }

    // EMAIL FALLBACK

    else if (localUser?.email) {

      const extractedName =
        localUser.email
          .split("@")[0]
          .replace(/[0-9]/g, "")
          .replace(".", " ");


      setUserName(
        extractedName
      );
    }


    fetchDashboard();

  }, []);



  // UPDATE APPLICATION STATUS

  const updateApplicationStatus =
    async (
      applicationId: number,
      status: string
    ) => {

      try {

        setLoading(true);


        const token =
          localStorage.getItem("token");

        if (!token) {
          toast.error(
            "Please login first"
          );
          return;
        }

        const response = await fetch(
          apiUrl(
            `/applications/update-status/${applicationId}?status=${encodeURIComponent(status)}`
          ),

          {

            method: "PATCH",
            headers: {
              Authorization:
                `Bearer ${token}`,
            },

          }
        );


        const data =
          await response.json();


        if (!response.ok) {

          toast.error(
            data.detail ||
              "Failed to update status"
          );

          return;
        }


        toast.success(
          `Candidate marked as ${status}`
        );


        fetchDashboard();

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



        {/* CONTENT */}

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

                Recruiter Dashboard

              </p>


              <h1 className="text-5xl font-bold leading-tight">

                Welcome back,

                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">

                  {" "}
                  {userName}

                </span>

              </h1>


              <p className="text-slate-300 text-lg mt-5 max-w-2xl">

                Manage hiring pipelines professionally using HireSphere.

              </p>

            </div>



            <div className="flex flex-wrap gap-4">

              <Link href="/post-job">

                <button className="bg-cyan-500 hover:bg-cyan-600 transition px-7 py-4 rounded-2xl font-semibold shadow-xl cursor-pointer">

                  Post New Job

                </button>

              </Link>

            </div>

          </motion.div>



          {/* ANALYTICS */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-14">

            {[
              {
                title: "Jobs Posted",
                value: jobsPosted.toString(),
                growth:
                  jobsPosted > 0
                    ? "Jobs published"
                    : "No jobs posted yet",
              },

              {
                title: "Applications",
                value:
                  applicationsReceived.toString(),
                growth:
                  applicationsReceived > 0
                    ? "Applications received"
                    : "No applications received",
              },

              {
                title: "Interviews",
                value:
                  recentApplicants.filter(
                    (
                      applicant: any
                    ) =>
                      applicant.status ===
                      "Interview Scheduled"
                  ).length.toString(),
                growth:
                  "Interview pipeline",
              },

              {
                title: "Hired",
                value:
                  recentApplicants.filter(
                    (
                      applicant: any
                    ) =>
                      applicant.status ===
                      "Hired"
                  ).length.toString(),
                growth:
                  "Successful hires",
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

        </div>

      </main>

    </ProtectedRoute>

  );
}