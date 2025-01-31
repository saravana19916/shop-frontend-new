"use client";
import { IEventDetails } from "@/model/IEventDetail";
import React, { Fragment, FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export interface EventDescriptionsProps {
  eventDetail: IEventDetails;
}
const EventDescriptions: FC<EventDescriptionsProps> = ({ eventDetail }) => {
  const { t } = useTranslation();
  useEffect(() => {
    let desc = document?.getElementById("description")?.innerText;
    console.log(desc);
    const descLength = desc?.length;
    if (descLength > 450) {
      const trimDesc = desc.slice(0, 450);
      document?.getElementById("description").remove();
      var descriptiontrim = document?.getElementById("description-trim");
      descriptiontrim.innerText = trimDesc;
    }
  }, [eventDetail?.data?.detail?.description]);
  return (
    <div className="listingSection__wrap !space-y-6">
      {eventDetail?.data?.id > 0 ? (
        <>
          <h2 className="text-2xl font-semibold">Description</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-2"></div>
          <p
            id="description-trim"
            className="text-neutral-6000 dark:text-neutral-300"
          ></p>
          <div className="text-neutral-6000 dark:text-neutral-300">
            <div
              id="description"
              dangerouslySetInnerHTML={{
                __html: eventDetail?.data?.detail?.description || "",
              }}
            />
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
export default EventDescriptions;
