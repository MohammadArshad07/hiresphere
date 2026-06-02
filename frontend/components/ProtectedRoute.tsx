"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";


interface ProtectedRouteProps {

  children: React.ReactNode;

  allowedRole?: string;
}


export default function ProtectedRoute({

  children,

  allowedRole,

}: ProtectedRouteProps) {

  const router = useRouter();


  const [loading, setLoading] =
    useState(true);


  const [authorized, setAuthorized] =
    useState(false);



  useEffect(() => {

    const user =
      localStorage.getItem("user");


    // NOT LOGGED IN

    if (!user) {

      router.push("/login");

      return;
    }


    const parsedUser =
      JSON.parse(user);


    // ROLE CHECK

    if (
      allowedRole &&
      parsedUser.role
        ?.toLowerCase()
        .trim() !==
      allowedRole
        .toLowerCase()
        .trim()
    ) {

      router.push("/");

      return;
    }


    setAuthorized(true);

    setLoading(false);

  }, [router, allowedRole]);



  // LOADING

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-2xl">

        Loading...

      </div>

    );
  }



  // BLOCK ACCESS

  if (!authorized) {

    return null;
  }



  return <>{children}</>;
}