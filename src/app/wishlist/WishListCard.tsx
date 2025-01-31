import React, { FC, useEffect, useRef, useState } from "react";
import convertNumbThousand from "@/utils/convertNumbThousand";
import Link from "next/link";
import Image from "next/image";
import placeHolderImg from "@/images/placeholder-small.png";
import { Event } from "@/model/IEventType";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import { IWishListEvent } from "@/model/IWishListEvent";

export interface CardCategory4Props {
  className?: string;
  event?: any;
  index?: number;
  tag?: "count" | "discount";
  imgHeight?: (height: number) => void;
  like?: boolean;
  refetchWishList?: () => void;
  wishlistEvents?: IWishListEvent[];
  user?: any;
}

const WishListCard: FC<CardCategory4Props> = ({
  className = "",
  event,
  index,
  tag,
  imgHeight,
  like,
  refetchWishList,
  wishlistEvents,
  user,
}) => {
  const imageRef = useRef(null);
  const thumbnailURL = process.env.AWS_CLOUD_FRONT_URL + "images/events/";
  const [currentImage, setCurrentImage] = useState<any>();

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
  useEffect(() => {
    const image =
      event &&
      event?.event!.images &&
      event?.event!.images[0]!.detail &&
      event?.event!.images[0]!.detail!.name
        ? thumbnailURL + event?.event!.images[0]!.detail!.name
        : placeHolderImg;
    setCurrentImage(image);
  }, [event]);
  const { push } = useRouter();

  const _handleRedirect = () => {
    push(`/${event?.slugified_identifier}`);
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
        {tag == "count" && (
          <span className="absolute text-primary-6000 bg-white w-12 h-14 z-20 text-center text-3xl font-extrabold rounded-[0px_0px_8px_8px] left-4 top-0 flex items-center justify-center">
            {index + 1}
          </span>
        )}
        {tag == "discount" && (
          <span className="absolute text-white text-xs bg-primary-6000  w-10 h-10 z-20 text-center flex items-center justify-center rounded-lg left-4 top-4 pl-1">
            -50%
          </span>
        )}

        <Image
          ref={imageRef}
          src={currentImage}
          className="object-cover w-full h-full rounded-2xl"
          fill
          alt="archive"
          sizes="(max-width: 400px) 100vw, 400px"
          onClick={_handleRedirect}
        />

        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <BtnLikeIcon
        isLiked={like}
        className="absolute right-3 top-3 z-[1]"
        event={event}
        refetchWishList={refetchWishList}
        wishlistEvents={wishlistEvents}
        user={user}
      />
      <div
        className="mt-4 px-2 truncate text-start pl-2"
        onClick={_handleRedirect}
      >
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
          className={`mt-1.5 text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate capitalize`}
        >
          {event?.event?.detail?.name.toLowerCase()}
        </h2>
        <div className="mt-1.5 flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
          <MapPinIcon className="w-4 h-4 flex-shrink-0" />
          <span className="truncate flex-grow">
            {event?.event?.venue?.detail?.address}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WishListCard;
