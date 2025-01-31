"use client";
import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import Response from "@/model/response";
import { useTranslation } from "react-i18next";

export interface PageForgotPasswordProps {}

const PageForgotPassword: FC<PageForgotPasswordProps> = ({}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(true);

  const [response, setResponse] = useState<Response | null | undefined>(null);

  const [emailVal, setEmailVal] = useState("");

  useEffect(() => {
    setShowAlert(true);
    setResponse(UtilityService.getSessionResponse());
    UtilityService.deleteSessionResponse();
  }, []);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailVal(event.target.value);
  };

  const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const email = event.currentTarget.email.value;
    AuthService.forgotPassword(email).then(
      (res) => {
        UtilityService.storeResponse(res);
        setShowAlert(true);
        setResponse(UtilityService.getSessionResponse());
        setIsLoading(false);
        setEmailVal("");
        router.push("/login");
      },
      (error) => {
        UtilityService.storeResponse(error);
        setShowAlert(true);
        setResponse(UtilityService.getSessionResponse());
        setIsLoading(false);
        UtilityService.deleteSessionResponse();
      }
    );
  };
  const { t } = useTranslation();
  return (
    <div className={`nc-PageForgotPassword`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          {t("forgotPassword")}
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}

          <AlertSection response={response} show={showAlert} />

          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleResetPassword}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                {t("emailOrMobileNumber")}
              </span>
              <Input
                type="email"
                name="email"
                className="mt-1"
                onChange={handleEmailChange}
                value={emailVal}
                disabled={isLoading}
              />
              {response && response!.error && response!.error!.email && (
                <div className="text-red-600"> {response.error.email} </div>
              )}
            </label>
            <ButtonPrimary
              sizeClass="w-full py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
              type="submit"
              disabled={isLoading}
            >
              {t("resetPassword")} &nbsp; {isLoading && <LoadingSpinner />}
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            {t("alreadyHaveAnAccount?")}
            {` `}
            <Link href="/login" className="font-semibold underline">
              {t("signIn")}
            </Link>
          </span>
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            {t("newUser?")} {` `}
            <Link href="/signup" className="font-semibold underline">
              {t("createAnAccount")}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageForgotPassword;
