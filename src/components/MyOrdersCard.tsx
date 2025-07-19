"use client";

import ButtonSecondary from "@/shared/ButtonSecondary";
import { convertSankCaseToNormalCase } from "@/utils/helpers";
import placeHolderImg from "@/images/placeholder-small.png";

import moment from "moment";
import React, { FC, useState } from "react";
import RequestRefundModal from "./RequestRefundModal";

export interface MyOrdersCard {
  className?: string;
  ticket: any;
}

const MyOrdersCard: FC<MyOrdersCard> = ({ className = "", ticket }) => {
  const [isOpen, setIsOpen] = useState(false);
  const thumbnailURL = process.env.AWS_CLOUD_FRONT_URL + "images/events/";
  const currentImage: any = ticket?.event?.galleries[0]?.img_name
    ? thumbnailURL + ticket?.event?.galleries[0]?.img_name
    : placeHolderImg;

  function categorizeTickets(data) {
    // Create a map to hold the grouped ticket data
    const ticketMap = {};

    // Iterate over each item in the data array
    data.forEach((item) => {
      const identifier = item.ticket?.identifier;
      const price = item.ticket?.price;
      const currency = item.ticket?.currency;
      const serviceFee = item.ticket?.service_fee || 0;
      const processFee = item.ticket?.process_fee || 0;

      // If the identifier exists in the map, update the quantity and price
      if (identifier) {
        if (ticketMap[identifier]) {
          ticketMap[identifier].quantity += 1;
        } else {
          ticketMap[identifier] = {
            identifier,
            quantity: 1,
            price_per_item: price,
            serviceFee,
            processFee,
            currency,
          };
        }
      }
    });

    // Convert the map to an array of objects
    return Object.values(ticketMap);
  }

  const renderDetailTop = () => {
    const ticketCategory: any = categorizeTickets(ticket?.orderdetails);
    let totalServiceFee = 0;
    let totalProcessFee = 0;
    let totalPrice = 0;
    ticketCategory?.forEach((item) => {
      // Calculate service fee for each item
      totalServiceFee += parseFloat(item.serviceFee) * item.quantity;

      // Calculate process fee for each item
      totalProcessFee += parseFloat(item.processFee) * item.quantity;

      // Calculate total fee (price per item * quantity)
      totalPrice +=
        parseFloat(item.price_per_item) * item.quantity +
        totalServiceFee +
        totalProcessFee;
    });

    let vat = totalPrice * (5 / 100);
    let totalFee = totalPrice + vat;
    const currency = ticketCategory?.[0]?.currency || "";
    return (
      <div>
        <div className="flex flex-col md:flex-row ">
          <div className="flex my-5 md:my-0 lg:w-1/2 w-full">
            <div className="w-16 md:w-10 lg:w-16 flex-shrink-0 md:pt-7 hidden lg:block"></div>
            <div className="w-full px-4 md:px-0">
              <h2 className="text-lg font-bold mb-7">Transaction Summary</h2>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Name</span>
                  <span>{ticket?.orderdetails[0]?.name_on_ticket}</span>
                </div>
                <div className="flex justify-between">
                  <span>Booking Code</span>
                  <span>{ticket?.number}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date</span>
                  <span>
                    {ticket?.orderdetails[0]?.performance?.start_date
                      ? moment(
                          ticket?.orderdetails[0]?.performance?.start_date
                        )?.format("DD MMM YYYY")
                      : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span>
                    {convertSankCaseToNormalCase(ticket?.payment_type)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>
                    {ticket?.orderdetails?.[0]?.ticket?.currency}{" "}
                    {ticket?.total_price}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-l border-neutral-200 dark:border-neutral-700 md:mx-6 lg:mx-10"></div>
          <div className="flex my-5 md:my-0 lg:w-1/2 w-full">
            <div className="px-4 md:px-8 w-full">
              <h2 className="text-lg font-bold mb-7">Order Details</h2>
              <div className="space-y-1">
                {ticketCategory?.map((order: any) => (
                  <>
                    <div className="flex justify-between text-neutral-600 font-medium">
                      <span className="text-neutral-6000 dark:text-neutral-400">
                        {order?.quantity}&nbsp; x &nbsp; {order?.identifier}
                      </span>
                      <span className="text-neutral-6000 dark:text-neutral-400">
                        {order?.currency}{" "}
                        {(order?.quantity * order?.price_per_item).toFixed(2)}
                      </span>
                    </div>
                  </>
                ))}
              </div>
              <div className="border border-b text-neutral-600 my-4"></div>
              <div className="space-y-1">
                <div className="flex justify-between text-neutral-600 font-medium">
                  <span className="text-neutral-6000 dark:text-neutral-400">
                    Process Fee
                  </span>
                  <span className="text-neutral-6000 dark:text-neutral-400">
                    {currency} {totalProcessFee?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600 font-medium">
                  <span className="text-neutral-6000 dark:text-neutral-400">
                    Service Charge
                  </span>
                  <span className="text-neutral-6000 dark:text-neutral-400">
                    {currency} {totalServiceFee?.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="border border-b text-neutral-600 my-4"></div>
              <div className="space-y-1">
                <div className="flex justify-between text-neutral-600 font-medium">
                  <span className="w-3/5 flex justify-between">
                    <span className="text-neutral-6000 dark:text-neutral-400">
                      VAT
                    </span>{" "}
                    <span className="text-neutral-6000 dark:text-neutral-400">
                      5%
                    </span>
                  </span>
                  <span className="text-neutral-6000 dark:text-neutral-400">
                    {currency} {vat?.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="border border-b text-neutral-600 my-4"></div>
              <div className="space-y-1 mb-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    {currency} {totalFee?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDetail = () => {
    const performanceDate = ticket?.orderdetails?.[0]?.performance;
    const handleAddToCalendar = () => {
      const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        ticket?.event?.identifier || ""
      )}&dates=${moment(performanceDate?.start_date).format(
        "YYYYMMDDTHHmmss"
      )}/${moment(performanceDate?.end_date).format("YYYYMMDDTHHmmss")}`;

      window.open(googleCalendarUrl, "_blank");
    };
    const handleAddToWallet = () => {
      window.open("https://wallet.google/", "_blank");
    };

    const [showRequestRefundModal, setShowRequestRefundModal] =
      useState<boolean>(false);

    const handleRequestrefund = () => {
      setShowRequestRefundModal(true);
    };

    const handleRequestRefundModal = () =>
      setShowRequestRefundModal((prev) => !prev);

    if (!isOpen) return null;
    return (
      <>
        <RequestRefundModal
          show={showRequestRefundModal}
          handleClose={handleRequestRefundModal}
        />

        <div className="p-5 md:p-8 bg-neutral-100 dark:bg-neutral-600 dark:bg-opacity-20 rounded-lg ">
          {renderDetailTop()}
        </div>
        <div className="w-full lg:w-10/12 xl:w-9/12 flex flex-col sm:rounded-2xl space-y-10 px-0 ps-14 p-6">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <ButtonSecondary
              //   onClick={toPDF}
              rounded="rounded-full"
              sizeClass="w-full py-3 sm:px-4"
              // textColor="text-black"
              borderColor="border-0"
              bgColor="bg-neutral-100 dark:bg-neutral-600 dark:bg-opacity-20"
              fontWeight="font-semibold"
              fontSize="text-sm"
            >
              <span className="whitespace-nowrap">Download Booking</span>
            </ButtonSecondary>
            <ButtonSecondary
              onClick={handleAddToCalendar}
              rounded="rounded-full"
              sizeClass="w-full py-3 sm:px-4"
              // textColor="text-black"
              borderColor="border-0"
              fontWeight="font-semibold"
              bgColor="bg-neutral-100 dark:bg-neutral-600 dark:bg-opacity-20"
              fontSize="text-sm"
            >
              <span className="whitespace-nowrap"> Add to Calendar</span>
            </ButtonSecondary>
            <ButtonSecondary
              onClick={handleAddToWallet}
              rounded="rounded-full"
              sizeClass="w-full py-3 sm:px-4"
              borderColor="border-0"
              // textColor="text-black"
              fontWeight="font-semibold"
              bgColor="bg-neutral-100 dark:bg-neutral-600 dark:bg-opacity-20"
              fontSize="text-sm"
            >
              <span className="whitespace-nowrap">Add to Wallet</span>
            </ButtonSecondary>
            <ButtonSecondary
              onClick={handleRequestrefund}
              rounded="rounded-full"
              sizeClass="w-full py-3 sm:px-4"
              borderColor="border-0"
              fontWeight="font-semibold"
              bgColor="bg-neutral-100 dark:bg-neutral-600 dark:bg-opacity-20"
              fontSize="text-sm"
            >
              <span className="whitespace-nowrap">Request Refund</span>
            </ButtonSecondary>
            <ButtonSecondary
              onClick={() => {}}
              rounded="rounded-full"
              sizeClass="w-full py-3 sm:px-4"
              borderColor="border-0"
              fontWeight="font-semibold"
              bgColor="bg-neutral-100 dark:bg-neutral-600 dark:bg-opacity-20"
              fontSize="text-sm"
            >
              <span className="whitespace-nowrap">Chat with Organizer</span>
            </ButtonSecondary>
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className={`nc-FlightCardgroup p-4 sm:p-6 relative bg-white dark:bg-neutral-900 border border-neutral-300
     dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow space-y-6 ${className}`}
    >
      <div className={` sm:pr-20 relative  ${className}`}>
        <span
          className={`absolute right-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-10 h-10 bg-neutral-50 dark:bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer ${
            isOpen ? "transform -rotate-180" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="text-xl las la-angle-down"></i>
        </span>

        <div className="flex  flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0">
          {/* LOGO IMG */}
          <div className="w-24 lg:w-32 flex-shrink-0">
            <img
              src={currentImage}
              alt={`${ticket.event.identifier}`}
              className="w-16 h-16 object-cover rounded-xl aspect-square"
            />{" "}
            {/* <div className="w-16 h-16 bg-zinc-200 rounded-xl flex items-center justify-center"></div> */}
          </div>

          {/* FOR MOBILE RESPONSIVE */}
          <div className="flex-[4] lg:hidden space-y-1">
            <div className="flex font-semibold">{ticket.event.identifier}</div>

            <div className="text-sm text-neutral-500 font-normal mt-0.5">
              <span className="VG3hNb">
                {ticket?.purchase_date
                  ? moment(ticket?.purchase_date).format("DD MMM YYYY")
                  : ""}
              </span>
            </div>
          </div>

          {/* TIME - NAME */}
          <div className="hidden lg:block  min-w-[150px] flex-[4] ">
            <div className="font-medium text-xs text-neutral-500 ">Title</div>
            <div className="relative group">
              <div className="text-lg font-semibold truncate me-3">
                {ticket.event.identifier}
              </div>
              <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-sm px-2 py-1 rounded-md -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                {ticket.event.identifier}
              </div>
            </div>
          </div>

          {/* TIMME */}
          <div className="hidden lg:block flex-[4] whitespace-nowrap">
            <div className="font-medium text-xs text-neutral-500 ">Product</div>
            <div className="text-lg font-semibold">Tickets</div>
          </div>

          {/* TYPE */}
          <div className="hidden lg:block flex-[7] whitespace-nowrap">
            <div className="font-medium text-xs text-neutral-500 ">
              Transaction Date
            </div>
            <div className="text-lg font-semibold">
              {ticket?.purchase_date
                ? moment(ticket?.purchase_date).format("DD MMM YYYY")
                : ""}
            </div>
          </div>

          {/* PRICE */}
          <div className="flex-[1] whitespace-nowrap">
            <div>
              <span className="text-lg font-semibold text-primary-6000 text-left">
                {ticket?.orderdetails?.[0]?.ticket?.currency || "AED"}{" "}
                {ticket?.total_price}
              </span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-normal mt-0.5">
              total price
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL */}
      {renderDetail()}
    </div>
  );
};

export default MyOrdersCard;
