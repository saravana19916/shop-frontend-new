import { IEventDetails, IPerformance } from "@/model/IEventDetail";
import React from "react";
import Image from "next/image";
import { CalendarIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import { TicketIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

interface IProps {
  selectedPerformances: IPerformance;
  eventDetail: IEventDetails;
  currentImage: any;
  addons: any;
  totalFee: number;
  paymentType: string;
  ref?: any;
}
const DownloadBookingDetails = (props: IProps) => {
  const getTicketCategory = (performance: IPerformance) => {
    let text = "";
    performance?.tickets.map((x) => {
      text += x.ticket.quantity + " " + x.ticket.identifier + " ,";
    });
    return (
      <span className="mt-1.5 text-lg font-semibold">
        {text.substring(0, text.length - 2)}
      </span>
    );
  };
  const { t } = useTranslation();
  return (
    <>
      <div className="w-full flex flex-col sm:rounded-2xl space-y-10 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          {t("congratulation")} 🎉
        </h2>

        <div
          className={"border-b border-neutral-200 dark:border-neutral-700"}
        ></div>

        {/* ------------------------ */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">{t("yourBooking")}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-shrink-0 w-full sm:w-40">
              <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                <Image
                  fill
                  alt=""
                  className="object-cover"
                  src={props.currentImage}
                />
              </div>
            </div>
            <div className="pt-5  sm:pb-5 sm:px-5 space-y-3">
              <div>
                <span
                  className={
                    "text-sm text-neutral-500 line-clamp-1 flex items-center gap-1"
                  }
                >
                  {<CalendarIcon className="w-4 h-4" />}
                  <span className="block mb-2">
                    {moment(props.selectedPerformances?.start_date).format(
                      "DD MMM YYYY"
                    )}
                  </span>
                </span>
                <span className="text-base font-medium mt-1 block">
                  {props.eventDetail?.data?.detail?.name || ""}
                </span>
              </div>
              <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                <i className="las la-map-marker-alt"></i>
                <span className="ml-1">
                  {" "}
                  {props.eventDetail?.data?.venue?.detail?.address || ""}
                </span>
              </span>
              {/* <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
              <StartRating /> */}
            </div>
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <div className="flex-1 p-5 flex space-x-4">
              <svg
                className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.33333 8.16667V3.5M18.6667 8.16667V3.5M8.16667 12.8333H19.8333M5.83333 24.5H22.1667C23.4553 24.5 24.5 23.4553 24.5 22.1667V8.16667C24.5 6.878 23.4553 5.83333 22.1667 5.83333H5.83333C4.54467 5.83333 3.5 6.878 3.5 8.16667V22.1667C3.5 23.4553 4.54467 24.5 5.83333 24.5Z"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">{t("date")}</span>
                <span className="mt-1.5 text-lg font-semibold">
                  {moment(props.selectedPerformances?.start_date).format(
                    "DD MMM YYYY"
                  )}
                </span>
              </div>
            </div>
            <div className="flex-1 p-5 flex space-x-4">
              <svg
                className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5.07987C14.8551 4.11105 16.1062 3.5 17.5 3.5C20.0773 3.5 22.1667 5.58934 22.1667 8.16667C22.1667 10.744 20.0773 12.8333 17.5 12.8333C16.1062 12.8333 14.8551 12.2223 14 11.2535M17.5 24.5H3.5V23.3333C3.5 19.4673 6.63401 16.3333 10.5 16.3333C14.366 16.3333 17.5 19.4673 17.5 23.3333V24.5ZM17.5 24.5H24.5V23.3333C24.5 19.4673 21.366 16.3333 17.5 16.3333C16.225 16.3333 15.0296 16.6742 14 17.2698M15.1667 8.16667C15.1667 10.744 13.0773 12.8333 10.5 12.8333C7.92267 12.8333 5.83333 10.744 5.83333 8.16667C5.83333 5.58934 7.92267 3.5 10.5 3.5C13.0773 3.5 15.1667 5.58934 15.1667 8.16667Z"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">
                  {t("ticketCategory")}
                </span>
                {/* <span className="mt-1.5 text-lg font-semibold">3 Guests</span> */}
                {getTicketCategory(props.selectedPerformances)}
              </div>
            </div>
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <div className="flex-1 p-5 flex space-x-4">
              <TicketIcon className="w-5 h-5 lg:w-7 lg:h-7 text-neutral-300 dark:text-neutral-400" />

              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">
                  {t("showTime")}
                </span>
                <span className="mt-1.5 text-lg font-semibold">
                  {moment(props.selectedPerformances?.start_date).format(
                    "h:mm a"
                  ) +
                    " to " +
                    moment(props.selectedPerformances?.end_date).format(
                      "h:mm a"
                    )}
                </span>
              </div>
            </div>
            <div className="flex-1 p-5 flex space-x-4">
              <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7 text-neutral-300 dark:text-neutral-400" />

              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">{t("add-ons")}</span>
                <span className="mt-1.5 text-lg font-semibold">
                  <span className="line-clamp-1">
                    {props.addons &&
                    props.addons.insure &&
                    props.addons.insure.quantity ? (
                      <>Insure {props.addons.insure.quantity}</>
                    ) : (
                      <>Insure 0</>
                    )}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------ */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">{t("bookingDetail")}</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">{t("bookingCode")}</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                #222-333-111
              </span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">{t("date")}</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {moment(props.selectedPerformances?.start_date).format(
                  "DD MMM YYYY"
                )}
              </span>
              {/* <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {moment(eventDetail?.data?.updated_date).format("DD MMM YYYY")}
              </span> */}
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">{t("total")}</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {
                  props.selectedPerformances?.tickets[0]?.ticket
                    ?.payment_currency
                }{" "}
                {props.totalFee}{" "}
              </span>
            </div>
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">{t("paymentMethod")}</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {props.paymentType ? props.paymentType : "--"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadBookingDetails;
