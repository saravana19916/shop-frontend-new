"use client";
import React, { FC, useEffect, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import Link from "next/link";
import MenuItem from "@/model/MenuItem";
import { useTranslation } from "react-i18next";

export interface DropdownTravelersProps {
  title: string;
  menuItems: MenuItem[];
}

const DropdownTravelers: FC<DropdownTravelersProps> = ({
  title = "",
  menuItems = [],
}) => {
  const { t } = useTranslation();
  return (
    <Popover className="DropdownTravelers relative flex px-4">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`${open ? "" : "text-opacity-100"}
                group self-center py-2 h-10 sm:h-12 rounded-md text-sm sm:text-base hover:text-opacity-100 focus:outline-none`}
          >
            <div
              className={` inline-flex items-center font-medium `}
              role="button"
              id={open ? "headlessUiButtonOpen" : ""}
            >
              <span>{t(title)}</span>
              <ChevronDownIcon
                className={`${open ? "-rotate-180" : "text-opacity-70 "}
                  ml-2 mt-0.5 text-neutral-700 group-hover:text-opacity-80 transition ease-in-out duration-150 h-auto w-4 dark:text-white`}
                aria-hidden="true"
              />
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-40 w-screen max-w-xs px-4 top-full transform -translate-x-1/2 left-1/2 sm:px-0">
              <div className="overflow-hidden rounded-2xl shadow ring-2 ring-black ring-opacity-5">
                <div className="relative grid grid-cols-1 gap-7 bg-white dark:bg-neutral-800 p-7 ">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => close()}
                      className={`flex items-center p-1 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${
                        item.active ? "bg-neutral-100 dark:bg-neutral-700" : ""
                      }`}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 bg-primary-6000 rounded-md text-white sm:h-12 sm:w-12">
                        <item.icon aria-hidden="true" />
                      </div>
                      <div className="ml-4 space-y-0.5">
                        <p className="text-sm font-medium ">{t(item.name)}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-300">
                          {t(item.description)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default DropdownTravelers;
