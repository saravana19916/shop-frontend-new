// "use client";

// import { IPerformance, ITicketElement } from "@/model/IEventDetail";
// import React, { Fragment, FC, useState, useEffect } from "react";
// export interface OrderSummaryProps {
//   performance?: IPerformance;
//   payment_currency?: string;
//   vat?: number;
// }

// const OrderSummary: FC<OrderSummaryProps> = ({
//   performance,
//   payment_currency,
//   vat,
// }) => {
//   const getProcessFee = (value: ITicketElement) => {
//     const fee: number =
//       Number(value.ticket.digital_ticket_box_office_fee) * value.ticket.on_hold;
//     return Number(fee).toFixed(2);
//   };
//   const getNetFee = (value: ITicketElement) => {
//     const fee: number =
//       Number(Number(value.ticket.price) * value.ticket.on_hold) +
//       Number(getProcessFee(value));
//     return Number(fee).toFixed(2);
//   };
//   const getVatFee = () => {
//     const sum = performance?.tickets.reduce(function (result, item) {
//       return result + Number(getNetFee(item));
//     }, 0);

//     const fee = (sum / 100) * vat;
//     return Number(fee).toFixed(2);
//   };
//   const getTotalFee = () => {
//     const sum = performance?.tickets.reduce(function (result, item) {
//       return result + Number(getNetFee(item));
//     }, 0);

//     return sum + getVatFee();
//   };
//   useEffect(() => {
//     const sum = performance?.tickets.reduce(function (result, item) {
//       return result + Number(getNetFee(item));
//     }, 0);
//   }, [performance]);
//   return (
//     <>
//       <div className="flex flex-col space-y-4 mt-4">
//         {performance?.tickets?.map((value, index) => {
//           if (value.ticket.on_hold !== 0) {
//             return (
//               <>
//                 <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
//                   <span>
//                     {payment_currency} {value.ticket.price} x{" "}
//                     {value.ticket.on_hold} {value.ticket.identifier}
//                   </span>
//                   <span>
//                     {payment_currency}{" "}
//                     {(
//                       Number(value.ticket.price) * value.ticket.on_hold
//                     ).toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
//                   <span>
//                     Process Fee{" "}
//                     <div className="group cursor-pointer relative inline-block text-center">
//                       <i className="las la-question-circle"></i>
//                       <div className="opacity-0 w-[20rem] bg-black dark:bg-white text-white dark:text-black text-start text-xs rounded-lg py-2 absolute z-20 group-hover:opacity-100 bottom-full px-3 pointer-events-none">
//                         In order to cover the total cost of providing our
//                         E-Ticketing services we charge a Payment Processing Fee
//                         per ticket which may vary from one event to another.
//                         Please note that different charges may apply when
//                         booking hospitality and some other events.
//                         <svg
//                           className="absolute text-black dark:text-white h-2 w-[6%] left-0 top-full"
//                           x="0px"
//                           y="0px"
//                           viewBox="0 0 255 255"
//                         >
//                           <polygon
//                             className="fill-current"
//                             points="0,0 127.5,127.5 255,0"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                   </span>
//                   <span>
//                     {payment_currency} {getProcessFee(value)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
//                   <span>Net Price</span>
//                   <span>
//                     {payment_currency} {getNetFee(value)}
//                   </span>
//                 </div>
//                 <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
//               </>
//             );
//           }
//         })}

