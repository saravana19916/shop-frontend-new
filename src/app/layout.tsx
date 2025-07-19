"use client";
// import { Poppins } from "next/font/google";
import { FC, useEffect, useRef, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import Head from "next/head";
import ClientCommons from "./ClientCommons";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "@/utils/i18next";
import "rc-slider/assets/index.css";
import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";

/*const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["300", "400", "500", "600", "700"],
});*/

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
  className: string;
}) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "arabic";
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/loginoptions";

  useEffect(() => {
    document.title = "TixBox-Book Now-Events in Dubai,Qatar";
  }, []);

  return (
    <html lang="en" className="dark">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap&&subset=latin"
          rel="stylesheet"
        />
      </Head>
      <body
        className={`bg-white text-base  text-neutral-900 dark:bg-[rgba(19,19,19,1)] dark:text-neutral-200 ${
          isArabic ? "arabic-font" : ""
        }`}
        // dir={isArabic ? "rtl" : "ltr"}
      >
        {/*  dark:bg-neutral-900 */}
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <ClientCommons />
          <SiteHeader />
          <Children children={children} />
          {/* <div>{children}</div> */}
          <FooterNav />
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  );
}
import React from "react";

const Children: FC<{ children: any }> = ({ children }) => {
  const queryClient = useQueryClient();

  const { data: currentPopoverState } = useQuery<string>({
    queryKey: ["currentPopoverState"],
    queryFn: () =>
      queryClient.getQueryData<string>(["currentPopoverState"]) ?? "",
  });
  return (
    <div
      className={`${
        currentPopoverState ? "blur" : ""
      } transition-all duration-300`}
    >
      {children}
    </div>
  );
};
