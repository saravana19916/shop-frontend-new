"use client";

import { Popover, Transition } from "@headlessui/react";
import Input from "@/shared/Input";
import React, { FC, Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  EventTypes,
  IEventType,
  Data,
  Event,
  IEventDataSetForSearch,
} from "@/model/IEventType";
import HomeService from "@/services/home.services";
import { useRouter } from "next/navigation";
import ReactSearchBox from "react-search-box";
import {
  ArrowLongRightIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { closeNavbarCartDropDown } from "@/actions/NavBar";
import { useQueryClient } from "@tanstack/react-query";
import { fetchHomeEvents } from "@/queries/eventsList.query";
import CustomSearchBox from "@/shared/CustomSearchBox";

interface Props {
  className?: string;
}
const capitalizeWords = (str) => {
  return str.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
};

const SearchDropdown: FC<Props> = ({ className = "" }) => {
  const inputRef = React.createRef<HTMLInputElement>();

  const { push } = useRouter();

  const events: Event[] = [];

  const [eventData1, setEventData1] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const [eventDataSet, setEventDataSet] = useState<IEventDataSetForSearch[]>(
    []
  );
  const [quickLinks, setQuickLinks] = useState<IEventDataSetForSearch[]>([]);
  const {
    data: hotEventList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["HOT_EVENTS"],
    queryFn: () => fetchHomeEvents("HOT_EVENTS"),
  });
  useEffect(() => {
    if (hotEventList) {
      const data = hotEventList?.data?.events?.map((event) => {
        return {
          key: `${event?.event?.slugified_identifier || ""}`,
          value: event?.event?.identifier?.toLowerCase(),
        };
      });
      const quickLinksData = hotEventList?.data?.events
        ?.slice(0, 3)
        ?.map((event) => {
          return {
            key: `${event?.event?.slugified_identifier || ""}`,
            value: event?.event?.identifier?.toLowerCase(),
          };
        });
      setQuickLinks(quickLinksData);
      setEventDataSet(data);
    }
  }, [hotEventList]);

  const _handleSelect = (event: any, close: () => void) => {
    const eventId = event.item.key;
    const eventName = event.item.value;
    if (eventId) push(`/${eventId}`);
    close();
  };
  const handleMouseEnter = () => {
    const element = document.getElementById("searchPopoverButton");
    if (element && element.classList.contains("show-popover-custom")) {
      return;
    } else {
      element.click();
    }
  };
  const _handleCloseCartPopover = () => {
    closeNavbarCartDropDown();
    setSearchEvents([]);
    handleMouseEnter();
  };
  const queryClient = useQueryClient();
  const [searchEvents, setSearchEvents] = useState<IEventDataSetForSearch[]>(
    []
  );
  const _handleSearchOnChange = (event) => {
    const value = event?.target?.value?.toLowerCase().trim();

    if (value) {
      const filteredEvents = eventDataSet.filter((event) =>
        event.value?.toLowerCase().includes(value)
      );
      setSearchEvents(filteredEvents);
    } else {
      setSearchEvents([]);
    }
  };
  return (
    <React.Fragment>
      <Popover
        className={`TemplatesDropdown hidden lg:block self-center ${className}`}
      >
        {({ open, close }) => {
          useEffect(() => {
            queryClient.setQueryData(["currentPopoverState"], open || false);
          }, [open]);

          return (
            <>
              <Popover.Button
                onMouseEnter={_handleCloseCartPopover}
                id="searchPopoverButton"
                className={`${
                  open ? "show-popover-custom" : "text-opacity-80"
                } group h-10 sm:h-12 py-1.5 inline-flex items-center text-sm text-gray-800 dark:text-slate-300 font-medium hover:text-opacity-100 focus:outline-none
          `}
              >
                <div
                  className={`self-center cursor-pointer text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center ${className}`}
                >
                  <MagnifyingGlassIcon className="w-6 h-6" aria-hidden="true" />
                </div>
              </Popover.Button>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-600 transform"
                enterFrom="opacity-0 -translate-y-6"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-400 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-6"
              >
                <Popover.Panel className="absolute z-20 top-full w-full inset-x-0">
                  <div className="bg-white dark:bg-neutral-900 ">
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-700 transform"
                      enterFrom="opacity-0 -translate-y-6"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-500 transform"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-6"
                    >
                      <div className="container pb-10">
                        <div className="text-neutral-700 dark:text-neutral-700">
                          <CustomSearchBox onChange={_handleSearchOnChange} />
                        </div>
                        {searchEvents?.length > 0 ? (
                          <>
                            <div className="mt-8">
                              <span className="text-sm text-gray-800 dark:text-slate-300 ">
                                Search Events
                              </span>
                              {searchEvents?.map((event) => (
                                <>
                                  <a
                                    className="flex gap-3 mt-4 hover:text-reddish-500 capitalize"
                                    href={`events/${event.key}`}
                                  >
                                    <ArrowLongRightIcon className="w-5 h-5 mt-0.5" />
                                    <span className="font-semibold">
                                      {event?.value}
                                    </span>
                                  </a>
                                </>
                              ))}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                        <div className="mt-8">
                          <span className="text-sm text-gray-800 dark:text-slate-300 ">
                            Quick Events
                          </span>
                          {quickLinks?.map((event) => (
                            <>
                              <a
                                className="flex gap-3 mt-4 hover:text-reddish-500 capitalize"
                                href={`events/${event.key}`}
                              >
                                <ArrowLongRightIcon className="w-5 h-5 mt-0.5" />
                                <span className="font-semibold">
                                  {event?.value}
                                </span>
                              </a>
                            </>
                          ))}
                        </div>
                      </div>
                    </Transition>
                  </div>
                  <div
                    className="bg-gray-100 opacity-20 backdrop-blur-lg"
                    style={{ minHeight: "90vh" }}
                    onMouseEnter={() => {
                      close();
                    }}
                  ></div>
                </Popover.Panel>
              </Transition>
            </>
          );
        }}
      </Popover>
    </React.Fragment>
  );
};

export default SearchDropdown;
