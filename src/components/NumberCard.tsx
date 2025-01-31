import React, { FC, useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import Link from "next/link";
import Image from "next/image";
import placeHolderImg from "@/images/placeholder-small.png";
import top1Svg from "@/images/top-events/top-1.svg";
import top2Svg from "@/images/top-events/top-2.svg";
import top3Svg from "@/images/top-events/top-3.svg";
import top4Svg from "@/images/top-events/top-4.svg";
import top5Svg from "@/images/top-events/top-5.svg";
import { Event } from "@/model/IEventType";
import moment from "moment";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import BtnLikeIcon from "./BtnLikeIcon";
import { useRouter } from "next/navigation";
import { IWishListEvent } from "@/model/IWishListEvent";
import Tooltip from "./Tooltip";

export interface NumberCardProps {
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

const NumberCard: FC<NumberCardProps> = ({
  className = "",
  event,
  index,
  tag,
  imgHeight,
  like,
  wishlistEvents,
  refetchWishList,
  user,
}) => {
  const topSvgImages = [top1Svg, top2Svg, top3Svg, top4Svg, top5Svg];

  const windowWidth = useWindowSize().width;

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
    push(`/${event?.event?.slugified_identifier}`);
  };

  return (
    <>
      <div
        className={`nc-NumberCard flex flex-col cursor-pointer ${className}`}
        data-nc-id="NumberCard"
      >
        <div
          onClick={_handleRedirect}
          className={`relative h-0 xl:w-full overflow-hidden`}
          style={{
            padding: `${
              windowWidth < 600
                ? "38% 0"
                : windowWidth < 1000
                ? "35% 0"
                : windowWidth < 1280
                ? "36% 0"
                : "40% 0"
            }`,
          }}
        >
          <Image
            alt={"Top Event " + index + " " + event?.event?.identifier}
            className="xl:w-2/5 w-1/3 absolute h-full z-40 top-0 left-0 right-auto bottom-0"
            src={topSvgImages[index]}
          />
          <div className="xl:w-3/5 w-2/3 h-full cursor-pointer absolute z-40 top-0 left-auto right-2 bottom-0 object-cover overflow-hidden rounded-2xl">
            <Image
              // onClick={_handleRedirect}
              ref={imageRef}
              src={currentImage}
              className="object-cover w-full h-full rounded-2xl"
              fill
              alt={event?.event?.identifier}
              sizes="(max-width: 400px) 100vw, 400px"
            />
          </div>
          <BtnLikeIcon
            isLiked={like}
            className="absolute right-4 top-2 z-[50]"
            event={event}
            wishlistEvents={wishlistEvents}
            refetchWishList={refetchWishList}
            user={user}
          />
        </div>
        <div
          className="flex cursor-pointer items-center flex-row"
          onClick={_handleRedirect}
        >
          <div className="xl:w-2/5 w-1/3"></div>
          <div className="xl:w-3/5 w-2/3 -ml-4 z-50 mt-2 px-2 truncate text-start pl-2">
            <span className="block text-sm text-neutral-6000 dark:text-neutral-400">
              {event!.event!.display_date}
            </span>
            <Tooltip text={event!.detail!.name.toLowerCase()}>
              <h2 className="mt-1.5 text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate capitalize">
                {event!.detail!.name.toLowerCase()}
              </h2>
            </Tooltip>
            <span className="mt-1 text-sm text-neutral-6000 dark:text-neutral-400 capitalize">
              {event!.event!.venue!.detail!.address.toLowerCase()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NumberCard;
