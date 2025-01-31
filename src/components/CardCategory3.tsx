import React, { FC, useRef, useState, useEffect } from "react";
import convertNumbThousand from "@/utils/convertNumbThousand";
import Link from "next/link";
import Image from "next/image";
import placeHolderImg from "@/images/placeholder-small.png";
import { Event } from "@/model/IEventType";
import moment from "moment";
import { MapPinIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { IWishListEvent } from "@/model/IWishListEvent";

export interface CardCategory3Props {
  className?: string;
  imgHeight?: (height: number) => void;
  event?: Event;
  wishListEvents?: IWishListEvent[];
  refetchWishList?: () => void;
  user?: any;
}

const CardCategory3: FC<CardCategory3Props> = ({
  className = "",
  event,
  imgHeight,
  refetchWishList,
  wishListEvents,
  user,
}) => {
  const thumbnailURL = process.env.AWS_CLOUD_FRONT_URL + "images/events/";

  const currentImage =
    event && event!.image && event!.image!.detail && event!.image!.detail!.name
      ? thumbnailURL + event!.image!.detail!.name
      : placeHolderImg;
  const imageRef = useRef(null);

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
  const { push } = useRouter();

  const _handleRedirect = () => {
    push(`/${event?.event?.slugified_identifier}`);
  };
  return (
    <div
      className={`nc-CardCategory3 cursor-pointer flex flex-col ${className}`}
    >
      <div
        onClick={_handleRedirect}
        className={`flex-shrink-0 relative w-full aspect-w-5 aspect-h-5 sm:aspect-h-6 h-0 rounded-2xl overflow-hidden group`}
      >
        <Image
          ref={imageRef}
          src={currentImage}
          className="object-cover w-full h-full rounded-2xl"
          alt="places"
          fill
          sizes="(max-width: 400px) 100vw, 300px"
          onClick={_handleRedirect}
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="mt-4 truncate pl-2" onClick={_handleRedirect}>
        <h2
          className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate capitalize`}
        >
          {event?.detail?.name.toLowerCase()}
        </h2>
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-neutral-6000 dark:text-neutral-400" />
          <span
            className={`block text-sm text-neutral-6000 dark:text-neutral-400`}
          >
            {event?.event?.display_date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardCategory3;
