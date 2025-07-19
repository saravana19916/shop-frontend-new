"use client";
import { IEventDetails } from "@/model/IEventDetail";
import Avatar from "@/shared/Avatar";
import ButtonSecondary from "@/shared/ButtonSecondary";
import moment from "moment";
import { Route } from "next";
import React, { Fragment, FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import logo1 from "@/images/logos/1.png";
import logo2 from "@/images/logos/2.png";
import logo3 from "@/images/logos/3.png";
import logo4 from "@/images/logos/4.png";

export interface EventCreditProps {
  eventDetail: IEventDetails;
}
const EventCredit: FC<EventCreditProps> = ({ eventDetail }) => {
  const { t } = useTranslation();
  const sponsors = [
    { name: "Organizing Partners", image: logo1 },
    { name: "Financial Sponsors", image: logo2 },
    { name: "Media Sponsors", image: logo3 },
    { name: "Airline Sponsors", image: logo4 },
  ];

  return (
    <div className="listingSection__wrap !space-y-6">
      {eventDetail?.data?.id > 0 ? (
        <>
          <h2 className="text-2xl font-semibold">{t("credit")}</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <span className="block text-neutral-6000 dark:text-neutral-300">
            {/* {eventDetail?.data?.promoter?.detail?.description} */}
            <div className="flex flex-wrap items-end gap-8">
              {sponsors.map((sponsor, index) => (
                <div key={index} className="flex flex-col gap-2 w-40">
                  <h2 className="text-sm w-25 text-black">{sponsor.name}</h2>
                  <div className="border w-40 h-36 p-5 rounded-2xl flex items-center justify-center">
                    <Image
                      alt={sponsor.name}
                      src={sponsor.image}
                      className="dark:invert"
                    />
                  </div>
                </div>
              ))}
            </div>
          </span>
        </>
      ) : (
        <>
          <div className="h-3 w-2/12 rounded-md bg-gray-300 animate-pulse"></div>
          <div className="h-5 w-2/3 rounded-md bg-gray-300 animate-pulse"></div>
          <div className="h-96 w-full rounded-md bg-gray-300 animate-pulse"></div>
        </>
      )}
    </div>
  );
};
export default EventCredit;
