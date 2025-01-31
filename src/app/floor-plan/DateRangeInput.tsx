import React, { FC, useState, Fragment } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { Popover, Transition } from "@headlessui/react";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";

interface IDateRangeInputProps {
  eventStartDate?: Date;
  eventEndDate?: Date;
  selectDate?: Date;
  onSelectDate?: any;
  enableDates?: any;
  showsStartDate?: Date;
  showsEndDate?: Date;
}
const DateRangeInput: FC<IDateRangeInputProps> = ({
  eventStartDate,
  eventEndDate,
  selectDate,
  onSelectDate,
  enableDates,
  showsEndDate,
  showsStartDate,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const handleChange = (selected) => {
    onSelectDate(selected);
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
                {moment(selectDate).format("MMM DD, YYYY")} -{" "}
                {moment(selectDate).format("dddd")}
              </>
            ) : (
              <>
                {moment(eventStartDate).format("MMM DD") || "Add dates"}-
                {moment(eventEndDate).format("MMM DD") || ""}
              </>
            )}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {t("selectEventDate")}
          </span>
        </div>
      </>
    );
  };
  return (
    <>
      <Popover
        className={`StayDatesRangeInput z-10 relative flex flex-1 z-[11]`}
      >
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex-1 flex relative p-3 items-center space-x-3 focus:outline-none ${
                open ? "shadow-lg" : ""
              }`}
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
              <Popover.Panel className="absolute left-auto xl:-right-10 right-0 z-10 mt-3 top-full w-auto lg:w-screen px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-blue ring-opacity-50 bg-white dark:bg-neutral-800 p-8">
                  <DatePicker
                    // selected={startDate}
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
                            backgroundColor: isSelectedDate ? "#D81C2B" : "",
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

export default DateRangeInput;
