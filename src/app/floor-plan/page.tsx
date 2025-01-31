"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SeatsioSeatingChart, Pricing } from "@seatsio/seatsio-react";

import orderImage from "@/images/order.png";

import {
  ClockIcon,
  CalendarIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import "react-toastify/dist/ReactToastify.css";

import { IEventDetails, IPerformance } from "@/model/IEventDetail";
import ButtonPrimary from "@/shared/ButtonPrimary";
import moment from "moment";
import TicketCategory from "../(listing-detail)/event-detail/TicketCategory";
import OrderSummary from "../(listing-detail)/event-detail/OrderSummary";
import FloorPlanEventDetails from "./FloorPlanEventDetails";
import GalleriesModel from "../[id]/GalleriesModel";
import GuestsInput from "../(listing-detail)/event-detail/GuestsInput";
import DateRangeInput from "./DateRangeInput";
import orderServices from "@/services/order.services";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import AuthService from "@/services/auth.service";

const FloorPlanPage = () => {
  const router = useRouter();
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
  const addOnObj = {
    eventId: null,
    insure: {
      quantity: null,
      cost: null,
    },
  };
  const [eventDetails, setEventDetails] = useState<IEventDetails>(null);
  const [selectedShowDetails, setSelectedShowDetails] = useState<any>();
  const [isOpenGalleries, setIsOpenGalleries] = useState<boolean>(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [enableDates, setEnableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState<Date>(null);
  const [showsStartDate, setShowsStartDate] = useState<Date>(new Date());
  const [showsEndDate, setShowsEndDate] = useState<Date>(new Date());
  const [totalReserve, setTotalReserve] = useState<number>(0);
  const [selectDatePerformances, setSelectDatePerformances] = useState<
    IPerformance[]
  >([]);
  const [identifierCount, setIdentifierCount] =
    useState<IPerformance>(performancesObj);
  const [selectedShow, setSelectedShow] = useState("");
  const [addons, setAddons] = useState<any>();
  useEffect(() => {
    const eventDetail = JSON.parse(sessionStorage?.getItem("event"));
    const selectedShowDetails = JSON.parse(
      sessionStorage?.getItem("selectedShowDetails")
    );
    const addons = JSON.parse(sessionStorage?.getItem("addons"));
    setAddons(addons);
    setEventDetails(eventDetail);
    setSelectedShowDetails(selectedShowDetails);
    setSelectedDate(selectedShowDetails?.start_date);
    setEnableDates(
      orderServices.getAllPerformancesDates(eventDetail?.data?.performances) ||
        []
    );
  }, []);
  const handleAddOnChange = (value: any) => setAddons(value);
  const handleProceedToCheckout = () => {
    localStorage.setItem("cart", JSON.stringify(identifierCount));
    localStorage.setItem("event", JSON.stringify(eventDetails));
    localStorage.setItem("addons", JSON.stringify(addons));
    sessionStorage?.setItem("cart", JSON.stringify(identifierCount));
    sessionStorage?.setItem("event", JSON.stringify(eventDetails));
    sessionStorage?.setItem("addons", JSON.stringify(addons));
    if (identifierCount?.id !== 0) {
      const user: any | undefined | null = AuthService.authUser();
      if (user != null) {
        // router.push("/checkout");
      } else {
        router.push("/loginoptions");
      }
    } else {
      toast.error("Please select a seat from floor plan!");
    }
  };

  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        setPosition({
          x: event.clientX - startPosition.x,
          y: event.clientY - startPosition.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startPosition]);
  const _getBookDate = (date: Date) => {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", JSON.stringify(date));
    setIdentifierCount(performancesObj);
    setSelectedShow("");
    setSelectDatePerformances(
      orderServices.getPerformancesTime(eventDetails?.data?.performances, date)
    );
  };
  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => prevZoomLevel * 1.25);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) => prevZoomLevel * 0.8);
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartPosition({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };
  const setGalleriesModelStatus = (res: boolean) => {
    setIsOpenGalleries(res);
  };
  const pricing: Pricing = [
    { category: "General Admission", price: 80 },
    { category: "GOLD", price: 100 },
    { category: "VIP", price: 130 },
  ];
  const updateOnHoldForTicket = (
    label: string,
    type: "select" | "deselect",
    tickets: any[]
  ) => {
    const updatedTickets = [...tickets];
    const ticketIndex = label === "VIP" ? 0 : 1;

    if (type === "select") {
      updatedTickets[ticketIndex].ticket.on_hold++;
    } else {
      updatedTickets[ticketIndex].ticket.on_hold--;
    }

    return updatedTickets;
  };

  const _setOnHoldValues = (label: string, type: "select" | "deselect") => {
    if (selectedShowDetails?.tickets?.length === 0) return;

    const updatedTickets = updateOnHoldForTicket(
      label,
      type,
      selectedShowDetails?.tickets
    );
    setIdentifierCount({
      ...selectedShowDetails,
      tickets: updatedTickets,
    });
  };
  const _onObjectSelected = (selected) => {
    if (!selectedShowDetails) {
      return;
    }
    setSelectedSeats((prev) => {
      return [...prev, selected.id];
    });

    const ticketType = selected.category.label;
    _setOnHoldValues(ticketType, "select");
  };

  const _onObjectDeselected = (deSelected) => {
    if (!selectedShowDetails) {
      return;
    }
    const ticketType = deSelected.category.label;

    setSelectedSeats((prevSeats) => {
      const updatedSeats = prevSeats.filter(
        (seatId) => seatId !== deSelected.id
      );

      return updatedSeats;
    });

    _setOnHoldValues(ticketType, "deselect");
  };
  useEffect(() => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  }, [selectedSeats]);
  const { t } = useTranslation();
  return (
    <>
      <main className="container ListingDetailPage__content">
        <ToastContainer />
        <FloorPlanEventDetails
          eventDetails={eventDetails}
          onOpenGalleriesModel={setIsOpenGalleries}
        />
        <div className="flex flex-wrap">
          <div className="w-full lg:w-2/3 mb-12 lg:pr-10">
            <div className="listingSection__wrap" style={{ padding: 0 }}>
              <div
                className="p-4 rounded-t-2xl bg-neutral-200 dark:bg-neutral-800 cursor-grab"
                onMouseDown={handleMouseDown}
                style={{
                  cursor: isDragging ? "grabbing" : "grab",
                }}
              >
                <h2 className="text-xl lg:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {t("floorPlan")}
                </h2>
              </div>

              <div className="w-full relative overflow-hidden flex justify-center">
                {/* <Image
                  src={orderImage}
                  alt="Floor Plan"
                  width={608}
                  height={250}
                  style={{
                    transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                    transition: "transform 0.3s",
                  }}
                  className="hover:scale-125"
                />
                <div className="absolute bottom-0 left-0 m-4 flex items-center gap-3">
                  <button
                    onClick={handleZoomIn}
                    className="text-neutral rounded-sm"
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      backgroundColor: "#EEEEEE",
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="text-neutral rounded-sm"
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      backgroundColor: "#EEEEEE",
                    }}
                  >
                    -
                  </button>
                </div> */}
                <SeatsioSeatingChart
                  workspaceKey="73c22c5c-d615-450e-821e-b8891af3c763"
                  event="dbf368cb-cef9-450e-b80a-03e004573b55"
                  region="eu"
                  pricing={pricing}
                  priceFormatter={(price) => "AED" + price}
                  onObjectSelected={_onObjectSelected}
                  onObjectDeselected={_onObjectDeselected}
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="listingSection__wrap" style={{ padding: 0 }}>
              <div className="p-4 rounded-t-2xl bg-neutral-200 dark:bg-neutral-800">
                <h2 className="text-xl lg:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {t("legends")}
                </h2>
              </div>

              <div className="px-4">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3">
                  <div className="mb-3">
                    <div className="flex gap-3">
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "10%",
                          backgroundColor: "#0C359E",
                        }}
                        className="flex items-center justify-center"
                      />
                      <span className="block mb-1">Category 1</span>
                      <span>
                        <i
                          style={{ marginTop: "3px" }}
                          className={`la la-info-circle text-xl`}
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex gap-3">
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "10%",
                          backgroundColor: "#FC6736",
                        }}
                        className="flex items-center justify-center"
                      />
                      <span className="block mb-1">Category 2</span>
                      <span>
                        <i
                          style={{ marginTop: "3px" }}
                          className={`la la-info-circle text-xl`}
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex gap-3">
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "10%",
                          backgroundColor: "#4CAF50",
                        }}
                        className="flex items-center justify-center"
                      />
                      <span className="block mb-1">Category 3</span>
                      <span>
                        <i
                          style={{ marginTop: "3px" }}
                          className={`la la-info-circle text-xl`}
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex gap-3">
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "10%",
                          backgroundColor: "#430A5D",
                        }}
                        className="flex items-center justify-center"
                      />
                      <span className="block mb-1">Category 4</span>
                      <span>
                        <i
                          style={{ marginTop: "3px" }}
                          className={`la la-info-circle text-xl`}
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex gap-3">
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "10%",
                          backgroundColor: "#FF004D",
                        }}
                        className="flex items-center justify-center"
                      />
                      <span className="block mb-1">Category 5</span>
                      <span>
                        <i
                          style={{ marginTop: "3px" }}
                          className={`la la-info-circle text-xl`}
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex gap-3">
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "10%",
                          backgroundColor: "#FFD23F",
                        }}
                        className="flex items-center justify-center"
                      />
                      <span className="block mb-1">Category 6</span>
                      <span>
                        <i
                          style={{ marginTop: "3px" }}
                          className={`la la-info-circle text-xl`}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mb-12">
              <div
                className="listingSection__wrap rounded-t-2xl"
                style={{ padding: 0 }}
              >
                <div className="p-4 rounded-t-2xl bg-neutral-200 dark:bg-neutral-800">
                  <h2 className="text-xl lg:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {t("selection")}
                  </h2>
                </div>

                <div className="p-4 pt-0">
                  <div className="flex flex-row border border-neutral-200 dark:border-neutral-700 rounded-3xl mb-4">
                    <DateRangeInput
                      eventStartDate={eventDetails?.data?.start_date}
                      eventEndDate={eventDetails?.data?.end_date}
                      enableDates={enableDates}
                      selectDate={selectedDate}
                      showsStartDate={showsStartDate}
                      showsEndDate={showsEndDate}
                      onSelectDate={_getBookDate}
                    />
                    {/* <div className="text-neutral-700 dark:text-neutral-400">
                      <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                    </div> */}
                    {/* <div className="flex-grow text-left">
                      <span className="block xl:text-lg font-semibold">
                        {moment(selectedShowDetails?.start_date).format(
                          "MMM DD YYYY"
                        )}{" "}
                        -{" "}
                        {moment(selectedShowDetails?.start_date).format("dddd")}{" "}
                      </span>
                    </div> */}
                  </div>
                  <div className="flex flex-row border border-neutral-200 dark:border-neutral-700 rounded-3xl mb-4 p-4 gap-3">
                    <div className="text-neutral-700 dark:text-neutral-400">
                      <ClockIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                    </div>
                    <div className="flex-grow text-left">
                      <span className="block xl:text-lg font-semibold">
                        {moment(selectedShowDetails?.start_date).format(
                          "hh:mm a"
                        )}{" "}
                        -{" "}
                        {moment(selectedShowDetails?.end_date).format(
                          "hh:mm a"
                        )}
                      </span>
                    </div>
                  </div>
                  <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl mb-4">
                    <GuestsInput
                      className="flex-1 "
                      title="add-ons"
                      subTitle="addOnServices&Goodies"
                      eventDetail={eventDetails}
                      onSelectAddOn={handleAddOnChange}
                      eventAddon={addons}
                    />
                  </form>
                  {selectedSeats?.length > 0 && (
                    <div className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl mb-4">
                      <div className="p-5">
                        <div className="flex flex-col">
                          <span className="text-sm text-neutral-400">
                            {t("selectedSeats")}
                          </span>
                          <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4 mt-1.5">
                            {selectedSeats?.map((seat, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2 font-semibold"
                              >
                                <ShieldCheckIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                                <span>{seat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {identifierCount?.id !== 0 && (
                    <>
                      <div className="mb-4 p-2">
                        <OrderSummary
                          performance={identifierCount}
                          payment_currency={
                            identifierCount?.tickets[0]?.ticket
                              ?.payment_currency
                          }
                          addons={addons}
                          vat={eventDetails?.data?.vat}
                          setTotalReserve={setTotalReserve}
                        />
                      </div>
                    </>
                  )}
                  <ButtonPrimary
                    sizeClass="w-full py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
                    onClick={handleProceedToCheckout}
                  >
                    {t("proceedToCheckOut")}
                  </ButtonPrimary>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <GalleriesModel
        openGalleri={isOpenGalleries}
        onChangeStatusGalleri={setGalleriesModelStatus}
        eventDetail={eventDetails}
      />
    </>
  );
};

export default FloorPlanPage;
