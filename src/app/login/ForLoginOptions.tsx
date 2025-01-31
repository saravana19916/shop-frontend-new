import React, { FC } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import appleSvg from "@/images/Apple.svg";
import { useTranslation } from "react-i18next";
import SocialLoginComp from "./social-login-comp";
import styled from "styled-components";
import AlertSection from "@/components/AlertSection";
import Input from "@/shared/Input";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

const loginSocials = [
  {
    name: "continueWithFacebook",
    driver: "facebook",
    icon: facebookSvg,
    brand: "facebook",
  },
  /*{
        name: "Continue with Twitter",
        driver: "twitter-oauth-2",
        icon: twitterSvg,
        brand: "twitter",
      },*/
  {
    name: "continueWithGoogle",
    driver: "google",
    icon: googleSvg,
    brand: "google",
  },
  {
    name: "continueWithApple",
    driver: "apple",
    icon: appleSvg,
    brand: "apple",
  },
];
interface IProps {
  loginoption: boolean;
  response: any;
  showAlert: boolean;
  handleLogin: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const ForLoginOptions: FC<IProps> = ({
  loginoption,
  response,
  showAlert,
  handleLogin,
  isLoading,
}) => {
  const { t } = useTranslation();
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
  return (
    <>
      <div className={`${loginoption ? "" : "container"} mb-24 lg:mb-32`}>
        <h2
          className={`${
            loginoption ? "hidden" : "flex"
          } my-20 items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center`}
        >
          {t("login")}
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className={`${loginoption ? "hidden" : "grid"}  gap-3`}>
            {loginSocials.map((item, index) => (
              <SocialLoginComp
                name={item.name}
                icon={item.icon}
                brand={item.brand}
                driver={item.driver}
              />
            ))}
          </div>
          {/* OR */}
          <div
            className={`${loginoption ? "hidden" : ""} relative text-center`}
          >
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              {t("OR")}
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}

          <AlertSection response={response} show={showAlert} />

          <form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                {t("emailOrMobileNumber")}
                <span className="text-red-600">*</span>
              </span>
              <Input
                type="text"
                name="email"
                // placeholder="example@example.com"
                className="mt-1"
                disabled={isLoading}
              />
              {response && response!.error && response!.error!.email && (
                <div className="text-red-600"> {response.error.email} </div>
              )}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                <span>
                  {t("password")} <span className="text-red-600">*</span>
                </span>
                <Link
                  href="/forgot-password"
                  className="text-sm underline font-medium"
                >
                  {t("forgotPassword?")}
                </Link>
              </span>
              <Input
                type="password"
                name="password"
                className="mt-1"
                disabled={isLoading}
              />
              {response && response!.error && response!.error!.password && (
                <div className="text-red-600"> {response.error.password} </div>
              )}
            </label>

            {!isLoading && (
              <ButtonPrimary
                className="w-full py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
                type="submit"
                disabled={isLoading}
              >
                {t("continue")}
              </ButtonPrimary>
            )}

            {isLoading && (
              <ButtonPrimary
                className="w-full py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
                type="submit"
                disabled={isLoading}
              >
                {t("pleaseWait")} &nbsp; {isLoading && <LoadingSpinner />}
              </ButtonPrimary>
            )}
          </form>

          {/* ==== */}
          <span
            className={`${
              loginoption ? "hidden" : "block"
            } text-center text-neutral-700 dark:text-neutral-300`}
          >
            {t("newUser?")} {` `}
            <Link href="/signup" className="font-semibold underline">
              {t("createAnAccount")}
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default ForLoginOptions;
