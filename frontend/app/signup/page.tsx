"use client";

import AuthNavbar from "@/components/AuthNavbar";

import Link from "next/link";

import { motion } from "framer-motion";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";


export default function SignupPage() {

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("jobseeker");

  const [loading, setLoading] =
    useState(false);


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    try {

      setLoading(true);


      const response = await fetch(
        "http://127.0.0.1:8000/auth/auth/signup",
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            name,
            email,
            password,
            role,

          }),

        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        toast.error(
          data.detail ||
            "Signup failed"
        );

        return;
      }


      toast.success(
        "Account created successfully"
      );


      setTimeout(() => {

        router.push("/login");

      }, 1500);

    } catch (error) {

      console.error(error);

      toast.error(
        "Server Error"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <main className="relative min-h-screen flex items-center justify-center overflow-hidden text-white px-6">

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



      {/* SIGNUP CARD */}

      <motion.div
        initial={{
          opacity: 0,
          y: 60,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[36px] p-10 shadow-2xl"
      >

        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold">

            Create Account

          </h1>


          <p className="text-slate-300 mt-3">

            Join HireSphere and start your journey

          </p>

        </div>



        {/* ROLE SELECTION */}

        <div className="grid grid-cols-2 gap-4 mb-8">

          <button
            type="button"
            onClick={() =>
              setRole("jobseeker")
            }
            className={`py-3 rounded-2xl font-semibold transition ${
              role === "jobseeker"
                ? "bg-cyan-500 text-white"
                : "bg-white/10 border border-white/10 hover:bg-white/20"
            }`}
          >

            Job Seeker

          </button>


          <button
            type="button"
            onClick={() =>
              setRole("recruiter")
            }
            className={`py-3 rounded-2xl font-semibold transition ${
              role === "recruiter"
                ? "bg-cyan-500 text-white"
                : "bg-white/10 border border-white/10 hover:bg-white/20"
            }`}
          >

            Recruiter

          </button>

        </div>



        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* NAME */}

          <div>

            <label className="text-sm text-slate-300 block mb-2">

              Full Name

            </label>


            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Enter your full name"
              className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 text-white"
              required
            />

          </div>



          {/* EMAIL */}

          <div>

            <label className="text-sm text-slate-300 block mb-2">

              Email

            </label>


            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Enter your email"
              className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 text-white"
              required
            />

          </div>



          {/* PASSWORD */}

          <div>

            <label className="text-sm text-slate-300 block mb-2">

              Password

            </label>


            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="Create a password"
              className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 text-white"
              required
            />

          </div>



          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-4 rounded-2xl font-semibold text-lg disabled:opacity-50"
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>



        {/* BOTTOM */}

        <div className="mt-8 text-center text-slate-300">

          Already have an account?{" "}

          <Link
            href="/login"
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >

            Login

          </Link>

        </div>

      </motion.div>

    </main>
  );
}