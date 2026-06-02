"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { toast } from "sonner";
import { apiUrl } from "@/lib/api";


interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string;
}


export default function JobsPage() {

  const [jobs, setJobs] = useState<Job[]>([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    fetchJobs();

  }, []);


  const fetchJobs = async () => {

    try {

      const response = await fetch(
        apiUrl("/jobs/all")
      );


      const data = await response.json();

      setJobs(data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load jobs"
      );

    } finally {

      setLoading(false);

    }

  };


  const applyToJob = async (
    jobId: number
  ) => {

    try {

      const token =
        localStorage.getItem("token");


      if (!token) {

        toast.error(
          "Please login first"
        );

        return;
      }


      const response = await fetch(
        apiUrl(`/applications/apply/${jobId}`),
        {

          method: "POST",

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }
      );


      const data = await response.json();


      if (!response.ok) {

        toast.error(
          data.detail ||
            "Application failed"
        );

        return;
      }


      toast.success(
        "Application submitted successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );

    }

  };


  return (

    <main className="relative min-h-screen text-white overflow-hidden px-6 py-10">

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



      {/* HEADER */}

      <div className="max-w-7xl mx-auto mb-14">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          <p className="text-cyan-400 uppercase tracking-[0.2em] text-sm font-semibold mb-4">

            Careers

          </p>


          <h1 className="text-5xl font-bold">

            Explore Jobs

          </h1>


          <p className="text-slate-300 text-lg mt-5 max-w-3xl">

            Discover top opportunities from recruiters across the world.

          </p>

        </motion.div>

      </div>



      {/* LOADING */}

      {loading && (

        <div className="text-center text-2xl font-semibold">

          Loading jobs...

        </div>

      )}



      {/* JOB GRID */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {!loading && jobs.length === 0 && (

          <div className="text-slate-300 text-xl">

            No jobs found

          </div>

        )}


        {jobs.map((job, index) => (

          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
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

            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-2xl font-bold">

                  {job.title}

                </h2>


                <p className="text-cyan-300 mt-2">

                  {job.company}

                </p>

              </div>

            </div>



            <div className="space-y-3 mb-6">

              <p className="text-slate-300">

                📍 {job.location}

              </p>


              <p className="text-green-400 font-semibold">

                💰 {job.salary}

              </p>

            </div>



            <p className="text-slate-300 leading-relaxed mb-6">

              {job.description}

            </p>



            <div className="mb-6">

              <p className="text-sm text-slate-400 mb-2">

                Requirements

              </p>


              <p className="text-slate-200">

                {job.requirements}

              </p>

            </div>



            <button
              onClick={() =>
                applyToJob(job.id)
              }
              className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-4 rounded-2xl font-semibold text-lg"
            >

              Apply Now

            </button>

          </motion.div>

        ))}

      </div>

    </main>
  );
}