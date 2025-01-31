"use client";
import { includes_demo } from "@/app/(listing-detail)/event-detail/constant";
import { IEventDetails } from "@/model/IEventDetail";
import React, { Fragment, FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export interface EventInclusionProps {
  eventDetail: IEventDetails;
}
const EventInclusion: FC<EventInclusionProps> = ({ eventDetail }) => {
  const { t } = useTranslation();
  return (
    <div className="listingSection__wrap !space-y-6">
      {eventDetail?.data?.id > 0 ? (
        <>
          <div>
            <h2 className="text-2xl font-semibold">{t("inclusion")} </h2>
            <span className="block mt-2 text-lg font-semibold text-neutral-500 dark:text-neutral-400">
              {t("includedInThePrice")}
            </span>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 text-sm text-neutral-6000 dark:text-neutral-300">
            {includes_demo
              .filter((_, i) => i < 12)
              .map((item) => (
                <div key={item.name} className="flex items-center space-x-3">
                  <i className="las la-check-circle text-2xl"></i>
                  <span>{item.name}</span>
                </div>
              ))}
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
export default EventInclusion;
