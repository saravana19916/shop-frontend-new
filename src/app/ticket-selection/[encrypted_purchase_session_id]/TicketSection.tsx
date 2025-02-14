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
        <>
          <div className="h-72 w-full rounded-md bg-gray-300 animate-pulse"></div>
        </>
      ) : (
        <>
          {selectedPerformances?.tickets?.map((ticket) => (
            <>
              <div className="w-full flex flex-col rounded-2xl border-2 border-gray-550 dark:border-neutral-700 space-y-6 sm:space-y-8 p-2 px-4 pb-3 lg:p-8">
                <div className="gap-2 items-center text-sm text-neutral-700 dark:text-neutral-300"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                  <div className="gap-6 items-center col-span-1 flex">
                    <div
                      className="w-5 h-5 lg:w-6 lg:h-6 rounded-full hidden md:block"
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

                  <div className="relative inline-block">
                    <button className="relative group !rounded-full p-2">
                      <EyeIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                        <div className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2 w-[300px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                        <Image
                          src={orderImage}
                          alt="Floor Plan"
                          width={300}
                          height={200}
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                    </button>
                  </div>

                  <div>
                    <NcInputNumber2
                      onChange={(value) =>
                        handleCountOnchange(value, ticket?.ticket_id)
                      }
                      initialValue={ticket?.ticket?.quantity || 0}
                      minSalable={
                        ticket?.ticket?.minimum_salable_quantity_per_user
                      }
                      max={ticket?.ticket?.maximum_salable_quantity_per_user}
                      isAddingCart={isAddingCart}
                    />
                  </div>
                  <div className="items-center flex">
                    <div className="flex flex-col">
                      <span className="text-base font-semibold">
                        {ticket?.ticket?.payment_currency}{" "}
                        {ticket?.ticket?.price}
                      </span>
                      <span className="text-xs text-gray-500 font-light">
                        net of all taxes
                      </span>
                    </div>
                    <button
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                      type="button"
                      onClick={() => {
                        setViewTicket((prev) => {
                          return prev === ticket?.ticket_id
                            ? 0
                            : ticket?.ticket_id;
                        });
                      }}
                    >
                      {viewTicket === ticket?.ticket_id ? (
                        <ChevronUpIcon className="w-5 h-5 " />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 " />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex md:hidden justify-between">
                  <div
                    className="gap-6 items-center col-span-1 flex"
                    onClick={() => {
                      setViewTicket((prev) => {
                        return prev === ticket?.ticket_id
                          ? 0
                          : ticket?.ticket_id;
                      });
                    }}
                  >
                    <div
                      className="w-5 h-5 lg:w-6 lg:h-6 rounded-full hidden md:block"
                      style={{
                        backgroundColor: `${
                          colorPicker?.[ticket?.ticket?.identifier] || "#E5E4E2"
                        }`,
                      }}
                    ></div>
                    <h2 className="text-lg font-semibold">
                      {ticket?.ticket?.identifier}
                    </h2>
                  </div>

                  <div className="relative inline-block">
                    <ButtonPrimary className="relative group !rounded-full">
                      Floor Plan
                      <Image
                        src={orderImage}
                        alt="Floor Plan"
                        className="z-10 absolute left-0 top-full mt-2 w-96 h-auto rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 mx-auto"
                      />
                    </ButtonPrimary>
                  </div>

                  <div className="flex md:justify-center col-span-2 md:col-span-1 md:row-auto row-start-2">
                    <NcInputNumber2
                      onChange={(value) =>
                        handleCountOnchange(value, ticket?.ticket_id)
                      }
                      initialValue={ticket?.ticket?.quantity || 0}
                      minSalable={
                        ticket?.ticket?.minimum_salable_quantity_per_user
                      }
                      max={ticket?.ticket?.maximum_salable_quantity_per_user}
                    />
                  </div>
                </div>
                <div
                  className="flex md:hidden justify-between"
                  onClick={() => {
                    setViewTicket((prev) => {
                      return prev === ticket?.ticket_id ? 0 : ticket?.ticket_id;
                    });
                  }}
                >
                  <div className="flex flex-col">
                    <span className="text-md font-semibold">
                      {ticket?.ticket?.payment_currency} {ticket?.ticket?.price}
                    </span>
                    <span className="text-sm text-gray-500 font-light">
                      net of all taxes
                    </span>
                  </div>
                </div>

                {viewTicket === ticket?.ticket_id ? (
                  <>
                    <div className="w-full flex flex-col border border-neutral-100 dark:border-neutral-700 md:p-8 p-3 rounded-2xl bg-zinc-350">
                      <span className="font-light mt-3 mb-5 text-sm dark:text-gray-900">
                        <span className="font-semibold">Age Limit: &nbsp;</span>
                        {eventDetail?.data?.age_policy ? (
                          `above ${eventDetail?.data?.age_policy} years of age`
                        ) : (
                          <>
                            <i>NA</i>
                          </>
                        )}
                      </span>
                      <div className="lg:w-11/12 w-full border-b border-neutral-200 dark:border-neutral-700"></div>
                      <h3 className="text-sm font-semibold mt-5 mb-5 dark:text-gray-900">
                        Inclusions
                      </h3>
                      <div className="lg:w-11/12 w-full flex flex-wrap gap-4 mb-2">
                        {inclusions?.map((inclusion, index) => (
                          <div
                            key={index}
                            className="border-0 rounded-xl px-4 py-2.5 bg-white dark:bg-neutral-800 font-normal text-xs"
                          >
                            {inclusion}
                          </div>
                        ))}
                      </div>
                      {viewTicketRules[ticket?.ticket_id] ? (
                        <>
                          <div className="lg:w-11/12 w-full border-b border-neutral-200 dark:border-neutral-700 mt-5"></div>
                          <h3 className="font-semibold text-sm mt-5 mb-3">
                            Ticket Rules
                          </h3>
                          <ul className="list-disc px-6">
                            {eventDetail?.data?.eventrules?.map(
                              (eventRule, index) => (
                                <li key={index} className="mt-2 text-xs">
                                  {eventRule?.rule?.identifier}
                                </li>
                              )
                            )}
                          </ul>
                        </>
                      ) : null}
                      {viewTicketFloorPlan[ticket?.ticket_id] ? (
                        <>
                          <div className="lg:w-11/12 w-full border-b border-neutral-200 dark:border-neutral-700 mt-5"></div>
                          <h3 className="font-semibold text-sm mt-5 mb-5">
                            Floor Plan
                          </h3>
                          <div className="lg:w-11/12 w-full flex flex-wrap gap-4 mb-4">
                            <div className="flow-root w-auto text-center">
                              <Image
                                src={orderImage}
                                alt="Floor Plan"
                                width={650}
                                height={250}
                                className="mx-auto"
                              />
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                    <div className="w-full flex gap-3 justify-end mt-5">
                      <button
                        type="button"
                        onClick={() => _handleViewTicketRules(ticket)}
                        className="border-0 rounded-full md:px-6 px-2 py-2.5 bg-grey-100 dark:bg-neutral-800 font-semibold text-xs"
                      >
                        {viewTicketRules[ticket?.ticket_id] ? "Hide" : "View"}{" "}
                        Ticket Rules
                      </button>
                      <button
                        type="button"
                        onClick={() => _handleViewTicketFloorPlan(ticket)}
                        className="border-0 rounded-full md:px-6 px-2 py-2.5 bg-grey-100 dark:bg-neutral-800 font-semibold text-xs"
                      >
                        {viewTicketFloorPlan[ticket?.ticket_id]
                          ? "Hide Floor Plan"
                          : "View Floor Plan"}
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default TicketSection;
