import React, { FC, useEffect, useRef } from "react";
import Image from "next/image";
import { IWishListEvent } from "@/model/IWishListEvent";
import { Event } from "@/model/IEventType";
import placeHolderImg from "@/images/placeholder-small.png";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import { useRouter } from "next/navigation";
import OfferTagJpg from "@/images/offer-tag.png";

export interface SpecialsProps {
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

const Specials: FC<SpecialsProps> = ({
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
    // push(`/${event?.event_id}`);
    push("/homev2");
  };
  return (
    <div>
      <div
        className={`nc-Specials flex flex-col cursor-pointer ${className}`}
        data-nc-id="Specials"
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
          <div onClick={_handleRedirect} className="mt-4 px-2 truncate w-3/5">
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
            </div>
            <span
              className={`block mt-2 text-xs text-neutral-6000 dark:text-neutral-400`}
            >
              {event?.event?.venue?.detail?.address}
            </span>
          </div>
          <div
            onClick={_handleRedirect}
            className="flex justify-end px-2 w-2/5"
          >
            <Image
              className="-mt-4 w-25"
              src={OfferTagJpg}
              alt="Offer Tag"
              priority
            />
          </div>
        </div>
      </div>
      <div className="h-40 bg-gray-100 mt-1 rounded-b-lg">
        <div className="text-center text-xs text-neutral-6000 dark:text-neutral-400 p-5">
          this offer ends in
        </div>
        <div className="grid grid-cols-4 gap-4 pl-8 text-xs text-neutral-6000 dark:text-neutral-400">
          <div>
            <div className="flex justify-center items-center w-12 h-12 bg-white rounded-lg font-bold">
              09
            </div>
            <div className="flex justify-center items-center w-12 h-12">
              days
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center w-12 h-12 bg-white rounded-lg font-bold">
              05
            </div>
            <div className="flex justify-center items-center w-12 h-12">
              hours
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center w-12 h-12 bg-white rounded-lg font-bold">
              40
            </div>
            <div className="flex justify-center items-center w-12 h-12">
              mins
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center w-12 h-12 bg-white rounded-lg font-bold">
              59
            </div>
            <div className="flex justify-center items-center w-12 h-12">
              secs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specials;
