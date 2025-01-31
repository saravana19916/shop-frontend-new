"use client";
import { IEventDetails } from "@/model/IEventDetail";
import React, { Fragment, FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
export interface ITicketRate {
  id: number;
  identifier: string;
  price: string;
  currency: string;
}
export interface EventTicketRatesProps {
  eventDetail: IEventDetails;
}
const EventTicketRates: FC<EventTicketRatesProps> = ({ eventDetail }) => {
  const ticketRateObj: ITicketRate[] = [];

  const [ticketRate, setTicketRate] = useState(ticketRateObj);
  useEffect(() => {
    eventDetail.data.performances.map((value, index) => [
      value.tickets.map((tickets, index) => {
        const rate: ITicketRate = {
          id: tickets.ticket.id,
          identifier: tickets.ticket.identifier,
          price: tickets.ticket.price,
          currency: tickets.ticket.payment_currency,
        };
        ticketRateObj.push(rate);
      }),
    ]);
    console.log(ticketRateObj);

    if (ticketRateObj.length > 0) {
      let noDuplicatesTicketRate = ticketRateObj.reduce((arr, item) => {
        const filtered = arr.filter((i) => i["id"] !== item["id"]);
        return [...filtered, item];
      }, []);
      setTicketRate(noDuplicatesTicketRate);
    }
  }, [eventDetail]);
  const { t } = useTranslation();
  return (
    <div className="listingSection__wrap !space-y-6">
      {eventDetail?.data?.id > 0 ? (
        <>
          <div>
            <h2 className="text-2xl font-semibold">{t("ticketPrices")}</h2>
            <span className="block mt-2 text-lg font-semibold text-neutral-500 dark:text-neutral-400">
              {t("pricesMayIncreaseOnWeekendsOrHolidays")}
            </span>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flow-root">
            <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
              {ticketRate.length > 0 &&
                ticketRate.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className={`p-4 odd:bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg ${
                        index !== 0 ? "mt-4" : ""
                      } `}
                    >
                      <span>{value.identifier}</span>
                      <span>
                        {value.currency} {value.price}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-3 w-2/12 rounded-md bg-gray-300 animate-pulse"></div>
          <div className="h-5 w-2/3 rounded-md bg-gray-300 animate-pulse"></div>
          <div className="h-96 w-full rounded-md bg-gray-300 animate-pulse"></div>
        </>
      )}
    </div>
  );
};
export default EventTicketRates;
