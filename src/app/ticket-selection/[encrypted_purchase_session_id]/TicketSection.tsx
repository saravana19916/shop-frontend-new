import NcInputNumber from "@/components/NcInputNumber";
import NcInputNumber2 from "@/components/NcInputNumber2";
import { IEventDetails, IPerformance } from "@/model/IEventDetail";
import Image from "next/image";
import orderImage from "@/images/floor-plan.png";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import React, { FC, useEffect, useState } from "react";
import { IEventDetailResponse } from "@/queries/eventDetail.query";
import ButtonPrimary from "@/shared/ButtonPrimary";

interface IProps {
  handleCountOnchange: (value: number, ticketId: number) => void;
  selectedPerformances: IPerformance;
  eventDetail: IEventDetailResponse;
  isFetchingCart: boolean;
  isAddingCart: boolean;
}
const colorPicker = {
  GOLD: "#FFD700",
  VIP: "#6A0DAD",
};
const inclusions = [
  "Access to Gold Area",
  "Free Parking",
  "2 Free Drinks",
  "Access to General Food Court",
];
const TicketSection: FC<IProps> = ({
  handleCountOnchange,
  selectedPerformances,
  eventDetail,
  isFetchingCart,
  isAddingCart,
}) => {
  const [viewTicket, setViewTicket] = useState<number | string>(0);
  const [viewTicketRules, setViewTicketRules] = useState({});
  const [viewTicketFloorPlan, setViewTicketFloorPlan] = useState({});
  const _handleViewTicketRules = (ticket) => {
    setViewTicketRules((prev) => {
      return {
        ...prev,
        [ticket?.ticket_id]: !prev[ticket?.ticket_id],
      };
    });
  };
  const _handleViewTicketFloorPlan = (ticket) => {
    setViewTicketFloorPlan((prev) => {
      return {
        ...prev,
        [ticket?.ticket_id]: !prev[ticket?.ticket_id],
      };
    });
  };
  useEffect(() => {
    console.log(selectedPerformances, "selectedPerformances");
  }, [selectedPerformances]);
  return (
    <>
      {isFetchingCart ? (
        <div className="h-72 w-full rounded-md bg-gray-300 animate-pulse"></div>
      ) : (
        <>
          {selectedPerformances?.tickets?.map((ticket) => (
            <div
              key={ticket?.ticket_id}
              className="w-full flex flex-col rounded-2xl border-2 border-gray-300 dark:border-neutral-700 p-4 sm:p-6 space-y-4"
            >
              {/* Main ticket info row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{
                      backgroundColor: `${
                        colorPicker?.[ticket?.ticket?.identifier] || "#E5E4E2"
                      }`,
                    }}
                  ></div>
                  <span className="text-base font-semibold">
                    {ticket?.ticket?.identifier}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <button className="p-2 rounded-full">
                      <EyeIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                      <div className="absolute left-1/2 -translate-x-1/2 sm:left-full sm:translate-x-0 top-full mt-2 sm:ml-4 w-[90vw] sm:w-[400px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                        <Image
                          src={orderImage}
                          alt="Floor Plan"
                          width={400}
                          height={320}
                          className="rounded-lg shadow-lg w-full"
                        />
                      </div>
                    </button>
                  </div>

                  <NcInputNumber2
                    onChange={(value) =>
                      handleCountOnchange(value, ticket?.ticket_id)
                    }
                    initialValue={ticket?.ticket?.quantity || 0}
                    minSalable={ticket?.ticket?.minimum_salable_quantity_per_user}
                    max={ticket?.ticket?.maximum_salable_quantity_per_user}
                    isAddingCart={isAddingCart}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-base font-semibold">
                      {ticket?.ticket?.payment_currency} {ticket?.ticket?.price}
                    </span>
                    <span className="text-xs text-gray-500 font-light">
                      net of all taxes
                    </span>
                  </div>
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                    type="button"
                    onClick={() => {
                      setViewTicket((prev) =>
                        prev === ticket?.ticket_id ? 0 : ticket?.ticket_id
                      );
                    }}
                  >
                    {viewTicket === ticket?.ticket_id ? (
                      <ChevronUpIcon className="w-5 h-5" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Collapsible section */}
              {viewTicket === ticket?.ticket_id && (
                <div className="flex flex-col border border-neutral-100 dark:border-neutral-700 p-4 sm:p-6 rounded-2xl bg-zinc-50 dark:bg-neutral-800 space-y-4">
                  <span className="font-light text-sm">
                    <span className="font-semibold">Age Limit: </span>
                    {eventDetail?.data?.age_policy ? (
                      `above ${eventDetail?.data?.age_policy} years of age`
                    ) : (
                      <i>NA</i>
                    )}
                  </span>
                  <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
                  <h3 className="text-sm font-semibold">Inclusions</h3>
                  <div className="flex flex-wrap gap-2">
                    {inclusions?.map((inclusion, index) => (
                      <div
                        key={index}
                        className="border rounded-xl px-3 py-2 bg-white dark:bg-neutral-800 text-xs font-normal"
                      >
                        {inclusion}
                      </div>
                    ))}
                  </div>
                  {viewTicketRules[ticket?.ticket_id] && (
                    <>
                      <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
                      <h3 className="text-sm font-semibold">Ticket Rules</h3>
                      <ul className="list-disc pl-5 text-xs">
                        {eventDetail?.data?.eventrules?.map((eventRule, index) => (
                          <li key={index} className="mt-1">
                            {eventRule?.rule?.identifier}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {viewTicketFloorPlan[ticket?.ticket_id] && (
                    <>
                      <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
                      <h3 className="text-sm font-semibold">Floor Plan</h3>
                      <div className="w-full">
                        <Image
                          src={orderImage}
                          alt="Floor Plan"
                          width={650}
                          height={250}
                          className="w-full rounded-lg"
                        />
                      </div>
                    </>
                  )}
                  <div className="flex flex-col sm:flex-row gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => _handleViewTicketRules(ticket)}
                      className="border rounded-full px-4 py-2 bg-gray-100 dark:bg-neutral-800 font-semibold text-xs"
                    >
                      {viewTicketRules[ticket?.ticket_id] ? "Hide" : "View"} Ticket Rules
                    </button>
                    <button
                      type="button"
                      onClick={() => _handleViewTicketFloorPlan(ticket)}
                      className="border rounded-full px-4 py-2 bg-gray-100 dark:bg-neutral-800 font-semibold text-xs"
                    >
                      {viewTicketFloorPlan[ticket?.ticket_id] ? "Hide" : "View"} Floor Plan
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default TicketSection;