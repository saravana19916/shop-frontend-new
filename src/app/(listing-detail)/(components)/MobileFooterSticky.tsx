import React, { useState, FC } from "react";
import ModalSelectDate from "@/components/ModalSelectDate";
import ButtonPrimary from "@/shared/ButtonPrimary";
import converSelectedDateToString from "@/utils/converSelectedDateToString";
import ModalReserveMobile from "./ModalReserveMobile";

export interface IMobileFooterProps {
  totalReserve?: number;
  paymentCurrency?: string | number;
  handleReserve?: () => void;
}

const MobileFooterSticky: FC<IMobileFooterProps> = ({
  totalReserve,
  paymentCurrency,
  handleReserve,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2023/02/06")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2023/02/23"));

  return (
    <div
      className={`lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40 block `}
    >
      <div className="container flex items-center justify-between">
        <div className="">
          {totalReserve > 0 && (
            <>
              <span className="block text-sm font-medium  ">
                {totalReserve && `${paymentCurrency} ${totalReserve}`}
              </span>
            </>
          )}
          <ModalSelectDate
            renderChildren={({ openModal }) => (
              <span
                onClick={openModal}
                className="text-sm font-normal underline text-neutral-500 dark:text-neutral-400"
              >
                {converSelectedDateToString([startDate, endDate])}
              </span>
            )}
          />
        </div>
        <ModalReserveMobile
          renderChildren={({ openModal }) => (
            <ButtonPrimary
            sizeClass="w-full py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
              onClick={() => {
                // openModal();
                handleReserve();
              }}
            >
              Reserve
            </ButtonPrimary>
          )}
        />
      </div>
    </div>
  );
};

export default MobileFooterSticky;
