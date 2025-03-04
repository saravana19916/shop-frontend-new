import React, { FC, useEffect, useRef } from "react";
import Image from "next/image";
import { IWishListEvent } from "@/model/IWishListEvent";
import { Event } from "@/model/IEventType";
import placeHolderImg from "@/images/placeholder-small.png";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import { useRouter } from "next/navigation";

export interface LastChanceProps {
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

const LastChance: FC<LastChanceProps> = ({
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
    push("/homev2");
  };
  return (
    <div
      className={`nc-LastChance flex flex-col cursor-pointer ${className}`}
      data-nc-id="LastChance"
    >
      <div
        onClick={_handleRedirect}
        className={`flex-shrink-0 relative w-full aspect-w-5 aspect-h-5 sm:aspect-h-6 h-0 rounded-2xl overflow-hidden group`}
      >
        <span className="absolute text-black text-xs bg-gray-50 w-20 h-8 z-20 flex items-center justify-center rounded-full left-3 top-3">
          primary
        </span>
        <div className="relative">
        <BtnLikeIcon
            isLiked={like}
            className="absolute right-6 top-2 z-[1]"
            event={event}
            wishlistEvents={wishlistEvents}
            refetchWishList={refetchWishList}
            user={user}
            isHomev2={true}
          />
        </div>

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
      <div onClick={_handleRedirect} className="mt-4 px-2 truncate text-center">
        <span
          className={`block mt-1 text-xs text-primary-6000 dark:text-neutral-400 mb-2`}
        >
          {event?.event?.display_date}
        </span>
        <div className="relative group">
          <h2
            className={`mt-1 text-md text-neutral-900 dark:text-neutral-100 font-bold truncate capitalize`}
          >
            {event?.detail?.name.toLowerCase()}
          </h2>
          {/* Tooltip */}
          <div className="absolute left-1/2 bottom-full transform -mt-1 -translate-x-1/2 scale-0 transition-all capitalize duration-200 group-hover:scale-100 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 whitespace-nowrap shadow-md z-100">
            {event?.detail?.name.toLowerCase()}
          </div>
        </div>
        <span
          className={`block mt-2 text-xs text-neutral-6000 dark:text-neutral-400`}
        >
          {event?.event?.venue?.detail?.address}
        </span>
      </div>
    </div>
  );
};

export default LastChance;
