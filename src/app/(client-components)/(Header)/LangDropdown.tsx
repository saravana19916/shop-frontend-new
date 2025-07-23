"use client";
import React, { FC, RefObject } from "react";
import { Popover, Tab, Transition } from "@headlessui/react";
import { BanknotesIcon, GlobeAltIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { headerCurrency } from "./CurrencyDropdown";
import { useTranslation } from "react-i18next";
import { closeNavbarCartDropDown } from "@/actions/NavBar";

export const headerLanguage = [
  {
    id: "english",
    name: "English",
    description: "United States",
  },
  {
    id: "french",
    name: "French",
    description: "France",
  },
  {
    id: "arabic",
    name: "Arabic",
    description: "Saudi Arabia",
  },
  {
    id: "german",
    name: "German",
    description: "Germany",
  },
  {
    id: "turkish",
    name: "Turkish",
    description: "Turkey",
  },
  // {
  //   id: "spanish",
  //   name: "Spanish",
  //   description: "Spain",
  // },
  // {
  //   id: "chinese",
  //   name: "Chinese",
  //   description: "China, Taiwan",
  // },
  // {
  //   id: "japanese",
  //   name: "Japanese",
  //   description: "Japan",
  // },
  // {
  //   id: "russian",
  //   name: "Russian",
  //   description: "Russia",
  // },
  // {
  //   id: "hindi",
  //   name: "Hindi",
  //   description: "India",
  // },
  // {
  //   id: "portuguese",
  //   name: "Portuguese",
  //   description: "Portugal",
  // },
  // {
  //   id: "italian",
  //   name: "Italian",
  //   description: "Italy",
  // },
];

interface LangDropdownProps {
  panelClassName?: string;
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
  dropdownRef?: RefObject<HTMLDivElement>;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const LangDropdown: FC<LangDropdownProps> = ({
  panelClassName = "top-full right-0 max-w-sm w-96",
  className = "hidden md:flex",
  isOpen,
  onToggle,
  dropdownRef,
}) => {
  const { i18n, t } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState<string>("english");
  const [activeCurrency, setActiveCurrency] = useState("AED");

  const handleLanguageChange = (langCode: string, close: () => void) => {
    i18n.changeLanguage(langCode);
    setActiveLanguage(langCode);
    localStorage.setItem("language", langCode);
    close();
    setTimeout(() => onToggle(), 0); // Sync with MainNav1 state
  };

  const handleCurrencyChange = (currencyCode: string, close: () => void) => {
    setActiveCurrency(currencyCode);
    localStorage.setItem("currency", currencyCode);
    close();
    setTimeout(() => onToggle(), 0); // Sync with MainNav1 state
  };

  useEffect(() => {
    const language = localStorage.getItem("language") || "english";
    const currency = localStorage.getItem("currency") || "AED";
    setActiveLanguage(language);
    i18n.changeLanguage(language);
    setActiveCurrency(currency);
  }, []);

  const _handleCloseCartPopover = () => {
    closeNavbarCartDropDown();
  };

  const renderLang = (close: () => void) => {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        {headerLanguage.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              handleLanguageChange(item.id, close);
            }}
            className={`flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${
              item.id === activeLanguage
                ? "bg-gray-100 dark:bg-gray-700"
                : "opacity-80"
            }`}
          >
            <div className="">
              <p className="text-sm font-medium ">{item.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCurr = (close: () => void) => {
    return (
      <div className="grid gap-7 lg:grid-cols-2">
        {headerCurrency.map((item, index) => (
          <span
            key={index}
            onClick={() => handleCurrencyChange(item.id, close)}
            className={`flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${
              activeCurrency === item.id
                ? "bg-gray-100 dark:bg-gray-700"
                : "opacity-80"
            }`}
          >
            <item.icon className="w-[18px] h-[18px] " />
            <p className="ml-2 text-sm font-medium ">{item.name}</p>
          </span>
        ))}
      </div>
    );
  };

  return (
    <Popover className={`LangDropdown relative ${className}`} ref={dropdownRef}>
      {({ close }) => (
        <>
          <Popover.Button
            onMouseEnter={_handleCloseCartPopover}
            className={`
              ${isOpen ? "" : "text-opacity-80"}
              group self-center h-10 sm:h-12 px-3 py-1.5 inline-flex items-center text-sm text-gray-800 dark:text-neutral-200 font-medium hover:text-opacity-100 focus:outline-none`}
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from triggering document-level handler
              onToggle();
            }}
          >
            <GlobeAltIcon className="w-6 h-6" />
            <span className="mx-1">/</span>
            <BanknotesIcon className="w-6 h-6" />
            <ChevronDownIcon
              className={`${
                isOpen ? "-rotate-180" : "text-opacity-70"
              } ml-1 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            show={isOpen}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className={`absolute z-20 ${panelClassName}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3 sm:p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5">
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-full bg-gray-100 dark:bg-slate-700 p-1">
                    {["language", "currency"].map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-full py-2 text-sm font-medium leading-5 text-gray-700",
                            "focus:outline-none focus:ring-0",
                            selected
                              ? "bg-white shadow"
                              : "text-gray-700 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-slate-900/40"
                          )
                        }
                      >
                        {t(category)}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-5">
                    <Tab.Panel
                      className={classNames(
                        "rounded-xl p-3",
                        "focus:outline-none focus:ring-0"
                      )}
                    >
                      {renderLang(close)}
                    </Tab.Panel>
                    <Tab.Panel
                      className={classNames(
                        "rounded-xl p-3",
                        "focus:outline-none focus:ring-0"
                      )}
                    >
                      {renderCurr(close)}
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default LangDropdown;