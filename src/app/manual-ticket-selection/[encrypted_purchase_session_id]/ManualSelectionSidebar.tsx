import { IEventDetails, IPerformance } from "@/model/IEventDetail";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { IOptionalAddonsType } from "@/model/IOptionalAddons";
import orderServices from "@/services/order.services";
import { useRouter } from "next/navigation";
import { Route } from "@/routers/types";
import SelectedDate from "@/app/checkout/[encrypted_purchase_session_id]/SelectedDate";
import SelectedShowTime from "@/app/checkout/[encrypted_purchase_session_id]/SelectedShowTime";
import SelectedTickets from "./SelectedTickets";
import { IEventDetailResponse } from "@/queries/eventDetail.query";

interface IProps {
  selectedPerformances: IPerformance;
  selectedSeats;
  eventDetail: IEventDetailResponse;
  resetSelectedPerformance: () => void;
  handlePerformanceOnChange: (performance) => void;
  encrypted_purchase_session_id: string;
}
const ManualSelectionSidebar: FC<IProps> = ({
  selectedPerformances,
  selectedSeats,
  eventDetail,
  resetSelectedPerformance,
  handlePerformanceOnChange,
  encrypted_purchase_session_id,
}) => {
  const [optionalAddons, setOptionalAddons] = useState<IOptionalAddonsType>({
    digitalTicket: true,
    basicProtection: true,
  });
  const router = useRouter();
  const _handleToCheckOut = () => {
    console.log(selectedPerformances, "selectedPerformances");
    const updateQuantity = selectedPerformances.tickets?.map((ticket) => {
      return {
        ...ticket,
        ticket: {
          ...ticket?.ticket,
          quantity: ticket?.ticket?.quantity || 2,
        },
      };
    });
    const updatedSelectedPerformance = {
      ...selectedPerformances,
      tickets: updateQuantity,
    };
    console.log(updatedSelectedPerformance, "updatedSelectedPerformance");

    localStorage?.setItem("cart", JSON.stringify(updatedSelectedPerformance));
    localStorage?.setItem("optionalAddons", JSON.stringify(optionalAddons));
    router.push(`/checkout/${encrypted_purchase_session_id}`);
  };
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectDatePerformances, setSelectDatePerformances] = useState<
    IPerformance[]
  >([]);
  useEffect(() => {
    if (selectedPerformances?.start_date) {
      setSelectedDate(selectedPerformances?.start_date);
    }
  }, [selectedPerformances]);
  const handleSelectedDateOnChange = (date: Date) => {
    if (date) {
      setSelectDatePerformances(
        orderServices.getPerformancesTime(eventDetail?.data?.performances, date)
      );
      resetSelectedPerformance();
      setSelectedDate(date);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 p-2 md:p-8 sticky md:top-16">
        <h2 className="text-2xl font-bold">Cart</h2>
        <div className="w-full">
          <div className="border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 w-full">
            <SelectedDate
              padding="md:p-5 p-4"
              eventDetail={eventDetail}
              selectedDate={selectedDate}
              setSelectedDate={handleSelectedDateOnChange}
            />
          </div>
          <div className="mt-2 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 w-full">
            <SelectedShowTime
              selectedPerformances={selectedPerformances}
              padding="md:p-5 p-4"
              eventDetail={eventDetail}
              selectDatePerformances={selectDatePerformances}
              handlePerformanceOnChange={handlePerformanceOnChange}
            />
          </div>
          <div className="mt-2 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 w-full">
            <SelectedTickets
              selectedPerformances={selectedPerformances}
              padding={
                selectedSeats?.length > 0 ? "md:pt-5 pt-4" : "md:p-5 p-4"
              }
              selectedSeats={selectedSeats}
            />
          </div>
        </div>
        {/* <OptionalAddons
          optionalAddons={optionalAddons}
          setOptionalAddons={setOptionalAddons}
          paymentCurrency={
            selectedPerformances?.tickets[0]?.ticket?.payment_currency
          }
          width="w-full"
          border="border-0"
          padding="p-5"
        /> */}
        <div>
          <ButtonSecondary
            className="w-full mb-2"
            sizeClass="p-4"
            rounded="rounded-full"
            bgColor="bg-grey-500"
            borderColor="border-0"
            textColor="text-white dark:text-black"
            href={
              `/ticket-selection/${encrypted_purchase_session_id}` as Route<string>
            }
          >
            Back to Previous Page
          </ButtonSecondary>
          <ButtonPrimary
            className="w-full"
            sizeClass="p-4"
            rounded="rounded-full"
            // href="/checkout"
            onClick={_handleToCheckOut}
          >
            Proceed to Checkout
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default ManualSelectionSidebar;
