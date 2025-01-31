import { IEventDetails, IPerformance } from "@/model/IEventDetail";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePicker from "react-datepicker";
import React, { FC, Fragment, useEffect, useState } from "react";
import orderServices from "@/services/order.services";

import { useTranslation } from "react-i18next";
import { IEventDetailResponse } from "@/queries/eventDetail.query";
interface ISelectedDateProps {
  eventDetail?: IEventDetailResponse;
  padding?: string;
  setSelectedDate?: (date: Date) => void;
  selectedDate?: Date | null;
  hideEdit?: boolean;
}
const SelectedDate: FC<ISelectedDateProps> = ({
  padding = "p-3",
  eventDetail,
  setSelectedDate,
  selectedDate,
  hideEdit,
}) => {
  const { t } = useTranslation();
  const [enableDates, setEnableDates] = useState([]);
  const [showsStartDate, setShowsStartDate] = useState<Date>(new Date());
  const [showsEndDate, setShowsEndDate] = useState<Date>(new Date());

  const handleChange = (selected) => {
    console.log(selected, "selected");
  };
  useEffect(() => {
    setEnableDates(
      orderServices.getAllPerformancesDates(eventDetail?.data?.performances)
    );
  }, [eventDetail]);
  return (
    <>
      <Popover className="z-30 relative flex-1 p-0.5 flex space-x-4">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`text-left flex-1 ${
                hideEdit ? "cursor-default" : ""
              } ${padding} px-5 flex justify-between space-x-5 focus:outline-none`}
              type="button"
            >
              <div className="flex space-x-4">
                <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                <span className="text-md mt-1 font-semibold">
                  {selectedDate
                    ? moment(selectedDate).format("DD MMM YYYY")
                    : null}
                </span>
              </div>
              {!hideEdit && (
                <>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </>
              )}{" "}
              {open}
            </Popover.Button>
            {!hideEdit && eventDetail && open && (
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
                  <Popover.Panel className="absolute left-auto sm:-translate-y-1/4 md:-translate-y-1/4 lg:-translate-y-1/4 xl:-translate-y-0 xl:-right-10 right-0 z-10 mt-3 top-full w-auto lg:w-screen px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-blue ring-opacity-50 bg-white dark:bg-neutral-800 lg:p-8 p-2">
                      <DatePicker
                        key={"initial"}
                        onChange={(date) => setSelectedDate(date)}
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
                            selectedDate,
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
                                backgroundColor: isSelectedDate
                                  ? "#D81C2B"
                                  : "",
                              }}
                            >
                              <DatePickerCustomDay
                                dayOfMonth={day}
                                date={date}
                              />
                            </div>
                          );
                        }}
                      />
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </>
        )}
      </Popover>
    </>
  );
};

export default SelectedDate;
