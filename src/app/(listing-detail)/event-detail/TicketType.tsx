import { IEventDetails } from "@/model/IEventDetail";
import React, { Fragment, FC, useState } from "react";
import { Popover, Transition } from "@headlessui/react";

import NcInputNumber from "@/components/NcInputNumber";
import { PiReceiptLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";

interface ITicketTypeProps {
  className: string;
  title: string;
  subTitle: string;
  ticketType: any;
  onSelectTicketType: (value: any) => void;
  selectedType: any;
}
const TicketType: FC<ITicketTypeProps> = ({
  className = "flex-1",
  title,
  subTitle,
  ticketType,
  onSelectTicketType,
  selectedType,
}) => {
  const handleOnChange = (value) => onSelectTicketType(value);
  const { t } = useTranslation();
  return (
    <>
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
                  <div className="text-neutral-700 dark:text-neutral-400">
                    {
                      PiReceiptLight({
                        className: "w-5 h-5 lg:w-7 lg:h-7",
                      }) as JSX.Element
                    }
                  </div>
                </div>
                <div className="flex-grow">
                  <span className="block xl:text-lg font-semibold">
                    {t(title)}
                  </span>
                  <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                    {t(subTitle)}
                  </span>
                </div>
              </Popover.Button>
            </div>

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
                  {ticketType.map((value, index) => {
                    return (
                      <>
                        <span
                          key={value.value}
                          className={`font-medium text-neutral-800 hover:bg-red-200 dark:hover:bg-primary-6000 px-4 dark:text-neutral-200 py-2 cursor-pointer ${
                            value.value == selectedType?.value
                              ? `dark:bg-primary-6000 bg-red-200`
                              : ""
                          }`}
                          onClick={() => {
                            close();
                            handleOnChange(value);
                          }}
                        >
                          {value.label}
                        </span>
                      </>
                    );
                  })}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

export default TicketType;
