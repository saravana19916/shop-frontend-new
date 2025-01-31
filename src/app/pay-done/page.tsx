"use client";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import { IEventDetails, IPerformance } from "@/model/IEventDetail";
import placeHolderImg from "@/images/placeholder-small.png";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import { SquaresPlusIcon, TicketIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { Margin, Resolution, usePDF } from "react-to-pdf";
import { useTranslation } from "react-i18next";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { addonOptions, IOptionalAddonsType } from "@/model/IOptionalAddons";
import BookingSection from "./BookingSection";
import TransactionSummary from "./TransactionSummary";

export interface PayPageProps {}

const PayPage: FC<PayPageProps> = () => {
  const thumbnailURL = process.env.AWS_CLOUD_FRONT_URL + "images/events/";
  const eventDetailObj: IEventDetails = {
    message: "",
    data: undefined,
    success: false,
    id: "",
  };
  const [storedSeats, setStoredSeats] = useState<any>();

  useEffect(() => {
    const storedSeats = JSON.parse(
      localStorage?.getItem("selectedSeats") || "{}"
    );
    setStoredSeats(storedSeats);
  }, []);

  const [eventDetail, setEventDetail] = useState<IEventDetails>(eventDetailObj);
  const [addons, setAddons] = useState<any>();

  const { toPDF, targetRef } = usePDF({
    method: "save",
    filename: "booking-details.pdf",
    page: { margin: Margin.SMALL },
    resolution: Resolution.HIGH,
  });
  const performancesObj: IPerformance = {
    id: 0,
    start_date: undefined,
    end_date: undefined,
    enabled: 0,
    added_date: undefined,
    updated_date: undefined,
    event_id: 0,
    venue_hall_id: 0,
    salable_asset: "",
    seat_selected_automatically: 0,
    dtcm_code: "",
    floor_plan_id: 0,
    mobile_seat_selected_automatically: 0,
    sold_out: 0,
    on_hold: 0,
    tickets: [],
    venuehall: null,
    floorplan: null,
  };
  const [selectedPerformances, setSelectedperformances] =
    useState(performancesObj);
  const [totalFee, setTotalFee] = useState<any>(0);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [paymentType, setPaymentType] = useState<string>("");
  const [optionalAddons, setOptionalAddons] = useState<IOptionalAddonsType>({
    digitalTicket: true,
    basicProtection: true,
  });
  useEffect(() => {
    const cart: IPerformance = JSON.parse(
      localStorage?.getItem("cart") || "{}"
    );
    const getDiscount = JSON.parse(localStorage?.getItem("appliedDiscount"));
    setAppliedDiscount(Number(getDiscount));
    setSelectedperformances(cart);
    const addons = JSON.parse(localStorage?.getItem("addons") || "{}");
    setAddons(addons);
    const event: IEventDetails = JSON.parse(
      localStorage?.getItem("event") || "{}"
    );
    setEventDetail(event);
    const paymentType: any = JSON.parse(
      localStorage?.getItem("paymentType") || "{}"
    );
    setPaymentType(paymentType);
    const processFee = cart?.tickets?.reduce((acc, value) => {
      const fee =
        Number(value.ticket.digital_ticket_box_office_fee) *
        value.ticket.on_hold;
      return acc + fee;
    }, 0);
    const storedTotalFee = localStorage?.getItem("totalFee") || 0;
    const storedOptionalAddons = JSON.parse(
      localStorage?.getItem("optionalAddons") || "{}"
    );
    setTotalFee(storedTotalFee);
    setOptionalAddons(storedOptionalAddons);
    const addOnCost =
      Number(addons?.insure?.quantity) * Number(addons?.insure?.cost) || 0;
    const ticketProcessFee = cart?.tickets?.reduce((acc, value) => {
      const fee = Number(value.ticket.price) * value.ticket.on_hold;
      const total = fee > 0 && fee + processFee;
      return acc + total;
    }, 0);

    const netPrice = ticketProcessFee + addOnCost;

    const getVatFee = () => {
      const fee = (netPrice / 100) * event?.data?.vat;
      return fee.toFixed(2);
    };

    const getTotalFee = () => {
      const total = Number(netPrice) + Number(getVatFee());
      // setTotalFee(total?.toFixed(2));
      return total.toFixed(2);
    };
    getTotalFee();
  }, []);
  const [selectedAddonsArray, setSelectedAddonsArray] = useState<any>([]);
  useEffect(() => {
    const ticketsCount = selectedPerformances?.tickets
      ?.map((item) => item.ticket.quantity || 0)
      ?.reduce((sum, onHold) => sum + onHold, 0);
    const selectedAddonsArray = addonOptions
      .filter((addon) => optionalAddons[addon.value])
      .map((addon) => ({
        ...addon,
        count: ticketsCount,
      }));
    setSelectedAddonsArray(selectedAddonsArray);
  }, [selectedPerformances]);
  const currentImage = eventDetail?.data?.galleries[0]?.img_name
    ? thumbnailURL + eventDetail?.data?.galleries[0]?.img_name
    : placeHolderImg;
  const getTicketCategory = (performance: IPerformance) => {
    const ticketsCount = performance?.tickets
      ?.map((x) => {
        return `${x.ticket.identifier} x ${x.ticket.quantity || 0}`;
      })
      ?.filter((l) => l !== null)
      ?.filter((l) => l !== undefined);

    return (
      <span className="mt-1.5 text-lg font-semibold">
        {ticketsCount?.join(", ")}
      </span>
    );
  };
  const handleAddToCalendar = () => {
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventDetail?.data?.detail?.name || ""
    )}&dates=${moment(selectedPerformances?.start_date).format(
      "YYYYMMDDTHHmmss"
    )}/${moment(selectedPerformances?.end_date).format(
      "YYYYMMDDTHHmmss"
    )}&details=${encodeURIComponent(
      "Event details: " + eventDetail?.data?.detail?.description || ""
    )}&location=${encodeURIComponent(
      eventDetail?.data?.venue?.detail?.address || ""
    )}&sprop=&sprop=name:`;

    window.open(googleCalendarUrl, "_blank");
  };
  const handleAddToWallet = () => {
    window.open("https://wallet.google/", "_blank");
  };
  const _getOptionalAddonsString = () => {
    const addonsArray = addonOptions
      ?.filter((addon) => optionalAddons?.[addon.value])
      ?.map((addon) => addon.label);
    return addonsArray?.length > 0 ? addonsArray?.join(", ") : "NA";
  };
  const renderContent = () => {
    const { t } = useTranslation();
    return (
      <>
        <div className="px-0 lg:p-6">
          <h5 className="text-3xl font-semibold lg:text-4xl">{t("congratulation")} 🎉</h5>
          <span className="mt-4 block text-md">
            you have successfully completed your purchase.
          </span>
        </div>
        <div className="px-0 lg:p-6 flex flex-wrap">
          <div className="w-full lg:w-3/5 lg:pr-16 space-y-6">
            <BookingSection
              eventDetail={eventDetail}
              selectedPerformances={selectedPerformances}
              optionalAddons={optionalAddons}
            />
          </div>
          <div className="w-full lg:w-2/5 lg:block">
            <TransactionSummary
              selectedPerformances={selectedPerformances}
              totalFee={totalFee}
              paymentType={paymentType}
              selectedAddonsArray={selectedAddonsArray}
              payment_currency={
                selectedPerformances?.tickets[0]?.ticket?.payment_currency
              }
              appliedDiscount={appliedDiscount}
              vat={5}
            />
          </div>
        </div>

        <div className="w-full lg:w-7/12 flex flex-col sm:rounded-2xl space-y-10 px-0 sm:p-6 xl:p-8">
          <div className="flex flex-col sm:flex-row item-center gap-3">
            <ButtonSecondary
              onClick={toPDF}
              rounded="rounded-full"
              sizeClass="w-full py-3 sm:px-4"
              textColor="text-black"
              borderColor="border-0"
              bgColor="bg-grey-350"
              fontWeight="font-semibold"
              fontSize="text-sm"
            >
              {t("downloadBooking")}
            </ButtonSecondary>
            <ButtonSecondary
              onClick={handleAddToCalendar}
              rounded="rounded-full"
              sizeClass="w-full py-3 sm:px-4"
              textColor="text-black"
              borderColor="border-0"
              fontWeight="font-semibold"
              bgColor="bg-grey-350"
              fontSize="text-sm"
            >
              {t("addToCalender")}
            </ButtonSecondary>
            <ButtonSecondary
              onClick={handleAddToWallet}
              rounded="rounded-full"
              sizeClass="w-full py-3 sm:px-4"
              borderColor="border-0"
              textColor="text-black"
              fontWeight="font-semibold"
              bgColor="bg-grey-350"
              fontSize="text-sm"
            >
              {t("addToWallet")}
            </ButtonSecondary>
          </div>
        </div>
        <div className="w-full space-y-10 px-0 sm:p-6 xl:p-8 xl:pt-3 sm:pt-3">
          <span className="text-black dark:text-neutral-300">
            Your electronic ticket will be sent to your registered email address
            and also can be found under 'My Tickets' section in your tixbox
            account.
          </span>
        </div>
      </>
    );
  };

  return (
    <div className={`nc-PayPage`}>
      <main className="container mt-11 mb-24 lg:mb-32 ">
        {renderContent()}{" "}
      </main>
    </div>
  );
};

export default PayPage;
