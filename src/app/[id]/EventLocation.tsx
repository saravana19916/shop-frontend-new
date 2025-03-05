"use client";
import { IEventDetails } from "@/model/IEventDetail";
import React, { Fragment, FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export interface EventLocationProps {
  eventDetail: IEventDetails;
}
const EventLocation: FC<EventLocationProps> = ({ eventDetail }) => {
  const { t } = useTranslation();
  return (
    <div className="listingSection__wrap !space-y-6">
      {eventDetail?.data?.id > 0 ? (
        <>
          <div>
            <h2 className="text-2xl font-semibold">{t("location")}</h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              San Diego, CA, United States of America (SAN-San Diego Intl.)
            </span>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
          <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
            <div className="rounded-xl overflow-hidden z-0">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCBaWit5uUQFlaJ_0vUEfonAb_BI_7JC-0&q=${eventDetail?.data?.venue?.latitude},${eventDetail?.data?.venue?.longitude}`}
              ></iframe>
            </div>
          </div>
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
export default EventLocation;
