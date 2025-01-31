import React, { FC } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";

interface IProps {
  selectedPerformances;
  paymentType;
  payment_currency;
  totalFee;
  selectedAddonsArray;
  vat;
  appliedDiscount?: number;
}
const TransactionSummary: FC<IProps> = ({
  selectedPerformances,
  paymentType,
  totalFee,
  payment_currency,
  selectedAddonsArray,
  vat,
  appliedDiscount,
}) => {
  const { t } = useTranslation();
  const tickets = selectedPerformances?.tickets;
  const processFee = tickets.reduce((acc, value) => {
    console.log(value.ticket, "value.ticket");

    const fee =
      Number(value.ticket.digital_ticket_fee) * (value.ticket.quantity || 0);
    return acc + fee;
  }, 0);
  const serviceFee = tickets.reduce((acc, value) => {
    console.log(value.ticket, "value.ticket");

    const fee = Number(value.ticket.service_fee) * (value.ticket.quantity || 0);
    return acc + fee;
  }, 0);
  const ticketProcessFee = tickets.reduce((acc, value) => {
    const fee = Number(value.ticket.price) * (value.ticket.quantity || 0);
    const total = fee > 0 && fee + serviceFee;
    return acc + total;
  }, 0);
  const optionalAddonCost = selectedAddonsArray?.reduce(
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
    return total.toFixed(2);
  };
  return (
    <>
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 p-2 lg:p-8 xl:p-16  text-sm">
        <h2 className="text-lg font-bold">Transaction Summary</h2>
        <div className="flex flex-col space-y-1 mb-6 text-neutral-6000 dark:text-neutral-300">
          <div className="flex">
            <span className="flex-1">Name</span>
            <span className="flex-1 text-end">Jayakumar</span>
          </div>
          <div className="flex">
            <span className="flex-1">Booking Code</span>
            <span className="flex-1 text-end">#222-333-111</span>
          </div>
          <div className="flex">
            <span className="flex-1">Date</span>
            <span className="flex-1 text-end">
              {moment(selectedPerformances?.start_date).format("DD MMM YYYY")}
            </span>
          </div>
          <div className="flex">
            <span className="flex-1">Payment Type</span>
            <span className="flex-1 text-end">
              {paymentType ? paymentType : "--"}
            </span>
          </div>
          <div className="flex">
            <span className="flex-1">Total</span>
            <span className="flex-1 text-end">
              {selectedPerformances?.tickets[0]?.ticket?.payment_currency}{" "}
              {totalFee}{" "}
            </span>
          </div>
        </div>
        <h2 className="text-lg font-bold mt-5">Order Details</h2>
        <div className="flex flex-col space-y-4 my-4">
          {selectedPerformances?.tickets.map((value, index) => {
            if (value.ticket.quantity !== 0) {
              return (
                <div
                  key={index}
                  className="flex justify-between text-neutral-6000 dark:text-neutral-300"
                >
                  <span>
                    {value.ticket.quantity} x {value.ticket.identifier}
                  </span>
                  <span>
                    {payment_currency}{" "}
                    {(
                      Number(value.ticket.price) * value.ticket.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              );
            }
          })}
          {selectedAddonsArray?.map((addon) => (
            <>
              <div
                key={Math.random()}
                className="flex justify-between text-neutral-6000 dark:text-neutral-300"
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
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300"></div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>{t("processFee")} </span>
            <span>
              {payment_currency} {processFee.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
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
                <span>Discount (promo code)</span>
                <span className="text-reddish-500">
                  - {payment_currency} {appliedDiscount.toFixed(2)}
                </span>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>VAT</span>
            <span className="inline-block ms-32">5 %</span>
            <span>
              {payment_currency} {getVatFee()}
            </span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex text-base justify-between font-semibold">
            <span>Grand Total</span>
            <span>
              {payment_currency} {getTotalFee()}
            </span>
          </div>
          <div className="block lg:hidden border-b border-neutral-200 dark:border-neutral-700"></div>
        </div>
      </div>
    </>
  );
};

export default TransactionSummary;
