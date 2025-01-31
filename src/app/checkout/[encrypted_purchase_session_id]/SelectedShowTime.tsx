import { IEventDetails, IPerformance } from "@/model/IEventDetail";
import { ClockIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";

import moment from "moment";
import React, { FC, Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IEventDetailResponse } from "@/queries/eventDetail.query";
interface ISelectedShowTime {
  selectedPerformances: IPerformance;
  padding?: string;
  eventDetail?: IEventDetailResponse;
  selectDatePerformances?: IPerformance[];
  handlePerformanceOnChange?: (performance) => void;
  hideEdit?: boolean;
  selectedShowTime?: Date | string;
}
const SelectedShowTime: FC<ISelectedShowTime> = ({
  selectedPerformances,
  padding = "p-3",
  eventDetail,
  selectDatePerformances,
  handlePerformanceOnChange,
  hideEdit,
  selectedShowTime,
}) => {
  const { t } = useTranslation();
  const _handleOnClick = async (close: () => void, selectedPerformance) => {
    close();
    handlePerformanceOnChange && handlePerformanceOnChange(selectedPerformance);
  };
  return (
    <>
      <Popover className="z-20 relative flex-1 p-0.5 flex space-x-4">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`text-left flex-1 ${
                hideEdit ? "cursor-default" : ""
              } ${padding} px-5 flex justify-between space-x-5  focus:outline-none`}
              type="button"
            >
              <div className="flex space-x-4">
                <ClockIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                <span className="text-md mt-1 font-semibold">
                  {selectedPerformances?.start_date &&
                  selectedPerformances?.end_date ? (
                    <>
                      {moment(selectedPerformances?.start_date).format(
                        "h:mm a"
                      ) +
                        " to " +
                        moment(selectedPerformances?.end_date).format("h:mm a")}
                    </>
                  ) : (
                    <>Select Show Time</>
                  )}
                </span>
              </div>
              {!hideEdit && selectDatePerformances?.length > 0 && (
                <>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </>
              )}{" "}
              {open}
            </Popover.Button>
            {!hideEdit && eventDetail && selectDatePerformances?.length > 0 && (
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
                  <Popover.Panel className="absolute right-0 z-20 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black ring-opacity-5 ">
                    <div className="flex flex-col gap-2">
                      {selectDatePerformances?.map((performance) => (
                        <>
                          <span
                            key={performance.id}
                            className={`${
                              performance.start_date === selectedShowTime
                                ? "bg-red-200"
                                : ""
                            } font-medium text-md text-neutral-800 hover:bg-red-200 dark:hover:bg-primary-6000 px-4 dark:text-neutral-200 py-2 cursor-pointer rounded-2xl`}
                            onClick={() => _handleOnClick(close, performance)}
                          >
                            {moment(performance.start_date).format("h:mm a") +
                              " to " +
                              moment(performance.end_date).format("h:mm a")}
                          </span>
                        </>
                      ))}
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

export default SelectedShowTime;
