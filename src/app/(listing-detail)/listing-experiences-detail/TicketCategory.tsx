"use client";

import { FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import NcInputNumber from "@/components/NcInputNumber";
import { TicketIcon } from "@heroicons/react/24/outline";
import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";
import { GuestsObject } from "@/app/(client-components)/type";

export interface TicketCategoryProps {
  className?: string;
  title?: string;
  subTitle?: string;
}

const TicketCategory: FC<TicketCategoryProps> = ({
  className = "flex-1",
  title,
  subTitle,
}) => {
  return (
    <Popover className={`flex relative ${className}`}>
      {({ open }) => (
        <>
          <div
            className={`flex-1 flex items-center focus:outline-none rounded-b-3xl ${
              open ? "shadow-lg" : ""
            }`}
          >
            <Popover.Button
              className={`relative z-10 flex-1 flex text-left items-center p-3 space-x-3 focus:outline-none`}
            >
              <div className="text-neutral-300 dark:text-neutral-400">
                <TicketIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="flex-grow">
                <span className="block xl:text-lg font-semibold">
                  {/* {totalGuests ? "Guests" : "Add guests"} */}
                  {title}
                </span>
                <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                  {/* {totalGuests ? "Guests" : "Add guests"} */}
                  {subTitle}
                </span>
              </div>
            </Popover.Button>
          </div>
        </>
      )}
    </Popover>
  );
};
export default TicketCategory;
