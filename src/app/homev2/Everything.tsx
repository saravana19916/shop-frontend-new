import React, { FC, useState } from "react";
import { TaxonomyType } from "@/data/types";
import Image from "next/image";
import { IWishListEvent } from "@/model/IWishListEvent";
import { Event } from "@/model/IEventType";
import everythingPng from "@/images/hero-right-3.png";

export interface EverythingProps {
  customClass?: string;
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categories?: TaxonomyType[];
  itemPerRow?: number;
  sliderStyle?: "style1" | "style2";
  tag?: "count" | "discount";
  eventList?: Event[];
  wishListEvents?: IWishListEvent[];
  refetchWishList?: () => void;
  user?: any;
}

const Everything: FC<EverythingProps> = ({
  customClass = "",
  className = "",
  itemClassName = "",
  heading = "",
  subHeading = "",
  categories = [],
  itemPerRow = 5,
  sliderStyle = "style1",
  eventList = [],
  tag,
  wishListEvents,
  refetchWishList,
  user,
}) => {
  const totalCards = Array.from({ length: 100 }, (_, i) => `Card ${i + 1}`);

  const CARDS_PER_ROW = itemPerRow;
  const INITIAL_ROWS = itemPerRow;

  const [visibleRows, setVisibleRows] = useState(INITIAL_ROWS);

  const visibleCards = visibleRows * CARDS_PER_ROW;

  // Show more rows when button is clicked
  const handleShowMore = () => {
    setVisibleRows((prevRows) => prevRows + 2); // Add 2 more rows
  };
  return (
    <div className="p-6">
      {/* Card Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${itemPerRow} gap-4`}
      >
        {totalCards.slice(0, visibleCards).map((card, index) => (
          <div
            key={index}
            className={`nc-LastChance flex flex-col cursor-pointer ${className}`}
            data-nc-id="LastChance"
          >
            <div
              className={`flex-shrink-0 relative w-full aspect-w-5 aspect-h-5 sm:aspect-h-6 h-0 rounded-2xl overflow-hidden group`}
            >
              <span className="absolute text-black text-xs bg-gray-50 w-20 h-8 z-20 flex items-center justify-center rounded-full left-3 top-3">
                listing
              </span>
              <div className="relative">
                <span className="absolute font-bold text-white text-xs z-20 text-center flex items-center justify-center rounded-lg right-3 top-3">
                  <i className="las la-heart text-4xl"></i>
                </span>
              </div>
              <Image
                src={everythingPng}
                className="object-cover w-full h-full rounded-2xl"
                fill
                alt="everything"
                sizes="(max-width: 400px) 100vw, 400px"
              />
            </div>
            <div className="mt-4 px-2 truncate">
              <span
                className={`block mt-1 text-xs text-primary-6000 dark:text-neutral-400 mb-2`}
              >
                24-26 Dec, 2023
              </span>
              <div className="relative group">
                <h2
                  className={`mt-1 text-md text-neutral-900 dark:text-neutral-100 font-bold truncate capitalize`}
                >
                  Cirque du Soleil Bazzar
                </h2>
              </div>
              <span
                className={`block mt-2 text-xs text-neutral-6000 dark:text-neutral-400`}
              >
                Du forum, Abu Dhabi, UAE
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {visibleCards < totalCards.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-white text-xs text-neutral-6000 rounded-full font-bold dark:text-neutral-400"
          >
            show me more
          </button>
        </div>
      )}
    </div>
  );
};

export default Everything;
