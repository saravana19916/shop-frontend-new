"use client";

import React, { FC, useState } from "react";
import ButtonCircle from "@/shared/ButtonCircle";
import rightImg from "@/images/SVG-subcribe2.png";
import Badge from "@/shared/Badge";
import Input from "@/shared/Input";
import Image from "next/image";
import NewsLetterService from "@/services/newsletter.services";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  const [isNewsLetterSubscriptionsLoading, setIsNewsLetterSubscriptionLoading] =
    useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>("");

  async function handleSubscription(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsNewsLetterSubscriptionLoading(true);
    const email = emailAddress;

    try {
      const result = await NewsLetterService.subscribeForNewsLetter(email);
      console.log(result);

      setEmailAddress("");
      toast.success(result?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    } catch (error) {
      console.error("Failed to subscribe:", error);
      toast.error("Failed to subscribe", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    } finally {
      setIsNewsLetterSubscriptionLoading(false);
    }
  }

  const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailAddress(e.target.value);
  };
  const { t } = useTranslation();

  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      <ToastContainer />
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl">{t("joinOurNewsletter")} 🎉</h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          {t("readAndShareNewPerspectivesOnJustAboutAnyTopic.")}{" "}
          {/* {t("everyone’sWelcome")}. */}
        </span>
        <ul className="space-y-4 mt-10">
          <li className="flex items-center space-x-4">
            <Badge name="01" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              {t("getMoreDiscount")}
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              {t("getPremiumMagazines")}
            </span>
          </li>
        </ul>

        <form className="mt-10 relative max-w-sm" onSubmit={handleSubscription}>
          <Input
            required
            aria-required
            placeholder={t("enterYourEmail")}
            type="email"
            rounded="rounded-full"
            sizeClass="h-12 px-5 py-3"
            onChange={handleEmailOnChange}
            value={emailAddress}
          />
          <ButtonCircle
            type="submit"
            className={`absolute transform top-1/2 -translate-y-1/2 right-1.5 ${
              isNewsLetterSubscriptionsLoading ? "animate-pulse" : ""
            }`}
            size="w-10 h-10"
            disabled={isNewsLetterSubscriptionsLoading}
          >
            <i className="las la-arrow-right text-xl"></i>
          </ButtonCircle>
        </form>
      </div>
      <div className="flex-grow">
        <Image alt="" src={rightImg} />
      </div>
    </div>
  );
};

export default SectionSubscribe2;
