import { CartDataResponse } from "@/queries/cart.query";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
interface IProps {
  eventCartData?: CartDataResponse;
}
const CheckOutOrderSummary: FC<IProps> = ({ eventCartData }) => {
  console.log(eventCartData?.data, "performancesperformances");
  const [overAllProcessFee, setOverAllProcessFee] = useState<number>(0);
  const [overAllServiceFee, setOverAllServiceFee] = useState<number>(0);
  const [overAllNetTotal, setOverAllNetTotal] = useState<number>(0);
  const [overAllVat, setOverAllVat] = useState<number>(0);
  const [overAllGrandTotal, setOverAllGrandTotal] = useState<number>(0);
  const [vatPercentage, setVatPercentage] = useState<number>(0);

  useEffect(() => {
    if (eventCartData?.data?.performances) {
      const performances = eventCartData.data.performances;

      let totalProcessFee = 0;
      let totalServiceFee = 0;
      let totalNetTotal = 0;
      let totalVat = 0;
      let totalGrandTotal = 0;

      performances.forEach((performance: any) => {
        const basketSummary = performance.basket_summary;
        if (basketSummary) {
          totalProcessFee += basketSummary.process_fee || 0;
          totalServiceFee += basketSummary.service_charge || 0;
          totalNetTotal += parseFloat(basketSummary.net_total) || 0;
          totalVat += parseFloat(basketSummary.vat) || 0;
          totalGrandTotal += parseFloat(basketSummary.grand_total) || 0;
        }
      });

      setOverAllProcessFee(totalProcessFee);
      setOverAllServiceFee(totalServiceFee);
      setOverAllNetTotal(totalNetTotal);
      setOverAllVat(totalVat);
      setOverAllGrandTotal(totalGrandTotal);
      if (totalNetTotal > 0) {
        const vatPercent = (totalVat / totalNetTotal) * 100;
        setVatPercentage(Math.round(vatPercent * 100) / 100);
      }
    }
  }, [eventCartData]);
  const currency =
    eventCartData?.data?.performances?.[0]?.tickets?.[0]?.currency;
  return (
    <>
      <h2 className="text-2xl font-semibold">Order Summary</h2>
      <div className="flex flex-col space-y-4 mt-4">
        {eventCartData?.data?.performances?.map((performance) => (
          <>
            <span className="mt-1.5 text-lg font-semibold">
              {moment(performance?.start_date).format("DD MMM YYYY HH:mm")}
            </span>
            <>
              {performance?.basket_summary?.items?.map((item, index) => (
                <>
                  <div
                    key={index}
                    className="flex justify-between text-neutral-6000 dark:text-neutral-300 text-sm"
                  >
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span>
                      {item.currency} {item.total}
                    </span>
                  </div>
                </>
              ))}
            </>
          </>
        ))}
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300 text-sm">
          <span>Process Fee</span>
          <span>
            {currency} {overAllProcessFee?.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300 text-sm">
          <span>Service Fee</span>
          <span>
            {currency} {overAllServiceFee?.toFixed(2)}
          </span>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex justify-between dark:text-neutral-300 text-sm font-semibold">
          <span>Net Total</span>
          <span>
            {currency} {overAllNetTotal?.toFixed(2)}
          </span>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300 text-sm">
          <span>VAT</span>
          <span className="inline-block ms-32">{vatPercentage} %</span>
          <span>
            {currency} {overAllVat?.toFixed(2)}
          </span>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex justify-between font-semibold">
          <span>Grand Total</span>
          <span>
            {currency} {overAllGrandTotal?.toFixed(2)}
          </span>
        </div>
        <div className="block lg:hidden border-b border-neutral-200 dark:border-neutral-700"></div>
      </div>
    </>
  );
};

export default CheckOutOrderSummary;
