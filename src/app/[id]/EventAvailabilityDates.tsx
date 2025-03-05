"use client";
import { IEventDetails } from "@/model/IEventDetail";
import React, { Fragment, FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePicker from "react-datepicker";
import orderServices from "@/services/order.services";

interface IEventAvailabilityDates {
  eventDetail: IEventDetails;
}
const EventAvailabilityDates: FC<IEventAvailabilityDates> = ({
  eventDetail,
}) => {
  const [enableDates, setEnableDates] = useState([]);

  const { t } = useTranslation();
  const showsStartDate = new Date();
  const showsEndDate = new Date();
  useEffect(() => {
    setEnableDates(
      orderServices.getAllPerformancesDates(eventDetail?.data?.performances)
    );
  }, [eventDetail]);
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <>
      <div className="listingSection__wrap !space-y-6">
        {eventDetail?.data?.id > 0 ? (
          <>
            <div>
              <h2 className="text-2xl font-semibold">Availability</h2>
              <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                {t("pricesMayIncreaseOnWeekendsOrHolidays")}
              </span>
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <br />
            <DatePicker
              onChange={(date) => {}}
              monthsShown={2}
              showPopperArrow={false}
              inline
              // minDate={new Date(moment(showsStartDate).format("YYYY-MM-01"))}
              // maxDate={
              //   new Date(
              //     moment(showsEndDate).format("YYYY-MM-") +
              //       moment(showsEndDate).daysInMonth()
              //   )
              // }
              showDisabledMonthNavigation={false}
              includeDates={enableDates?.map((x) => new Date(x))}
              renderCustomHeader={(p) => (
                <DatePickerCustomHeaderTwoMonth {...p} />
              )}
              renderDayContents={(day, date) => {
                const isSelectedDate = moment(date).isSame(startDate, "day");
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
          </>
        ) : (
          <>
            <div className="h-3 w-2/12 rounded-md bg-gray-300 animate-pulse"></div>
            <div className="h-5 w-2/3 rounded-md bg-gray-300 animate-pulse"></div>
            <div className="h-96 w-full rounded-md bg-gray-300 animate-pulse"></div>
          </>
        )}
      </div>
    </>
  );
};

export default EventAvailabilityDates;
