import React, { FC, useEffect, useRef } from "react";
import Image from "next/image";
import { IWishListEvent } from "@/model/IWishListEvent";
import { Event } from "@/model/IEventType";
import placeHolderImg from "@/images/placeholder-small.png";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import { useRouter } from "next/navigation";
import top10One from "@/images/top10-1.png";
import top10Two from "@/images/top10-2.png";
import top10Three from "@/images/top10-3.png";

export interface Top10Props {
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

const Top10: FC<Top10Props> = ({
  className = "",
  event,
  index,
  imgHeight,
  like,
  wishlistEvents,
  refetchWishList,
  user,
}) => {
  const top10Images = [top10One, top10Two, top10Three];
  const selectedImage =
    index !== undefined ? top10Images[index % top10Images.length] : top10One;
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
      className={`nc-Top10 flex flex-col cursor-pointer ${className}`}
      data-nc-id="Top10"
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
      <div className="flex">
        <div onClick={_handleRedirect} className="mt-4 px-2 w-2/5">
          <Image
            className="mt-3.5 w-24 h-24 object-contain"
            src={selectedImage}
            alt="Top10"
            priority
          />
        </div>

        <div
          onClick={_handleRedirect}
          className="mt-4 px-2 w-3/5 text-end relative group"
        >
          <span className="block mt-1 text-xs text-primary-6000 dark:text-neutral-400 mb-2">
            {event?.event?.display_date}
          </span>

          <div className="relative">
            <h2 className="mt-1 text-md text-neutral-900 dark:text-neutral-100 font-bold truncate capitalize">
              {event?.detail?.name.toLowerCase()}
            </h2>

            <div className="absolute left-1/2 bottom-full transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 whitespace-nowrap shadow-md z-50">
              {event?.detail?.name}
            </div>
          </div>

          <span className="block mt-2 text-xs text-neutral-6000 dark:text-neutral-400 break-words w-full whitespace-normal">
            {event?.event?.venue?.detail?.address}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Top10;
