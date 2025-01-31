"use client";

import React, { Fragment, FC, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import NcInputNumber from "@/components/NcInputNumber";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";
import { GuestsObject } from "@/app/(client-components)/type";
import { IEventDetails } from "@/model/IEventDetail";
import { useTranslation } from "react-i18next";

export interface GuestsInputProps {
  className?: string;
  title?: string;
  subTitle?: string;
  eventDetail?: IEventDetails;
  onSelectAddOn?: (value: any) => void;
  eventAddon?: any;
}

const GuestsInput: FC<GuestsInputProps> = ({
  className = "flex-1",
  title,
  subTitle,
  eventDetail,
  onSelectAddOn,
  eventAddon,
}) => {
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(2);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(1);
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(1);

  const addonsObj = { eventId: null, insure: { quantity: 0, cost: 0 } };

  const [addons, setAddons] = useState<any>(addonsObj);
  useEffect(() => {
    eventAddon && setAddons(eventAddon);
  }, [eventAddon]);

  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    let newValue = {
      guestAdults: guestAdultsInputValue,
      guestChildren: guestChildrenInputValue,
      guestInfants: guestInfantsInputValue,
    };
    if (type === "guestAdults") {
      setGuestAdultsInputValue(value);
      newValue.guestAdults = value;
    }
    if (type === "guestChildren") {
      setGuestChildrenInputValue(value);
      newValue.guestChildren = value;
    }
    if (type === "guestInfants") {
      setGuestInfantsInputValue(value);
      newValue.guestInfants = value;
    }
  };

  const handleOnChange = (value) => {
    const addOnData = {
      eventId: eventDetail.data.id,
      insure: {
        quantity: value,
        cost: eventDetail?.data?.insurance_value,
      },
    };
    onSelectAddOn(addOnData);
    setAddons(addOnData);
  };

  const totalGuests =
    guestChildrenInputValue + guestAdultsInputValue + guestInfantsInputValue;
  const { t } = useTranslation();
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
              <div className="text-neutral-700 dark:text-neutral-400">
                <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="flex-grow">
                <span className="block xl:text-lg font-semibold">
                  {/* {totalGuests ? "Guests" : "Add guests"} */}
                  {t(title)}
                </span>
                <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                  {/* {totalGuests ? "Guests" : "Add guests"} */}
                  {t(subTitle)}
                </span>
              </div>

              {!!totalGuests && open && (
                <ClearDataButton
                  onClick={() => {
                    setGuestAdultsInputValue(0);
                    setGuestChildrenInputValue(0);
                    setGuestInfantsInputValue(0);
                  }}
                />
              )}
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
              <div className="flex items-center mb-4">
                <NcInputNumber
                  key={"insure"}
                  className="w-full"
                  defaultValue={0}
                  min={0}
                  initialValue={addons?.insure?.quantity || 0}
                  label={`Insure - ${
                    eventDetail?.data?.insurance_value || ""
                  } ${
                    eventDetail?.data?.performances[0]?.tickets[0]?.ticket
                      ?.payment_currency || ""
                  }`}
                  iconClass="la la-info-circle text-xl"
                  insuredescription={
                    eventDetail?.data?.detail?.insurance_description
                  }
                  onChange={(value) => {
                    handleOnChange(value);
                  }}
                />
                {/* <input type="checkbox" value="" className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="default-checkbox" className="ml-2 font-medium text-neutral-800 dark:text-neutral-200">Insure</label> */}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default GuestsInput;
