import React, { FC, Fragment, useState } from "react";
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";

export interface SectionDateRangeProps {
  eventStartDate?: Date;
  eventEndDate?: Date;
  selectDate?: Date;
  enableDates?: any;
  onSelectDate?: any;
}

const SectionDateRange: FC<SectionDateRangeProps> = ({
  eventStartDate,
  eventEndDate,
  selectDate,
  enableDates,
  onSelectDate,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(selectDate)
  );
  const handleChange = (selected) => {
    console.log("selected");
    onSelectDate(selected);
    setSelectedDate(selected);
  };

  const renderSectionCheckIndate = () => {
    return (
      <div className="listingSection__wrap overflow-hidden">
        {/* HEADING */}
        <div>
          {/* <h2 className="text-2xl font-semibold">Availability</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span> */}
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}

        <div className="">
          {/* <DatePicker
            selected={selectedDate}
            onChange={(date) => setStartDate(date)}
            onSelect={(e) => {
              handleChange(e);
            }}
            monthsShown={2}
            showPopperArrow={false}
            includeDates={enableDates.map((x) => {
              return new Date(x);
            })}
            inline
            renderCustomHeader={(p) => (
              <DatePickerCustomHeaderTwoMonth {...p} />
            )}
            renderDayContents={(day, date) => (
              <DatePickerCustomDay dayOfMonth={day} date={date} />
            )}
          /> */}
        </div>
      </div>
    );
  };

  return renderSectionCheckIndate();
};

export default SectionDateRange;
