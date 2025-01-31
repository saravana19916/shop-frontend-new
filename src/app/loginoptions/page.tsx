"use client";
import React, { Fragment, useEffect, useState } from "react";
import PageLogin from "../login/page";
//import ButtonPrimary from "@/shared/ButtonPrimary";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const ButtonPrimary = styled.button`
  background-color: rgb(235, 0, 59);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 19px;
`;
const LoginOptionsPage = ({ params }) => {
  const router = useRouter();

  useEffect(() => {
    const prevUrl = router.back;
    console.log(prevUrl);
  }, []);
  const { t } = useTranslation();
  return (
    <main className="mx-2 my-4 lg:mx-8 lg:my-12">
      <div className="container ">
        <h1 className="font-bold text-black text-2xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-4xl !leading-[115%] text-start mb-6 ml-8 dark:text-neutral-300">
          {t("chooseOneOfOurLoginOptionsToProceed")}{" "}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x">
          <div className="flex flex-col gap-4 p-4 lg:p-12">
            <h3 className="text-xl lg:text-2xl font-bold">{t("signIn")}</h3>
            <PageLogin loginoption={true} />
          </div>

          <div className="flex flex-col gap-4 p-4 lg:p-12">
            <h3 className="text-xl lg:text-2xl font-bold">{t("signUp")}</h3>
            <p className="text-neutral-6000 dark:text-neutral-300">
              {t(
                "signUpWithUsAndEnjoySpecialOffersAndSpecialPromotionalPrices"
              )}
            </p>
            <ButtonPrimary
              onClick={() => router.push("/signup")}
              className="w-full py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
            >
              {t("becomeATixboxMember")}
            </ButtonPrimary>
          </div>
          <div className="flex flex-col gap-4 p-4 lg:p-12">
            <h3 className="text-xl lg:text-2xl font-bold roun">
              {t("guestCheckout")}
            </h3>
            <p className="text-neutral-6000 dark:text-neutral-300">
              {t("proceedWithYourPurchaseAndRegisterLater.")}
            </p>
            <ButtonPrimary
              // onClick={() => router.push("/checkout")}
              className="w-full py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
            >
              {t("continueAsGuest")}
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </main>
  );
};
export default LoginOptionsPage;
