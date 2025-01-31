"use client";
import React, { FC, useEffect, useState } from "react";
import { Nav } from "./(components)/Nav";
import AuthService from "@/services/auth.service";
import { usePathname, useRouter } from "next/navigation";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const user: any | undefined | null = AuthService.authUser();
    if (user == null) {
      setIsGuest(false);
      router.push("/login");
    } else {
      setIsGuest(true);
    }
  }, []);
  return (
    <div className="nc-CommonLayoutAccount bg-neutral-50 dark:bg-neutral-900">
      {isGuest && (
        <>
          <div className="border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <Nav />
          </div>
          <div className="container pt-8 sm:pt-8 pb-24 lg:pb-32">
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export default CommonLayout;
