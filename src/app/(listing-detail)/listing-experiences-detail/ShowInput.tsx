"use client";

import React, { Fragment, FC, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import NcInputNumber from "@/components/NcInputNumber";
import { ClockIcon, TicketIcon } from "@heroicons/react/24/outline";
import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";
import { GuestsObject } from "@/app/(client-components)/type";
import { IPerformance } from "@/model/IEventDetail";
import moment from "moment";
import { useTranslation } from "react-i18next";

export interface ShowInputProps {
  className?: string;
  title?: string;
  subTitle?: string;
  performances?: IPerformance[];
  onSelectShow?: any;
}

const ShowInput: FC<ShowInputProps> = ({
  className = "flex-1",
  title,
  subTitle,
  performances,
  onSelectShow,
}) => {
  const [selectedShow, setSelectedShow] = useState("");
  const [selectedShowId, setSelectedShowId] = useState(0);
  const handleShow = (value) => {
    onSelectShow(value);
    setSelectedShowId(value.id);
    setSelectedShow(
      moment(value.start_date).format("h:mm a") +
        " to " +
        moment(value.end_date).format("h:mm a")
    );
  };
  const { t } = useTranslation();
  return (
    <Popover className={`flex relative ${className}`}>
      {({ open, close }) => (
        <>
          <div
            className={`flex-1 flex items-center focus:outline-none rounded-b-3xl ${
              open ? "shadow-lg" : ""
            }`}
          >
            <Popover.Button
              className={`relative z-10 flex-1 flex text-left items-center p-3 space-x-3 focus:outline-none`}
            >
              <div className="text-neutral-700 dark:text-neutral-400">
                <ClockIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="flex-grow">
                <span className={`block xl:text-lg font-semibold `}>
                  {/* {totalGuests ? "Guests" : "Add guests"} */}
                  {t(title)}
                </span>
                <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                  {/* {totalGuests ? "Guests" : "Add guests"} */}
                  {t(subTitle)}
                </span>
              </div>
            </Popover.Button>
          </div>
          {performances?.length ? (
            <>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-20 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black ring-opacity-5 ">
                  <div className="flex flex-col gap-2">
                    {performances.map((value, index) => {
                      return (
                        <>
                          <span
                            key={value.id}
                            className={
                              "font-medium text-neutral-800 hover:bg-red-200  rounded-2xl dark:hover:bg-primary-6000 px-4 dark:text-neutral-200 py-2 cursor-pointer" +
                              (value.id == selectedShowId
                                ? " dark:bg-primary-6000 bg-red-200"
                                : "")
                            }
                            onClick={() => {
                              handleShow(value);
                              close();
                            }}
                          >
                            {moment(value.start_date).format("h:mm a") +
                              " to " +
                              moment(value.end_date).format("h:mm a")}
                          </span>
                        </>
                      );
                    })}
                  </div>
                  {/* <NcInputNumber
                className="w-full"
                max={10}
                min={1}
                label="Adults"
                desc="Ages 13 or above"
              />
              <NcInputNumber
                className="w-full mt-6"
                max={4}
                label="Children"
                desc="Ages 2–12"
              />

              <NcInputNumber
                className="w-full mt-6"
                max={4}
                label="Infants"
                desc="Ages 0–2"
              /> */}
                </Popover.Panel>
              </Transition>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </Popover>
  );
};

export default ShowInput;
