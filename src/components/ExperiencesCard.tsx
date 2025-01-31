import React, { FC } from "react";
import GallerySlider from "@/components/GallerySlider";
import { ExperiencesDataType } from "@/data/types";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Link from "next/link";
import { MapPinIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { IEventType, Event, Data } from "@/model/IEventType";
import moment from "moment";
import { IWishListEvent } from "@/model/IWishListEvent";

export interface ExperiencesCardProps {
  className?: string;
  ratioClass?: string;
  data?: Event;
  size?: "default" | "small";
  saleOff?: number;
  like?: boolean;
  wishListEvents?: IWishListEvent[];
}

const ExperiencesCard: FC<ExperiencesCardProps> = ({
  size = "default",
  className = "",
  data,
  ratioClass = "aspect-w-3 aspect-h-3",
  saleOff = "100",
  like = false,
  wishListEvents,
}) => {
  const renderSliderGallery = () => {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden ">
        <GallerySlider
          uniqueID={`ExperiencesCard_${data.id}`}
          ratioClass={ratioClass}
          galleryImgs={data.galleries}
          href={`/${data.event?.slugified_identifier}`}
        />
        <BtnLikeIcon
          isLiked={like}
          className="absolute right-3 top-3"
          wishlistEvents={wishListEvents}
        />
        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="mt-4 px-2 truncate text-start pl-2">
        <div className="flex items-center gap-2">
          {
            <CalendarIcon className="w-4 h-4 text-neutral-6000 dark:text-neutral-400" />
          }
          <span
            className={`block text-sm text-neutral-6000 dark:text-neutral-400`}
          >
            {data?.event?.display_date}
          </span>
        </div>
        <h2
          className={`mt-1.5 text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate capitalize`}
        >
          {data?.detail?.name.toLowerCase()}
        </h2>
        <div className="mt-1.5 flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
          {<MapPinIcon className="w-4 h-4" />}
          <span className="truncate">
            {data?.event?.venue?.detail?.address}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ExperiencesCard group relative ${className}`}>
      {renderSliderGallery()}
      <Link href={"/"}>{renderContent()}</Link>
    </div>
  );
};

export default ExperiencesCard;
