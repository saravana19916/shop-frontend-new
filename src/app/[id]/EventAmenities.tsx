"use client";
import { IEventDetails } from "@/model/IEventDetail";
import Amenities from "@/services/amenities.service";
import ButtonSecondary from "@/shared/ButtonSecondary";
import React, { Fragment, FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export interface EventAmenitiesProps {
  eventDetail: IEventDetails;
}
const EventAmenities: FC<EventAmenitiesProps> = ({ eventDetail }) => {
  const { t } = useTranslation();
  // const _getAmenities = async () => {
  //   const amenities = await Amenities.getAmenitiesList();
  //   console.log(amenities, "amenities");
  // };
  // useEffect(() => {
  //   _getAmenities();
  // }, []);
  return (
    <div className="listingSection__wrap !space-y-6">
      {eventDetail?.data?.id > 0 ? (
        <>
          <div>
            <h2 className="text-2xl font-semibold">{t("amenities")} </h2>
            <span className="block mt-2 EventAmenities text-neutral-500 dark:text-neutral-400">
              {t("aboutTheProperty'sAmenitiesAndServices")}
            </span>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-6000 dark:text-neutral-300 mb-2">
              {eventDetail?.data?.eventrules?.map((eventRule) => {
                return (
                  <>
                    <div
                      key={eventRule?.id}
                      className="flex items-center space-x-3"
                    >
                      {/*<i className={`text-3xl las las la-key`}></i>*/}
                      <img
                        className="dark:invert border-none w-6 h-6 brightness-150"
                        src={`${process.env.AWS_CLOUD_FRONT_URL}images/rules/${eventRule?.rule?.image}`}
                      />
                      <span className=" ">{eventRule?.rule?.identifier}</span>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div>
            <ButtonSecondary rounded="rounded-full" className="mt-1">
              View more 20 Amenities
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
export default EventAmenities;
