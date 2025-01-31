import BtnLikeIcon from "@/components/BtnLikeIcon";
import GallerySlider from "@/components/GallerySlider";
import { IWishListEvent } from "@/model/IWishListEvent";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
export interface WishListCardCategory2 {
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
const WishListCard2: FC<WishListCardCategory2> = ({
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
  const { push } = useRouter();

  const _handleRedirect = () => {
    push(`/${event?.slugified_identifier}`);
  };

  return (
    <>
      <div
        className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
        data-nc-id="StayCard"
      >
        <div className="relative w-full">
          <GallerySlider
            uniqueID={`StayCard_${event?.id}`}
            ratioClass="aspect-w-4 aspect-h-3 "
            galleryImgs={event?.event?.galleries}
            href={`events/${event?.event_id}`}
            galleryClass={"default"}
            imageClass="rounded-lg"
          />
          <BtnLikeIcon
            isLiked={like}
            className="absolute right-3 top-3 z-[1]"
            event={event}
            refetchWishList={refetchWishList}
            wishlistEvents={wishlistEvents}
            user={user}
          />
        </div>
        <div onClick={_handleRedirect}>
          <div className={"space-y-4 p-4"}>
            <div className={"space-y-2"}>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {event?.event?.display_date}
              </span>
              <div className="flex items-center space-x-2">
                <h2 className="font-semibold capitalize text-neutral-900 dark:text-white text-base">
                  <span className="line-clamp-1">
                    {event?.event?.detail?.name}
                  </span>
                </h2>
              </div>
              <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5 ">
                <span className="line-clamp-1">
                  {event?.event?.venue?.detail?.address}
                </span>
              </div>
            </div>
            <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
            <div className="flex justify-between items-center">
              <span className="text-[10px]">
                price from
                <span className="text-md text-black dark:text-neutral-400 font-semibold ">
                  &nbsp;&nbsp; {event?.event?.currency}{" "}
                  {event?.event?.price_starts_from}
                </span>
              </span>
              {/* {/* {!!reviewStart && ( */}
              {/* <StartRating reviewCount={4} point={5} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishListCard2;