//         <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
//           <span>VAT ({vat}%)</span>
//           <span>
//             {payment_currency} {getVatFee()}
//           </span>
//         </div>
//         <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
//           <span>Discount (0%)</span>
//           <span>
//             {payment_currency} {0}
//           </span>
//         </div>
//         <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
//         <div className="flex justify-between font-semibold">
//           <span>Total</span>
//           <span>
//             {payment_currency} {getTotalFee()}
//           </span>
//         </div>
//       </div>
//     </>
//   );
// };
// export default OrderSummary;
import React, { FC, useEffect, useState } from "react";
import NcInputNumber from "@/components/NcInputNumber";
import { IPerformance, ITicketElement } from "@/model/IEventDetail";
import { useTranslation } from "react-i18next";
import { CartDataResponse } from "@/queries/cart.query";
import moment from "moment";
import CheckOutOrderSummary from "@/app/checkout/[encrypted_purchase_session_id]/CheckOutOrderSummary";
export interface OrderSummaryProps {
  performance?: IPerformance;
  payment_currency?: string;
  vat?: number;
  insuranceValue?: number;
  addons?: any;
  setTotalReserve?: (value: number) => void;
  selectedAddonsArray?: any[];
  appliedDiscount?: number | null;
  eventCartData?: CartDataResponse;
}

