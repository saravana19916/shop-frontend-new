"use client";
import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import appleSvg from "@/images/Apple.svg";
import Input from "@/shared/Input";
//import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import UtilityService from "@/services/utility.service";
import AuthService from "@/services/auth.service";
import SocialLoginComp from "./social-login-comp";
import LoadingSpinner from "@/components/LoadingSpinner";
import AlertSection from "@/components/AlertSection";
import Response from "@/model/response";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ForLoginOptions from "./ForLoginOptions";
import LoginComponent from "./LoginComponent";

export interface PageLoginProps {
  loginoption?: boolean;
}

const PageLogin: FC<PageLoginProps> = ({ loginoption = false }) => {
  let routeLink = "home";
  const router = useRouter();
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

  const [isLoading, setIsLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [response, setResponse] = useState<Response | null | undefined>(null);

  useEffect(() => {
    setShowAlert(true);
    setResponse(UtilityService.getSessionResponse());
    UtilityService.deleteSessionResponse();
  }, []);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    setIsLoading(true);
    AuthService.login(email, password).then(
      (res) => {
        UtilityService.storeResponse(res);
        setShowAlert(true);
        setResponse(UtilityService.getSessionResponse());
        setIsLoading(false);
        if (res.token) {
          if (loginoption) {
            // router.push("/checkout");
          } else {
            router.push("/home");
          }
        }
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
    <div className={`nc-PageLogin`}>
      {loginoption ? (
        <>
          <ForLoginOptions
            loginoption={loginoption}
            response={response}
            showAlert={showAlert}
            handleLogin={handleLogin}
            isLoading={isLoading}
          />
        </>
      ) : (
        <>
          {/* <ForLoginOptions
            loginoption={loginoption}
            response={response}
            showAlert={showAlert}
            handleLogin={handleLogin}
            isLoading={isLoading}
          /> */}
          <LoginComponent
            response={response}
            showAlert={showAlert}
            handleLogin={handleLogin}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};

export default PageLogin;
