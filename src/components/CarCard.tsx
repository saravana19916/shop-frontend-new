"use client";
import React, { FC } from "react";
import { DEMO_CAR_LISTINGS } from "@/data/listings";
import { CarDataType } from "@/data/types";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Image from "next/image";
import Link from "next/link";
import { Event } from "@/model/IEventType";
import placeHolderImg from "@/images/placeholder-small.png";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { IWishListEvent } from "@/model/IWishListEvent";
import wishlistServices from "@/services/wishlist.services";

export interface CarCardProps {
  className?: string;
  event?: Event;
  data?: CarDataType;
  size?: "default" | "small";
  wishlistEvents?: IWishListEvent[];
  refetchWishList?: () => void;
}

const DEMO_DATA: CarDataType = DEMO_CAR_LISTINGS[0];

const CarCard: FC<CarCardProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
  event,
  wishlistEvents,
  refetchWishList,
}) => {
  const {
    featuredImage,
    title,
    href,
    like,
    saleOff,
    isAds,
    price,
    reviewStart,
    reviewCount,
    seats,
    gearshift,
  } = data;
  const thumbnailURL = process.env.AWS_CLOUD_FRONT_URL + "images/events/";

  const currentImage =
    event && event!.image && event!.image!.detail && event!.image!.detail!.name
      ? thumbnailURL + event!.image!.detail!.name
      : placeHolderImg;
  const { push } = useRouter();

  const _handleRedirect = () => {
    if (event) {
      push(`/${event?.event_id}`);
    } else {
      ("/home");
    }
  };

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full overflow-hidden">
        <div className="aspect-w-16 aspect-h-14 " onClick={_handleRedirect}>
          <Image
            fill
            src={currentImage}
            alt="car"
            sizes="(max-width: 640px) 100vw, 350px"
          />
        </div>
        <BtnLikeIcon
          isLiked={like}
          className="absolute right-3 top-3 z-[1]"
          event={event || undefined}
          wishlistEvents={wishlistEvents}
        />
        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div
        className={size === "default" ? "p-5  space-y-4" : "p-3  space-y-2"}
        onClick={_handleRedirect}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {
              <CalendarIcon className="w-4 h-4 text-neutral-6000 dark:text-neutral-400" />
            }
            <span
              className={`block text-sm text-neutral-6000 dark:text-neutral-400`}
            >
              {event?.event?.display_date}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {/* {isAds && <Badge name="ADS" color="green" />} */}

            <h2
              className={`  capitalize ${
                size === "default"
                  ? "text-xl font-semibold"
                  : "text-base font-medium"
              }`}
            >
              <span className="line-clamp-1">
                {event?.detail?.name.toLowerCase()}
              </span>
            </h2>
          </div>
          <div className="mt-1.5 flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2 ">
            <MapPinIcon className="w-4 h-4  flex-shrink-0" />
            <span className="truncate  flex-grow">
              {" "}
              {event?.event?.venue?.detail?.address}
            </span>
          </div>
        </div>
        <div className="w-14  border-b border-neutral-100 dark:border-neutral-800"></div>
        {/* <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            {price}
            {` `}
            {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /day
              </span>
            )}
          </span>
          <StartRating reviewCount={reviewCount} point={reviewStart} />
        </div> */}
      </div>
    );
  };

  return (
    <div
      className={`nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
      data-nc-id="CarCard"
    >
      <div className="flex flex-col cursor-pointer">
        {renderSliderGallery()}
        {renderContent()}
      </div>
    </div>
  );
};

export default CarCard;
