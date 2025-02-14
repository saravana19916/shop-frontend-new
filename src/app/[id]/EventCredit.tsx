"use client";
import { IEventDetails } from "@/model/IEventDetail";
import Avatar from "@/shared/Avatar";
import ButtonSecondary from "@/shared/ButtonSecondary";
import moment from "moment";
import { Route } from "next";
import React, { Fragment, FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export interface EventCreditProps {
  eventDetail: IEventDetails;
}
const EventCredit: FC<EventCreditProps> = ({
  eventDetail,
}) => {
  const { t } = useTranslation();
  return (
    <div className="listingSection__wrap !space-y-6">
      {eventDetail?.data?.id > 0 ? (
        <>
          <h2 className="text-2xl font-semibold">{t("credit")}</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <span className="block text-neutral-6000 dark:text-neutral-300">
            {eventDetail?.data?.promoter?.detail?.description}
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
