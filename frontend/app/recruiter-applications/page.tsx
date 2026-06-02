"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";
interface Application {
  id: number;
  user_id: number;
  job_id: number;
  status: string;
  created_at: string;
}

export default function RecruiterApplicationsPage() {

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchApplications();

  }, []);

  const fetchApplications = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/applications/all"
      );

      const data = await response.json();

      setApplications(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

  <ProtectedRoute allowedRole="recruiter">
    <main className="relative min-h-screen text-white overflow-hidden px-6 py-10">

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



      {/* Header */}

      <div className="max-w-7xl mx-auto mb-14">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          <p className="text-cyan-400 uppercase tracking-[0.2em] text-sm font-semibold mb-4">
            Recruiter Dashboard
          </p>

          <h1 className="text-5xl font-bold">
            Job Applications
          </h1>

          <p className="text-slate-300 text-lg mt-5 max-w-3xl">
            Monitor applicants and hiring pipeline in real-time.
          </p>

        </motion.div>

      </div>



      {/* Loading */}

      {loading && (

        <div className="text-center text-2xl font-semibold">
          Loading applications...
        </div>

      )}



      {/* Applications Grid */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {!loading && applications.length === 0 && (

          <div className="text-slate-300 text-xl">
            No applications found
          </div>

        )}

        {applications.map((application, index) => (

          <motion.div
            key={application.id}
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

            <div className="mb-5">

              <h2 className="text-2xl font-bold">
                Application #{application.id}
              </h2>

              <p className="text-cyan-300 mt-2">
                User ID: {application.user_id}
              </p>

            </div>



            <div className="space-y-3 mb-6">

              <p className="text-slate-300">
                📌 Job ID: {application.job_id}
              </p>

              <p className="text-green-400 font-semibold">
                ✅ Status: {application.status}
              </p>

            </div>



            <p className="text-slate-400 mb-6">
              Applied on:
            </p>

            <p className="text-slate-200">
              {new Date(application.created_at).toLocaleString()}
            </p>



            <button className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 transition py-4 rounded-2xl font-semibold text-lg">
              View Applicant
            </button>

          </motion.div>

        ))}

      </div>

    </main>
      </ProtectedRoute>
  );
}