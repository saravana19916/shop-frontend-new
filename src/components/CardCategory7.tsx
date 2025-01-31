import React, { FC, useEffect, useRef } from "react";
import { TaxonomyType } from "@/data/types";
import convertNumbThousand from "@/utils/convertNumbThousand";
import Link from "next/link";
import Image from "next/image";
import { IWishListEvent } from "@/model/IWishListEvent";
import { Event } from "@/model/IEventType";
import placeHolderImg from "@/images/placeholder-small.png";
import BtnLikeIcon from "./BtnLikeIcon";
import { useRouter } from "next/navigation";

export interface CardCategory4Props {
  className?: string;
  event?: Event;
  index?: number;
  tag?: "count" | "discount";
  imgHeight?: (height: number) => void;
  like?: boolean;
  wishlistEvents?: IWishListEvent[];
  refetchWishList?: () => void;
  user?: any;
}

const CardCategory4: FC<CardCategory4Props> = ({
  className = "",
  event,
  imgHeight,
  like,
  wishlistEvents,
  refetchWishList,
  user,
}) => {
  const imageRef = useRef(null);

  const thumbnailURL = process.env.AWS_CLOUD_FRONT_URL + "images/events/";

  const currentImage =
    event && event!.image && event!.image!.detail && event!.image!.detail!.name
      ? thumbnailURL + event!.image!.detail!.name
      : placeHolderImg;
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
    console.log("handlePush");
    push(`/${event?.event?.slugified_identifier}`);
  };
  return (
    <div
      className={`nc-CardCategory4 flex flex-col cursor-pointer ${className}`}
      data-nc-id="CardCategory4"
    >
      <div
        onClick={_handleRedirect}
        className={`flex-shrink-0 relative w-full aspect-w-5 aspect-h-5 sm:aspect-h-6 h-0 rounded-2xl overflow-hidden group`}
      >
        <Image
          ref={imageRef}
          src={currentImage}
          className="object-cover w-full h-full rounded-2xl"
          fill
          alt={event?.event?.identifier}
          sizes="(max-width: 400px) 100vw, 400px"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <BtnLikeIcon
        isLiked={like}
        className="absolute right-6 top-2 z-[1]"
        event={event}
        wishlistEvents={wishlistEvents}
        refetchWishList={refetchWishList}
        user={user}
      />
      <div onClick={_handleRedirect} className="mt-4 px-2 truncate text-center">
        <span
          className={`block mt-1 text-sm text-neutral-6000 dark:text-neutral-400 mb-1`}
        >
          {event?.event?.display_date}
        </span>
        <div className="relative group">
          <h2
            className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate capitalize`}
          >
            {event?.detail?.name.toLowerCase()}
          </h2>
          {/* Tooltip */}
          <div className="absolute left-1/2 bottom-full transform -mt-1 -translate-x-1/2 scale-0 transition-all capitalize duration-200 group-hover:scale-100 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 whitespace-nowrap shadow-md z-100">
            {event?.detail?.name.toLowerCase()}
          </div>
        </div>
        <span
          className={`block mt-2 text-sm text-neutral-6000 dark:text-neutral-400`}
        >
          {event?.event?.venue?.detail?.address}
        </span>
      </div>
    </div>
  );
};

export default CardCategory4;
