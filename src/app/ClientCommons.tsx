"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useThemeMode } from "@/utils/useThemeMode";
import Response from "@/model/response";
import AuthService from "@/services/auth.service";

const ClientCommons = () => {
  const router = useRouter();
  //
  useThemeMode();

  const pathname = usePathname();

  //  CUSTOM THEME STYLE
  useEffect(() => {
    const $body = document.querySelector("body");
    const user: any | undefined | null = AuthService.authUser();

    // if ((user == null || user!.token == undefined) &&
    //   pathname != "/signup" &&
    //   pathname != "/forgot-password" &&
    //   pathname != "/complete-password-reset" &&
    //   pathname != "/complete-email-verification"
    // )
    //   router.push("/login");

    if (!$body) return;

    let newBodyClass = "";

    if (pathname === "/home-3") {
      newBodyClass = "theme-purple-blueGrey";
    }
    if (pathname === "/home-2") {
      newBodyClass = "theme-cyan-blueGrey";
    }
    newBodyClass && $body.classList.add(newBodyClass);
    return () => {
      newBodyClass && $body.classList.remove(newBodyClass);
    };
  }, [pathname]);

  return <></>;
};

export default ClientCommons;
