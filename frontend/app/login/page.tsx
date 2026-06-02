"use client";

import AuthNavbar from "@/components/AuthNavbar";

import Link from "next/link";

import { motion } from "framer-motion";

import { useState } from "react";

import { useRouter } from "next/navigation";

// import { signIn, useSession } from "next-auth/react";

import { toast } from "sonner";
import { apiUrl } from "@/lib/api";


export default function LoginPage() {

  const router = useRouter();

  // const { data: session } = useSession();

  const [email, setEmail] =
    useState("");


  const [password, setPassword] =
    useState("");


  const [loading, setLoading] =
    useState(false);


  // const [googleLoading, setGoogleLoading] = useState(false);

  const [role, setRole] =
    useState("jobseeker");

  /*
  useEffect(() => {
    if (session?.user) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: session.user.name,
          email: session.user.email,
          role: (session.user as any).role || "jobseeker",
        })
      );
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard/seeker");
    }
  }, [session, router]);
  */

  // LOGIN FUNCTION

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    try {

      setLoading(true);


      const response = await fetch(
        apiUrl("/auth/login"),

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            email,
            password,

          }),

        }
      );


      const data =
        await response.json();


      // LOGIN FAILED

      if (!response.ok) {

        toast.error(

          data.detail ||

          "Invalid credentials"
        );

        return;
      }


      // WRONG ROLE

      if (
        data.user.role !== role
      ) {

        toast.error(

          `This account is registered as ${data.user.role}`
        );

        return;
      }


      // SAVE USER

localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);


// SAVE TOKEN

if (data.access_token) {

  localStorage.setItem(
    "token",
    data.access_token
  );
}


localStorage.setItem(
  "isLoggedIn",
  "true"
);

      // REDIRECT

      if (role === "recruiter") {

        router.push(
          "/dashboard/recruiter"
        );

      } else {

        router.push(
          "/dashboard/seeker"
        );

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Server connection failed"
      );

    } finally {

      setLoading(false);

    }

  };


  /*
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      toast.success("Redirecting to Google...");
      await signIn("google", { callbackUrl: "/dashboard/seeker" });
    } catch (error) {
      console.log(error);
      toast.error("Google login failed");
    } finally {
      setGoogleLoading(false);
    }
  };
  */

  return (

    <main className="relative min-h-screen flex items-center justify-center overflow-hidden text-white px-6">


      {/* BACKGROUND VIDEO */}

      <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">

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



      {/* DARK OVERLAY */}

      <div className="fixed inset-0 bg-slate-950/80 -z-10 pointer-events-none"></div>



      <AuthNavbar />



      {/* LOGIN CARD */}

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

        className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[36px] p-10 shadow-2xl"
      >

        {/* HEADER */}

        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold">

            Welcome Back

          </h1>


          <p className="text-slate-300 mt-3">

            Login to continue to HireSphere

          </p>

        </div>



        {/* ROLE SWITCH */}

        <div className="grid grid-cols-2 gap-4 mb-8">


          {/* JOB SEEKER */}

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



          {/* RECRUITER */}

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
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label className="text-sm text-slate-300 block mb-2">

              Email

            </label>


            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 text-white"
            />

          </div>



          {/* PASSWORD */}

          <div>

            <label className="text-sm text-slate-300 block mb-2">

              Password

            </label>


            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 text-white"
            />

          </div>



          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-4 rounded-2xl font-semibold text-lg disabled:opacity-50"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>

        {/* Google OAuth disabled
        <div className="flex items-center gap-4 my-8">...</div>
        <button onClick={handleGoogleLogin}>Continue with Google</button>
        */}

        {/* SIGNUP LINK */}

        <div className="mt-8 text-center text-slate-300 relative z-50">

          Don’t have an account?{" "}

          <Link
            href="/signup"
            className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
          >

            Sign Up

          </Link>

        </div>

      </motion.div>

    </main>

  );
}