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
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);
  const amenities = [
    {
      id: "concessionStands",
      label: "Concession Stands",
      value: "Concession Stands",
    },
    {
      id: "hotFood",
      label: "Hot Food",
      value: "Hot Food",
    },
    {
      id: "coldFood",
      label: "Cold Food",
      value: "Cold Food",
    },
    {
      id: "smoking",
      label: "Smoking",
      value: "Smoking",
    },
    {
      id: "nonSmoking",
      label: "Non Smoking",
      value: "Non Smoking",
    },
    {
      id: "freeParking",
      label: "Free Parking",
      value: "Free Parking",
    },
    {
      id: "paidParking",
      label: "Paid Parking",
      value: "Paid Parking",
    },
    {
      id: "outdoorParking",
      label: "Outdoor Parking",
      value: "Outdoor Parking",
    },
    {
      id: "indoorParking",
      label: "Indoor Parking",
      value: "Indoor Parking",
    },
    {
      id: "valetService",
      label: "Valet Service",
      value: "Valet Service",
    },
    {
      id: "dropOffStation",
      label: "Drop-off Station",
      value: "Drop-off Station",
    },
    {
      id: "publicRestroom",
      label: "Public Restroom",
      value: "Public Restroom",
    },
    {
      id: "familyRestroom",
      label: "Family Restroom",
      value: "Family Restroom",
    },
    {
      id: "smokingRoom",
      label: "Smoking Room",
      value: "Smoking Room",
    },
    {
      id: "vipRestroom",
      label: "VIP Restroom",
      value: "VIP Restroom",
    },
    {
      id: "freeWifi",
      label: "Free Wifi",
      value: "Free Wifi",
    },
    {
      id: "paidWifi",
      label: "Paid Wifi",
      value: "Paid Wifi",
    },
    {
      id: "noWifi",
      label: "No Wifi",
      value: "No Wifi",
    },
    {
      id: "changingRooms",
      label: "Changing Rooms",
      value: "Changing Rooms",
    },
    {
      id: "lockers",
      label: "Lockers",
      value: "Lockers",
    }
  ];
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
                      <i className="las la-check text-sm"></i>
                      <span className=" ">{eventRule?.rule?.identifier}</span>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div>
            {!showMoreAmenities && (
              <ButtonSecondary rounded="rounded-full" className="mt-1" onClick={() => setShowMoreAmenities(true)}>
                View more 20 Amenities
              </ButtonSecondary>
            )}
          </div>

          {showMoreAmenities && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-6000 dark:text-neutral-300 mb-2">
              {amenities.map((amenitie) => {
                  return (
                    <>
                      <div
                        key={amenitie?.id}
                        className="flex items-center space-x-3"
                      >
                        <i className="las la-check text-sm"></i>
                        <span className=" ">{amenitie?.label}</span>
                      </div>
                    </>
                  );
                })}
            </div>
          )}

          <div>
            {showMoreAmenities && (
              <ButtonSecondary rounded="rounded-full" className="mt-1" onClick={() => setShowMoreAmenities(false)}>
                Less more Amenities
              </ButtonSecondary>
            )}
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
