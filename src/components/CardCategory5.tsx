import React, { FC, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import convertNumbThousand from "@/utils/convertNumbThousand";
import Link from "next/link";
import Image from "next/image";
import placeHolderImg from "@/images/placeholder-small.png";
import { Event } from "@/model/IEventType";
import moment from "moment";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import BtnLikeIcon from "./BtnLikeIcon";
import { IWishListEvent } from "@/model/IWishListEvent";

export interface CardCategory5Props {
  className?: string;
  event?: Event;
  imgHeight?: (height: number) => void;
  like?: boolean;
  wishlistEvents?: IWishListEvent[];
  refetchWishList?: () => void;
  user?: any;
}

const CardCategory5: FC<CardCategory5Props> = ({
  className = "",
  event,
  imgHeight,
  like,
  wishlistEvents,
  refetchWishList,
  user,
}) => {
  const pathName: string[] = usePathname()?.split("/");
  const ID: number = +pathName[pathName.length - 1];

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
      className={`nc-CardCategory5 flex flex-col cursor-pointer ${className}`}
      data-nc-id="CardCategory5"
    >
      <div
        onClick={_handleRedirect}
        className={`flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-0 rounded-2xl overflow-hidden group`}
      >
        <Image
          onClick={_handleRedirect}
          ref={imageRef}
          fill
          alt=""
          src={currentImage}
          className="object-cover w-full h-full rounded-2xl"
          sizes="(max-width: 400px) 100vw, 400px"
        />
        <span
          className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"
          onClick={_handleRedirect}
        ></span>
      </div>
      <BtnLikeIcon
        isLiked={like}
        className="absolute right-3 top-3 z-[1]"
        event={event}
        wishlistEvents={wishlistEvents}
        refetchWishList={refetchWishList}
        user={user}
      />
      <div className="mt-4 px-3 truncate pl-2" onClick={_handleRedirect}>
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
        <h2
          className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate capitalize`}
        >
          {event?.detail?.name.toLowerCase()}
        </h2>
        <div className="mt-1.5 flex items-center text-sm text-neutral-6000 dark:text-neutral-400 space-x-2 ">
          {<MapPinIcon className="w-4 h-4  flex-shrink-0" />}
          <span className="truncate  flex-grow">
            {event?.event?.venue?.detail?.address}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardCategory5;
