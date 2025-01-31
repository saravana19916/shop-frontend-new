"use client";
import React, { FC, useRef, useEffect } from "react";
import Image from "next/image";
import placeHolderImg from "@/images/placeholder-small.png";
import { Event } from "@/model/IEventType";
import { MapPinIcon, CalendarIcon } from "@heroicons/react/24/outline";
import BtnLikeIcon from "./BtnLikeIcon";
import { useRouter } from "next/navigation";
import { IWishListEvent } from "@/model/IWishListEvent";

export interface CardCategory6Props {
  className?: string;
  event?: Event;
  imgHeight?: (height: number) => void;
  like?: boolean;
  wishlistEvents?: IWishListEvent[];
  refetchWishList?: () => void;
  user?: any;
}

const CardCategory6: FC<CardCategory6Props> = ({
  className = "flex-1",
  event,
  like,
  imgHeight,
  wishlistEvents,
  refetchWishList,
  user,
}) => {
  const thumbnailURL = process.env.AWS_CLOUD_FRONT_URL + "images/events/";

  const currentImage =
    event && event!.image && event!.image!.detail && event!.image!.detail!.name
      ? thumbnailURL + event!.image!.detail!.name
      : placeHolderImg;
  const imageRef = useRef(null);
  const { push } = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current) {
        const imageHeight = imageRef.current.clientHeight;
        imgHeight(imageHeight);
      }
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(imageRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [event, imageRef, window.innerWidth]);
  const _handleRedirect = () => {
    push(`/${event?.event?.slugified_identifier}`);
  };
  return (
    <div
      className={`nc-CardCategory6 relative flex w-full group rounded-2xl z-0 overflow-hidden cursor-pointer ${className}`}
    >
      <div
        className="aspect-w-16 w-full h-[35rem]"
        onClick={_handleRedirect}
      ></div>

      <Image
        ref={imageRef}
        fill
        alt=""
        src={currentImage}
        className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
        onClick={_handleRedirect}
      />
      <BtnLikeIcon
        isLiked={like}
        className="absolute right-3 top-3 z-[1]"
        event={event}
        wishlistEvents={wishlistEvents}
        refetchWishList={refetchWishList}
        user={user}
      />
      <div
        className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white pl-2"
        onClick={_handleRedirect}
      >
        <div className="flex items-center gap-2">
          {<CalendarIcon className="w-4 h-4" />}
          <span
            className={`relative block text-sm text-neutral-6000 dark:text-neutral-400`}
          >
            {event?.event?.display_date}
          </span>
        </div>
        <h2
          className={`relative text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate capitalize`}
        >
          {event?.detail?.name.toLowerCase()}
        </h2>
        <div className="mt-1.5 flex items-center text-sm text-neutral-6000 dark:text-neutral-400 space-x-2">
          <MapPinIcon className="w-4 h-4 flex-shrink-0" />
          <span className="truncate flex-grow">
            {event?.event?.venue?.detail?.address}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardCategory6;
