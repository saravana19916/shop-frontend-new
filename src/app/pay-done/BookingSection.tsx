import { IEventDetails } from "@/model/IEventDetail";
import placeHolderImg from "@/images/placeholder-small.png";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";

import moment from "moment";
import SelectedDate from "../checkout/[encrypted_purchase_session_id]/SelectedDate";
import SelectedShowTime from "../checkout/[encrypted_purchase_session_id]/SelectedShowTime";
import SelectedTicketCategory from "../checkout/[encrypted_purchase_session_id]/SelectedTicketCategory";
import OptionalAddons from "../checkout/[encrypted_purchase_session_id]/OptionalAddons";
import PayDoneOptionalAddons from "./PayDoneOptionalAddons";
import CardForSelectedTicket from "./CardForSelectedTicket";
interface IProps {
  eventDetail: IEventDetails;
  selectedPerformances;
  optionalAddons;
}
const BookingSection: FC<IProps> = ({
  eventDetail,
  selectedPerformances,
  optionalAddons,
}) => {
  const thumbnailURL = process.env.AWS_CLOUD_FRONT_URL + "images/events/";
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  useEffect(() => {
    if (selectedPerformances?.start_date) {
      setSelectedDate(selectedPerformances?.start_date);
    }
  }, [selectedPerformances]);
  const currentImage = eventDetail?.data?.galleries[0]?.img_name
    ? thumbnailURL + eventDetail?.data?.galleries[0]?.img_name
    : placeHolderImg;
  const totalQuantity = selectedPerformances?.tickets.reduce(
    (sum, item) => sum + item.ticket.quantity,
    0
  );
  return (
    <>
      <h3 className="text-2xl font-semibold">Your Booking</h3>
      <div className="pt-1 pb-2">
        {selectedPerformances?.tickets
          ?.filter((ticket) => ticket?.ticket?.quantity)
          ?.map((ticket) => (
            <>
              <CardForSelectedTicket
                currentImage={currentImage}
                quantity={ticket?.ticket?.quantity}
                ticketType={ticket?.ticket?.identifier}
                eventName={eventDetail?.data?.detail?.name}
                date={selectedPerformances?.start_date}
              />
            </>
          ))}
      </div>

      {/* <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="flex-shrink-0 w-full sm:w-40">
          <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
            <Image fill alt="" className="object-cover" src={currentImage} />
          </div>
        </div>
        <div className="pt-5  sm:pb-5 sm:px-5 space-y-3">
          <div>
            <span
              className={
                "text-sm text-neutral-500 dark:text-neutral-400 line flex items-center gap-1"
              }
            >
              <span>{eventDetail?.data?.display_date}</span>
            </span>
            <span className="text-xl font-semibold">
              {eventDetail?.data?.detail?.name || ""}
            </span>
            <span className="block mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              {eventDetail?.data?.venue?.detail?.address || ""}
            </span>
          </div>
        </div>
      </div> */}
      {/* <div>
        <div className="mt-3 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 w-full">
          <SelectedDate
            padding="md:p-5 p-4"
            eventDetail={eventDetail}
            selectedDate={selectedDate}
            hideEdit
          />
        </div>
        <div className="mt-3 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 w-full">
          <SelectedShowTime
            selectedPerformances={selectedPerformances}
            padding="md:p-5 p-4"
            eventDetail={eventDetail}
            hideEdit
          />
        </div>
        <div className="mt-3 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 w-full">
          <SelectedTicketCategory
            selectedPerformances={selectedPerformances}
            padding="md:p-5 p-4"
            hideEdit
          />
        </div>
      </div> */}
      <div>
        <PayDoneOptionalAddons
          optionalAddons={optionalAddons}
          padding="p-5"
          width="w-full"
          paymentCurrency={
            selectedPerformances?.tickets[0]?.ticket?.payment_currency
          }
          hideUnSelected
          ticketsCount={totalQuantity}
        />
      </div>
    </>
  );
};

export default BookingSection;
