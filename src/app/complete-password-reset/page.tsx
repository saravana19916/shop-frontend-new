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

export interface PageResetPasswordProps {}

const PageResetPassword: FC<PageResetPasswordProps> = ({}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(true);
  
  const [response, setResponse] = useState<Response | null | undefined>(null);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    setShowAlert(true);
    setResponse(UtilityService.getSessionResponse());
    UtilityService.deleteSessionResponse();
  }, []);

  const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const token = searchParams.get('token');
    if(token) {
      const password = event.currentTarget.password.value;
      const confirm_password = event.currentTarget.confirm_password.value;
      AuthService.resetPassword(token, password, confirm_password).then(
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
    <div className={`nc-PageResetPassword`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Reset Password
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          
          <AlertSection response={response} show={showAlert} />
          
          <form className="grid grid-cols-1 gap-6" onSubmit={handleResetPassword}>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                New Password
              </span>
              <Input type="password" name="password" className="mt-1" disabled={isLoading} />
              {response && response!.error && response!.error!.password && <div className="text-red-600"> {response.error.password} </div>}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>
              <Input type="password" name="confirm_password" className="mt-1" disabled={isLoading} />
              {response && response!.error && response!.error!.confirm_password && <div className="text-red-600"> {response.error.confirm_password} </div>}
            </label>
            <ButtonPrimary type="submit" disabled={isLoading}   sizeClass="w-full py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full">Reset Password &nbsp; {isLoading && <LoadingSpinner />}</ButtonPrimary>
          </form>

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

export default PageResetPassword;