const OrderSummary: FC<OrderSummaryProps> = ({
  performance,
  payment_currency,
  vat,
  addons,
  setTotalReserve,
  selectedAddonsArray,
  appliedDiscount,
  eventCartData,
}) => {
  console.log(eventCartData, "eventCartData");
  const [tickets, setTickets] = useState(performance?.tickets || []);

  const handleTicketQuantityChange = (index: number, newValue: number) => {
    const updatedTickets = [...tickets];
    updatedTickets[index].ticket.on_hold = newValue;
    setTickets(updatedTickets);
  };

  const processFee = tickets.reduce((acc, value) => {
    const fee =
      Number(value.ticket.digital_ticket_fee) * (value.ticket.quantity || 0);
    return acc + fee;
  }, 0);
  const serviceFee = tickets.reduce((acc, value) => {
    const fee = Number(value.ticket.service_fee) * (value.ticket.quantity || 0);
    return acc + fee;
  }, 0);

  const addOnCost =
    Number(addons?.insure?.quantity) * Number(addons?.insure?.cost) || 0;
  const ticketProcessFee = tickets.reduce((acc, value) => {
    const fee = Number(value.ticket.price) * (value.ticket.quantity || 0);
    const total = fee > 0 && fee + serviceFee;
    return acc + total;
  }, 0);

  const optionalAddonCost = selectedAddonsArray.reduce(
    (sum, addon) => sum + addon.cost * addon.count,
    0
  );

  const netPrice = ticketProcessFee + optionalAddonCost + processFee;

  const getVatFee = () => {
    const total = appliedDiscount ? netPrice - appliedDiscount : netPrice;
    const fee = Math.round((total / 100) * vat * 100) / 100; // Round to two decimal places
    return fee.toFixed(2);
  };

  const getTotalFee = () => {
    const discountedNetPrice = appliedDiscount
      ? netPrice - appliedDiscount
      : netPrice;
    const total =
      Math.round(
        (Number(discountedNetPrice.toFixed(2)) + Number(getVatFee())) * 100
      ) / 100; // Round to two decimal places

    setTotalReserve(+total.toFixed(2));
    localStorage?.setItem("totalFee", total.toFixed(2));
    return total.toFixed(2);
  };

  useEffect(() => {
    setTickets(performance?.tickets || []);
  }, [performance]);

  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-[20px] font-bold">Order Summary</h2>
      <CheckOutOrderSummary eventCartData={eventCartData} />
      <div className="flex flex-col space-y-4 mt-4">
        {tickets.map((value, index) => {
          if (value.ticket.quantity !== 0) {
            return (
              <div
                key={index}
                className="flex justify-between text-neutral-6000 dark:text-neutral-300 text-sm"
              >
                <span>
                  {value.ticket.quantity} x {value.ticket.identifier}
                </span>
                <span>
                  {payment_currency}{" "}
                  {(Number(value.ticket.price) * value.ticket.quantity).toFixed(
                    2
                  )}
                </span>
              </div>
            );
          }
        })}
        {selectedAddonsArray?.map((addon) => (
          <>
            <div
              key={Math.random()}
              className="flex justify-between text-neutral-6000 dark:text-neutral-300  text-sm"
            >
              <span>
                {addon.count} x {addon.label}
              </span>
              <span>
                {payment_currency}{" "}
                {(Number(addon.cost) * addon.count).toFixed(2)}
              </span>
            </div>
          </>
        ))}

        {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300"></div> */}
        {/* <span>
            {addons && addons.insure && addons.insure.quantity ? (
              <>
                Insure {payment_currency} {addons.insure.cost} x{" "}
                {addons.insure.quantity}
              </>
            ) : (
              <>Insure</>
            )}
          </span> */}

        {/* <span>
            Insure{" "}
            {addons.insure.quantity ? (
              <>
                {payment_currency} {addons.insure.cost} x{" "}
                {addons.insure.quantity}
              </>
            ) : (
              ""
            )}
          </span> */}
        {/* <span>
            {payment_currency} {addOnCost.toFixed(2)}
          </span> */}
        {/* </div> */}
        {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span>T{t("discount")} (0%)</span>
          <span className="text-primary-6000">
            - {payment_currency} {0}
          </span>
        </div> */}
        {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span>{t("netPrice")}</span>
          <span>
            {payment_currency} {netPrice.toFixed(2)}
          </span>
        </div> */}
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300 text-sm">
          <span>
            {t("processFee")}{" "}
            {/* <div className="group cursor-pointer relative inline-block text-center">
              <i className="las la-question-circle"></i>
              <div className="opacity-0 w-[9rem] sm:w-[20rem] md:w-[20rem] lg:w-[20rem] bg-black dark:bg-white text-white dark:text-black text-start text-xs rounded-lg py-2 absolute z-20 group-hover:opacity-100 bottom-full px-3 pointer-events-none">
                {t(
                  "In order to cover the total cost of providing our E-Ticketing services we charge a Payment Processing Fee per ticket which may vary from one event to another. Please note that different charges may apply when booking hospitality and some other events."
                )}
                <svg
                  className="absolute text-black dark:text-white h-2 w-[6%] left-0 top-full"
                  x="0px"
                  y="0px"
                  viewBox="0 0 255 255"
                >
                  <polygon
                    className="fill-current"
                    points="0,0 127.5,127.5 255,0"
                  />
                </svg>
              </div>
            </div> */}
          </span>
          <span>
            {payment_currency} {processFee.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300 text-sm">
          <span>Service Fee</span>
          <span>
            {payment_currency} {serviceFee.toFixed(2)}
          </span>
        </div>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="flex justify-between dark:text-neutral-300 text-sm font-semibold">
          <span>Net Total</span>
          <span>
            {payment_currency} {netPrice.toFixed(2)}
          </span>
        </div>
        {appliedDiscount ? (
          <>
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300 text-sm">
              <span>
                Discount{" "}
                <span className="text-xs inline-block ms-3">(promo code)</span>
              </span>
              <span className="text-reddish-500">
                - {payment_currency} {appliedDiscount.toFixed(2)}
              </span>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300 text-sm">
          <span>{t("VAT")}</span>
          <span className="inline-block ms-32">{vat}%</span>
          <span>
            {payment_currency} {getVatFee()}
          </span>
        </div>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex justify-between font-semibold">
          <span>Grand Total</span>
          <span>
            {payment_currency} {getTotalFee()}
          </span>
        </div>
        <div className="block lg:hidden border-b border-neutral-200 dark:border-neutral-700"></div>
      </div>

      {/* <div className="flex flex-col space-y-4 mt-4">
        {tickets.map((value, index) => (
          <NcInputNumber
            key={index}
            className="w-full"
            initialValue={value.ticket.on_hold}
            min={0}
            onChange={(newValue) => handleTicketQuantityChange(index, newValue)}
            label={`${payment_currency} ${value.ticket.price} x ${value.ticket.identifier}`}
          />
        ))}
      </div> */}
    </>
  );
};

export default OrderSummary;
