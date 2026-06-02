"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

// import { signOut } from "next-auth/react";


export default function Navbar() {

  const router = useRouter();


  const [mounted, setMounted] =
    useState(false);


  const [user, setUser] =
    useState<any>(null);



  // LOAD USER

  useEffect(() => {

    setMounted(true);


    const storedUser =
      localStorage.getItem("user");


    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );
    }

  }, []);



  // LOGOUT

  const handleLogout = async () => {

    // CLEAR LOCAL STORAGE

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "isLoggedIn"
    );


    setUser(null);

    // Google OAuth disabled
    // await signOut({ callbackUrl: "/", redirect: true });

    router.push("/");
  };



  // PREVENT HYDRATION ERROR

  if (!mounted) {

    return null;
  }



  return (

    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">


        {/* LOGO */}

        <Link href="/">

          <h1 className="text-3xl font-bold text-white cursor-pointer">

            HireSphere

          </h1>

        </Link>



        {/* NAV LINKS */}

        <div className="hidden md:flex items-center gap-10 text-slate-300 font-medium">

          <Link
            href="/"
            className="hover:text-white transition duration-300"
          >

            Home

          </Link>


          <Link
            href="/jobs"
            className="hover:text-white transition duration-300"
          >

            Jobs

          </Link>


          <Link
            href="/about"
            className="hover:text-white transition duration-300"
          >

            About

          </Link>

        </div>



        {/* AUTH BUTTONS */}

        <div className="flex items-center gap-4">


          {/* NOT LOGGED IN */}

          {!user ? (

            <>

              {/* LOGIN */}

              <Link href="/login">

                <button className="border border-white/20 px-6 py-3 rounded-2xl text-white hover:bg-white/10 transition cursor-pointer">

                  Login

                </button>

              </Link>



              {/* SIGNUP */}

              <Link href="/signup">

                <button className="bg-cyan-500 hover:bg-cyan-600 transition px-6 py-3 rounded-2xl text-white font-semibold cursor-pointer">

                  Sign Up

                </button>

              </Link>

            </>

          ) : (

            <>

              {/* DASHBOARD */}

              <button

                onClick={() => {

                  if (
                    user?.role ===
                    "recruiter"
                  ) {

                    router.push(
                      "/dashboard/recruiter"
                    );

                  } else {

                    router.push(
                      "/dashboard/seeker"
                    );
                  }

                }}

                className="border border-white/20 px-6 py-3 rounded-2xl text-white hover:bg-white/10 transition cursor-pointer"
              >

                Dashboard

              </button>



              {/* LOGOUT */}

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-2xl text-white font-semibold cursor-pointer"
              >

                Logout

              </button>

            </>

          )}

        </div>

      </div>

    </nav>
  );
}