"use client";

import React, { Fragment, useState, FC, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePicker from "react-datepicker";
import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";
import moment from "moment";
import { IEventData } from "@/model/IEventDetail";
import { useTranslation } from "react-i18next";

export interface StayDatesRangeInputProps {
  className?: string;
  eventStartDate?: Date;
  eventEndDate?: Date;
  selectDate?: Date;
  onSelectDate?: any;
  enableDates?: any;
  showsStartDate?: Date;
  showsEndDate?: Date;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "flex-1",
  eventStartDate,
  eventEndDate,
  selectDate,
  onSelectDate,
  enableDates,
  showsStartDate = new Date(),
  showsEndDate = new Date(),
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(selectDate);

  const handleChange = (selected) => {
    onSelectDate(selected);
    setSelectedDate(selected);
  };
  const { t } = useTranslation();
  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-700 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {selectDate ? (
              <>
                <span>
                  {moment(selectDate).format("MMM DD, YYYY")} -{" "}
                  {moment(selectDate).format("dddd")}
                </span>
              </>
            ) : (
              <>
                <span>{t("showDate")}</span>
              </>
            )}
            {/* {startDate?.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            }) || "Add dates"}
            {endDate
              ? " - " +
                endDate?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })
              : ""} */}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {t("selectEventDate")}
          </span>
        </div>
      </>
    );
  };
  // useEffect(() => {
  //   setSelectedDate(eventStartDate);
  // }, []);
  return (
    <>
      <Popover
        className={`StayDatesRangeInput z-10 relative flex ${className}`}
      >
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex-1 flex relative p-3 items-center space-x-3 focus:outline-none`}
            >
              {renderInput()}
              {eventStartDate && open}
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
              <Popover.Panel className="absolute left-auto sm:-translate-y-1/4 md:-translate-y-1/4 lg:-translate-y-1/4 xl:-translate-y-0 xl:-right-10 right-0 z-10 mt-3 top-full w-auto lg:w-screen px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-blue ring-opacity-50 bg-white dark:bg-neutral-800 lg:p-8 p-2">
                  <DatePicker
                    // selected={startDate}
                    key={startDate?.getTime() || "initial"}
                    onChange={(date) => setStartDate(date)}
                    onSelect={(e) => {
                      handleChange(e);
                      close();
                    }}
                    monthsShown={2}
                    showPopperArrow={false}
                    inline
                    minDate={
                      new Date(moment(showsStartDate).format("YYYY-MM-01"))
                    }
                    maxDate={
                      new Date(
                        moment(showsEndDate).format("YYYY-MM-") +
                          moment(showsEndDate).daysInMonth()
                      )
                    }
                    showDisabledMonthNavigation={false}
                    includeDates={enableDates?.map((x) => new Date(x))}
                    renderCustomHeader={(p) => (
                      <DatePickerCustomHeaderTwoMonth {...p} />
                    )}
                    renderDayContents={(day, date) => {
                      const isSelectedDate = moment(date).isSame(
                        startDate,
                        "day"
                      );
                      const isEnableDate = enableDates.some((enableDate) =>
                        moment(date).isSame(enableDate, "day")
                      );
                      const opacity = isEnableDate ? 1 : 0.5;

                      return (
                        <div
                          className={`rounded-full cursor-pointer ${
                            isSelectedDate
                              ? "text-white"
                              : isEnableDate
                              ? " bg-red-200 dark:bg-red-200 dark:text-black"
                              : ""
                          }`}
                          style={{
                            opacity,
                            backgroundColor: isSelectedDate ? "#FF003E" : "",
                          }}
                        >
                          <DatePickerCustomDay dayOfMonth={day} date={date} />
                        </div>
                      );
                    }}
                  />
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

export default StayDatesRangeInput;
