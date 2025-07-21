import { IEventDetails, IPerformance } from "@/model/IEventDetail";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import orderServices from "@/services/order.services";
import { useRouter } from "next/navigation";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import SelectedDate from "@/app/checkout/[encrypted_purchase_session_id]/SelectedDate";
import SelectedShowTime from "@/app/checkout/[encrypted_purchase_session_id]/SelectedShowTime";
import SelectedTicketCategory from "@/app/checkout/[encrypted_purchase_session_id]/SelectedTicketCategory";
import { IEventDetailResponse } from "@/queries/eventDetail.query";

interface IProps {
  selectedPerformances: IPerformance;
  eventDetail: IEventDetailResponse;
  resetSelectedPerformance: () => void;
  handlePerformanceOnChange?: (performance) => void;
  encrypted_purchase_session_id: string;
}
const CartSection: FC<IProps> = ({
  selectedPerformances,
  eventDetail,
  resetSelectedPerformance,
  handlePerformanceOnChange,
  encrypted_purchase_session_id,
}) => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedShowTime, setSelectedShowTime] = useState<Date | null>(null);
  const [selectDatePerformances, setSelectDatePerformances] = useState<
    IPerformance[]
  >([]);
  const [ticketSelection, setTicketSelection] = useState(
    "Best Available Seats"
  );
  const _handleStorePerformance = () => {
    localStorage?.setItem("cart", JSON.stringify(selectedPerformances));
    if (ticketSelection === "Best Available Seats") {
      const hasValidTicket = selectedPerformances?.tickets?.some(
        (ticket) => ticket?.ticket?.quantity > 0
      );
      if (!hasValidTicket) {
        console.log(selectedPerformances, "selectedPerformances");
        toast.error("Please select at least one ticket.");
      } else {
        router.push(`/checkout/${encrypted_purchase_session_id}`);
      }
    } else {
      router.push(`/manual-ticket-selection/${encrypted_purchase_session_id}`);
    }
  };
  const handleSelectedDateOnChange = (date: Date) => {
    if (date) {
      setSelectDatePerformances(
        orderServices.getPerformancesTime(eventDetail?.data?.performances, date)
      );
      resetSelectedPerformance();
      setSelectedDate(date);
    }
  };
  useEffect(() => {
    const date = selectedPerformances?.start_date;
    if (date) {
      setSelectedDate(date);
      const datePerformances = orderServices.getPerformancesTime(
        eventDetail?.data?.performances,
        date
      );
      setSelectDatePerformances(datePerformances);
      setSelectedShowTime(date);
    }
  }, [selectedPerformances]);
  return (
    <>
      <div className="w-full flex flex-col sm:rounded-2xl lg:border-2 border-gray-550 dark:border-neutral-700 p-2 lg:p-8 sticky top-16 space-y-8 mb-24 md:mb-0">
        <h2 className="text-2xl font-semibold">Cart</h2>
        <div className="w-full">
          <div className="border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 w-full">
            <SelectedDate
              padding="md:p-5 p-4"
              eventDetail={eventDetail}
              setSelectedDate={handleSelectedDateOnChange}
              selectedDate={selectedDate}
            />
          </div>
          <div className="mt-2 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 w-full">
            <SelectedShowTime
              selectedPerformances={selectedPerformances}
              padding="md:p-5 p-4"
              eventDetail={eventDetail}
              selectDatePerformances={selectDatePerformances}
              handlePerformanceOnChange={handlePerformanceOnChange}
              selectedShowTime={selectedShowTime}
            />
          </div>
          <div className="mt-2 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 w-full">
            <SelectedTicketCategory
              selectedPerformances={selectedPerformances}
              padding="md:p-5 p-4"
              hideEdit
            />
          </div>
        </div>
        <span className="text-md font-normal">Seat Selection</span>
        <div className="w-full">
          <div
            className="border-0 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 w-full bg-zinc-100 dark:bg-neutral-800 cursor-pointer"
            onClick={() => setTicketSelection("Best Available Seats")}
          >
            <div className="flex-1 p-0 5 flex space-x-2">
              <div className="text-left flex-1 md:p-5 md:px-5 p-3 md:me-5 flex justify-between align-middle space-x-5">
                <div className="flex space-x-4">
                  {ticketSelection === "Best Available Seats" ? (
                    <>
                      <CheckCircleIcon className="w-6 h-6 lg:w-8 lg:h-8 text-reddish-600 lg:mt-0 mt-2" />
                    </>
                  ) : (
                    <>
                      <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-white lg:mt-0 mt-2"></div>
                    </>
                  )}
                  <span className="text-md font-semibold inline-block mt-1">
                    Best Available Seats
                  </span>
                </div>
                <span className="font-normal text-sm inline-block mt-2">
                  Free
                </span>
              </div>
            </div>
          </div>
          <div
            className="mt-3 mb-1 border-0 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 w-full bg-zinc-100 dark:bg-neutral-800 cursor-pointer"
            onClick={() => setTicketSelection("Manual Selection")}
          >
            <div className="flex-1 p-0 5 flex space-x-4">
              <div className="text-left flex-1 md:p-5 md:px-5 p-3 md:me-5 flex justify-between space-x-5">
                <div className="flex space-x-4">
                  {ticketSelection === "Manual Selection" ? (
                    <>
                      <CheckCircleIcon className="w-6 h-6 lg:w-8 lg:h-8 text-reddish-600 lg:mt-0 mt-2" />
                    </>
                  ) : (
                    <>
                      <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-white lg:mt-0 mt-1"></div>
                    </>
                  )}
                  <span className="text-md font-semibold inline-block mt-1">
                    Manual Selection
                  </span>
                </div>
                {ticketSelection === "Manual Selection" ? (
                  <>
                    <InformationCircleIcon className="w-6 h-6 mt-1 font-normal text-sm text-neutral-600" />
                  </>
                ) : (
                  <>
                    <span className="font-normal text-sm inline-block mt-2">
                      Charged
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <ButtonSecondary
            className={`${
              ticketSelection === "Best Available Seats"
                ? "w-full mb-2 cursor-not-allowed"
                : "w-full mb-2"
            }`}
            sizeClass="p-4"
            rounded="rounded-full"
            bgColor={`${
              ticketSelection === "Best Available Seats"
                ? "bg-lightGrey-150"
                : "bg-reddish-600 hover:bg-primary-6000"
            }`}
            borderColor="border-0"
            fontSize="text-md"
            textColor={`${
              ticketSelection === "Best Available Seats"
                ? "text-[#111827]"
                : "text-white"
            }`}
            disabled={ticketSelection === "Best Available Seats"}
            onClick={_handleStorePerformance}
          >
            Proceed to Seat Selection
          </ButtonSecondary>
          <ButtonSecondary
            className={`${
              ticketSelection !== "Best Available Seats"
                ? "w-full mb-2 cursor-not-allowed"
                : "w-full mb-2"
            }`}
            sizeClass="p-4"
            rounded="rounded-full"
            bgColor={`${
              ticketSelection !== "Best Available Seats"
                ? "bg-lightGrey-150"
                : "bg-reddish-600 hover:bg-primary-6000"
            }`}
            borderColor="border-0"
            fontSize="text-md"
            textColor={`${
              ticketSelection !== "Best Available Seats"
                ? "text-[#111827]"
                : "text-white"
            }`}
            disabled={ticketSelection !== "Best Available Seats"}
            onClick={_handleStorePerformance}
          >
            Proceed to Checkout
          </ButtonSecondary>
        </div>
      </div>
    </>
  );
};

export default CartSection;
