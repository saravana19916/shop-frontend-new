'use client';
import React, { FC, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import UtilityService from "@/services/utility.service";
import AuthService from "@/services/auth.service";
import LoadingSpinner from "@/components/LoadingSpinner";
import AlertSection from "@/components/AlertSection";
import Response from '@/model/response';

export interface PageEmailVerificationProps {}

const PageEmailVerification: FC<PageEmailVerificationProps> = ({}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(true);
  
  const [response, setResponse] = useState<Response | null | undefined>(null);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    setShowAlert(true);
    setResponse(UtilityService.getSessionResponse());
    UtilityService.deleteSessionResponse();
    handleEmailVerification();
  }, []);

  const handleEmailVerification = () => {
    setIsLoading(true);
    const token = searchParams.get('token');
    if(token) {
      AuthService.emailVerification(token).then(
        (res) => {
          UtilityService.storeResponse(res);
          setShowAlert(true);
          setResponse(UtilityService.getSessionResponse());
          setIsLoading(false);
          if (res.token) {
            router.push("/");
          } else {
            router.push('/login');
          }
        },
        error => {
          UtilityService.storeResponse(error);
          setShowAlert(true);
          setResponse(UtilityService.getSessionResponse());
          setIsLoading(false);
          UtilityService.deleteSessionResponse();
        }
      );
    }
  }
  
  return (
    <div className={`nc-PageEmailVerification`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Email Verification
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          
          <AlertSection response={response} show={showAlert} />

          {/* FORM */}
          {/*<form className="grid grid-cols-1 gap-6" onSubmit={handleEmailVerification}>
            <ButtonPrimary type="submit" disabled={isLoading}>Click to Verify &nbsp; {isLoading && <LoadingSpinner />}</ButtonPrimary>
          </form>*/}

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link href="/login" className="font-semibold underline">
              Sign in
            </Link>
          </span>
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link href="/signup" className="font-semibold underline">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageEmailVerification;
