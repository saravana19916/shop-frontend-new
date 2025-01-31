"use client";
import { IEventDetails } from "@/model/IEventDetail";
import React, { Fragment, FC, useState, useEffect } from "react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Route } from "next";
import Image from "next/image";
import { useTranslation } from "react-i18next";
export interface EventGalleriesProps {
  eventDetail: IEventDetails;
  onOpenGalleriesModel?: any;
}

const EventGalleries: FC<EventGalleriesProps> = ({
  eventDetail,
  onOpenGalleriesModel,
}) => {
  const thisPathname = usePathname();
  const router = useRouter();
  const handleOpenModalImageGallery = () => {
    onOpenGalleriesModel(true);
    // router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  };
  const { t } = useTranslation();
  return (
    <>
      {eventDetail?.data?.id > 0 ? (
        <header className="rounded-md sm:rounded-xl">
          <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
            <div
              className="col-span-3 row-span-3 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={handleOpenModalImageGallery}
            >
              <Image
                alt="photo 1"
                fill
                className="object-cover  rounded-md sm:rounded-xl"
                src={
                  process.env.AWS_CLOUD_FRONT_URL +
                    "images/events/" +
                    eventDetail?.data?.galleries[0]?.img_name || ""
                }
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            {/* {PHOTOS.filter((_, i) => i >= 1 && i < 4).map((item, index) => ( */}
            {eventDetail.data.galleries.map((item, index) => (
              <div
                key={index}
                className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                  index >= 2 ? "block" : ""
                }`}
              >
                <div className="aspect-w-4 aspect-h-3">
                  <Image
                    alt={item?.img_name}
                    fill
                    className="object-cover w-full h-full rounded-md sm:rounded-xl "
                    src={
                      process.env.AWS_CLOUD_FRONT_URL +
                        "images/events/" +
                        item?.img_name || ""
                    }
                    sizes="400px"
                  />
                </div>

                {/* OVERLAY */}
                <div
                  className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handleOpenModalImageGallery}
                />
              </div>
            ))}

            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              onClick={handleOpenModalImageGallery}
            >
              <Squares2X2Icon className="h-5 w-5" />
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                {t("showAllPhotos")}
              </span>
            </div>
          </div>
        </header>
      ) : (
        <>
          <div className="relative grid grid-cols-4 gap-1 sm:gap-2 animate-pulse">
            <div className="col-span-3 row-span-3 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer">
              <div className="w-full rounded-md bg-gray-300 aspect-w-4 aspect-h-3"></div>
            </div>
            <div className="relative rounded-md sm:rounded-xl overflow-hidden ">
              <div className="w-full rounded-md bg-gray-300 aspect-w-4 aspect-h-3"></div>
            </div>
            <div className="relative rounded-md sm:rounded-xl overflow-hidden ">
              <div className="w-full rounded-md bg-gray-300 aspect-w-4 aspect-h-3"></div>
            </div>
            <div className="relative rounded-md sm:rounded-xl overflow-hidden ">
              <div className="w-full rounded-md bg-gray-300 aspect-w-4 aspect-h-3"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default EventGalleries;
