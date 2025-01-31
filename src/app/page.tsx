"use client";
import React, { useEffect } from "react";
import AuthService from "@/services/auth.service";
import PageHome from "./(home)/home/page";
import PageLogin from "./login/page";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

const PageIndex = () => {
  const router = useRouter();
  useEffect(() => {
    const user: any | undefined | null = AuthService.authUser();
    router.push("/home");
    // if (user == null || user!.token == undefined) router.push("/login");
    // else router.push("/home");
  }, []);
  return (
    <>
      <div className="h-screen flex justify-center w-full">
        <LoadingSpinner />
      </div>
    </>
  );
};

export default PageIndex;
