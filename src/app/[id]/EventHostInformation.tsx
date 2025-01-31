"use client";
import { IEventDetails } from "@/model/IEventDetail";
import Avatar from "@/shared/Avatar";
import ButtonSecondary from "@/shared/ButtonSecondary";
import moment from "moment";
import { Route } from "next";
import React, { Fragment, FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export interface EventHostInformationProps {
  eventDetail: IEventDetails;
}
const EventHostInformation: FC<EventHostInformationProps> = ({
  eventDetail,
}) => {
  const { t } = useTranslation();
  return (
    <div className="listingSection__wrap !space-y-6">
      {eventDetail?.data?.id > 0 ? (
        <>
          <h2 className="text-2xl font-semibold">{t("hostInformation")}</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex items-center space-x-4">
            <Avatar
              hasChecked
              hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
              sizeClass="h-14 w-14"
              radius="rounded-full"
              imgUrl={`${process.env.AWS_CLOUD_FRONT_URL}images/promoters/${eventDetail?.data?.promoter?.image_file_name}`}
              userName={eventDetail?.data?.promoter?.detail?.name}
            />
            <div>
              <a className="block text-xl font-medium" href="#">
                {eventDetail?.data?.promoter?.detail?.name}
              </a>
            </div>
          </div>
          <span className="block text-neutral-6000 dark:text-neutral-300">
            {eventDetail?.data?.promoter?.detail?.description}
          </span>
          <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                {t("joinedIn")}{" "}
                {moment(eventDetail?.data?.promoter?.added_date).format(
                  "MMM, YYYY"
                )}
              </span>
            </div>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div>
            <ButtonSecondary
              rounded="rounded-full"
              href={
                `/promoter/${eventDetail?.data?.promoter_id}` as Route<string>
              }
            >
              {t("seeHostProfile")}
            </ButtonSecondary>
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
export default EventHostInformation;
