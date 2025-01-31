"use client";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  CurrencyDollarIcon,
  CurrencyBangladeshiIcon,
  CurrencyEuroIcon,
  CurrencyPoundIcon,
  CurrencyRupeeIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";

export const headerCurrency = [
  {
    id: "AED",
    name: "AED",

    icon: CurrencyRupeeIcon,
  },
  {
    id: "EUR",
    name: "EUR",

    icon: CurrencyEuroIcon,
  },
  {
    id: "USD",
    name: "USD",

    icon: CurrencyDollarIcon,
  },
  {
    id: "GBP",
    name: "GBP",

    icon: CurrencyBangladeshiIcon,
  },
  {
    id: "SAR",
    name: "SAR",

    icon: CurrencyPoundIcon,
  },
  {
    id: "QAR",
    name: "QAR",

    icon: CurrencyRupeeIcon,
  },
];

export default function CurrencyDropdown() {
  const [activeCurrency, setActiveCurrency] = useState("AED");
  const handleCurrencyChange = (currencyCode: string, close: () => void) => {
    setActiveCurrency(currencyCode);
    localStorage.setItem("currency", currencyCode);
    close();
  };
  useEffect(() => {
    const currency = localStorage.getItem("currency") || "AED";
    setActiveCurrency(currency);
  }, []);
  return (
    <div className="CurrencyDropdown">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              id={open ? "headlessUiButtonOpen" : ""}
              className={`
                ${open ? "" : "text-opacity-80"}
                group px-3 py-1.5 border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <BanknotesIcon className="w-6 h-6" />
              <span className="ml-2 select-none">Currency</span>
              <ChevronDownIcon
                className={`${open ? "-rotate-180" : "text-opacity-70"}
                  ml-2 h-4 w-4  group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
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
              <Popover.Panel className="absolute z-10 w-screen max-w-[140px] px-4 mt-4 right-0 sm:px-0">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-7 bg-white dark:bg-neutral-800 p-7">
                    {headerCurrency.map((item, index) => (
                      <span
                        key={index}
                        onClick={() => handleCurrencyChange(item.id, close)}
                        className={`flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${
                          activeCurrency === item.id
                            ? "bg-gray-100 dark:bg-neutral-700"
                            : "opacity-80"
                        }`}
                      >
                        <item.icon className="w-[18px] h-[18px] " />
                        <p className="ml-2 text-sm font-medium ">{item.name}</p>
                      </span>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
