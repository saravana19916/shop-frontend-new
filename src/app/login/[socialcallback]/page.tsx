"use client";
import React, { FC, useState, useEffect } from "react";
import type { NextRequest, NextResponse } from "next/server";
import AuthService from "@/services/auth.service";
import UtilityService from "@/services/utility.service";
import LoadingSpinner from "@/components/LoadingSpinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Input from "@/shared/Input";
import Link from "next/link";
import Response from "@/model/response";
import styled from "styled-components";

export interface queryParam {
  socialcallback: string;
}

export interface SocialCallbackPageProps {
  params?: queryParam;
}

const SocialCallback: FC<SocialCallbackPageProps> = ({ params }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<Response | null | undefined>(null);

  const searchParams = useSearchParams();
  const provider = params?.socialcallback;
  const code = searchParams.get("code");
  const scope = searchParams.get("scope");
  const state = searchParams.get("state");

  const ButtonPrimary = styled.button`
    background-color: rgb(235, 0, 59);
    color: white;
    border: none;
    border-radius: 25px;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 19px;
  `;

  useEffect(() => {
    setIsLoading(true);
    AuthService.sociallogin(provider, code, scope, state).then(
      (res) => {
        UtilityService.storeResponse(res);
        setResponse(UtilityService.getSessionResponse());
        setIsLoading(false);
        if (res.token) {
          router.push("/home");
        } else {
          router.push("/login");
        }
      },
      (error) => {
        UtilityService.storeResponse(error);
        setResponse(UtilityService.getSessionResponse());
        setIsLoading(false);
        UtilityService.deleteSessionResponse();
      }
    );
  }, []);

  if (isLoading) {
    return (
      <div className={`nc-PageLogin`}>
        <div className={`container mb-24 lg:mb-32`}>
          <h2
            className={`flex my-20 items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center`}
          >
            Login
          </h2>

          <div className="max-w-md mx-auto space-y-6">
            <form className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Email or Mobile number
                </span>
                <Input
                  type="email"
                  name="email"
                  placeholder="example@example.com "
                  className="mt-1"
                  disabled={isLoading}
                />
                {response && response!.error && response!.error!.email && (
                  <div className="text-red-600"> {response.error.email} </div>
                )}
              </label>
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Password
                  <Link
                    href="/forgot-password"
                    className="text-sm underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </span>
                <Input
                  type="password"
                  name="password"
                  className="mt-1"
                  disabled={isLoading}
                />
                {response && response!.error && response!.error!.password && (
                  <div className="text-red-600">
                    {" "}
                    {response.error.password}{" "}
                  </div>
                )}
              </label>
              {!isLoading && (
                <ButtonPrimary
                  className="w-full py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
                  type="submit"
                  disabled={isLoading}
                >
                  Continue
                </ButtonPrimary>
              )}

              {isLoading && (
                <ButtonPrimary
                  className="w-full py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
                  type="submit"
                  disabled={isLoading}
                >
                  Logging in.. Please wait &nbsp;{" "}
                  {isLoading && <LoadingSpinner />}
                </ButtonPrimary>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default SocialCallback;
