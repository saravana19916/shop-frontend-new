"use client";

import React, { FC, useEffect, useState } from "react";
import EventDetails from "../../ticket-selection/[encrypted_purchase_session_id]/eventDetails";
import { IEventData, IEventDetails, IPerformance } from "@/model/IEventDetail";
import {
  Pricing,
  SeatsioSeatingChart,
  SelectableObject,
  TicketTypeJson,
} from "@seatsio/seatsio-react";
import moment from "moment-timezone";
import ManualSelectionSidebar from "./ManualSelectionSidebar";
import CartAPI from "@/services/cart.services";
import PurchaseSessionAPI from "@/services/purchase-session.services";
import Breadcrumb, { IBreadCrumbProps } from "@/shared/Breadcrumb";
import BackBreadCrumb from "@/shared/BackBreadCrumb";
import TitleCard from "@/shared/TitleCard";
import { useGetCartDetailById } from "@/queries/cart.query";
import { useGetEventDetailById } from "@/queries/eventDetail.query";
import SessionCountDown from "@/shared/SessionCountDown";
import SessionExpiryNavigation from "@/shared/SessionExpiryNavigation";
interface IProps {}

const ticketTypeWithColor = [
  {
    type: "VIP One",
    color: "#992C4E",
  },
  {
    type: "VIP Two",
    color: "#CD254A",
  },
  {
    type: "VIP Three",
    color: "#E9803D",
  },
  {
    type: "VIP Four",
    color: "#FCA700",
  },
  {
    type: "Gold One",
    color: "#58B44F",
  },
  {
    type: "Gold Two",
    color: "#49A3BA",
  },
];

const page = ({ params }) => {
  const encrypted_purchase_session_id = params?.encrypted_purchase_session_id;
  const { data: eventCartData, isLoading: isCartLoading } =
    useGetCartDetailById({
      initialData: {
        id: encrypted_purchase_session_id,
      },
      enabled: !!encrypted_purchase_session_id,
      key: "encrypted_purchase_session_id",
    });
  const eventId = eventCartData?.data?.event_id;
  const {
    data: eventData,
    refetch: refetchEventData,
    isLoading: isEventDetailsLoading,
  } = useGetEventDetailById({
    initialData: {
      id: eventId,
    },
    enabled: !!eventId,
    key: `EVENT_DATA_${eventId}`,
  });
  useEffect(() => {
    if (eventId) {
      refetchEventData();
    }
  }, [eventId]);
  useEffect(() => {
    eventId && eventData && _getCartDetails();
  }, [eventId, eventData]);
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

  const [breadCrumbsList, setBreadCrumbsList] = useState<IBreadCrumbProps[]>(
    []
  );
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
  useEffect(() => {
    if (!eventCartData?.data?.end_date) return;

    const checkSessionExpiry = () => {
      const now = moment();
      const end = moment.utc(eventCartData?.data?.end_date).local();
      setIsSessionExpired(now.isAfter(end));
    };

    checkSessionExpiry();
  }, [eventCartData?.data?.end_date]);
  useEffect(() => {
    if (eventData && eventData?.data?.identifier) {
      const eventName = eventData?.data?.identifier;
      const breadCrumbs: IBreadCrumbProps[] = [
        {
          title: "Home",
          isHome: true,
          isActive: false,
          href: "/home",
        },
        {
          title: `${eventName?.toLowerCase()}`,
          isHome: false,
          isActive: false,
          href: `/${eventData?.data?.slugified_identifier}`,
        },
        {
          title: "Ticket Selection",
          isHome: false,
          isActive: false,
          href: "/ticket-selection",
        },
        {
          title: "Manual Selection",
          isHome: false,
          isActive: true,
          href: "/manual-ticket-selection",
        },
      ];
      setBreadCrumbsList(breadCrumbs);
    }
  }, [eventData]);
  const pricing: Pricing = [
    { category: "General Admission", price: 80 },
    { category: "GOLD", price: 100 },
    { category: "VIP", price: 130 },
  ];
  const [identifierCount, setIdentifierCount] =
    useState<IPerformance>(performancesObj);
  const [selectedPerformances, setSelectedPerformances] =
    useState(performancesObj);
  useEffect(() => {
    const selectedShowDetails = JSON.parse(
      sessionStorage?.getItem("selectedShowDetails")
    );
    setSelectedShowDetails(selectedShowDetails);
  }, []);
  const [selectedShowDetails, setSelectedShowDetails] = useState<any>();
  const [selectedSeats, setSelectedSeats] = useState([]);
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
  const _onObjectSelected = (
    object: SelectableObject,
    selectedTicketType: TicketTypeJson
  ) => {
    console.log(object, "selected");

    const createLabel = `${object?.labels?.parent} ${object?.labels?.own}`;

    // if (
    //   selected?.category?.label === "B" ||
    //   selected?.category?.label === "A"
    // ) {
    //   const ticket = selectedPerformances?.tickets?.find(
    //     (ticket) => ticket?.ticket?.identifier == "VIP"
    //   );
    //   const updatedTicket = {
    //     ...ticket,
    //     ticket: {
    //       ...ticket?.ticket,
    //       quantity: (ticket?.ticket?.quantity || 0) + 1,
    //     },
    //   };
    //   console.log(updatedTicket, "updatedTicket");

    //   setSelectedPerformances((prev) => {
    //     return {
    //       ...prev,
    //       tickets: prev?.tickets?.map((ticket) =>
    //         ticket?.ticket?.identifier === "VIP" ? updatedTicket : ticket
    //       ),
    //     };
    //   });
    // }
    if (!selectedShowDetails) {
      return;
    }
    setSelectedSeats((prev) => {
      return [...prev, createLabel];
    });

    const ticketType = object.category.label;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingCart, setIsFetchingCart] = useState<boolean>(false);
  const resetSelectedPerformance = () => {
    setSelectedPerformances(performancesObj);
  };
  const _createPurchaseSession = async (eventId) => {
    const createPurchaseSession =
      await PurchaseSessionAPI?.getCreatePurchaseSession(eventId);
  };
  const _getCartDetails = async () => {
    setIsLoading(true);
    const selectedPerformanceId = JSON.parse(
      localStorage.getItem("selectedPerformanceId")
    );
    const selectedPerformance = eventData?.data?.performances?.find(
      (performance) => performance?.id == Number(selectedPerformanceId)
    );
    if (eventCartData?.success) {
      const performance = eventCartData?.data?.performances?.find(
        (performance) => performance?.id == selectedPerformanceId
      );
      const updatedPerformanceTickets = selectedPerformance?.tickets?.map(
        (ticket) => {
          const cartTicket = performance?.tickets?.find(
            (tic) => tic?.id === ticket?.ticket_id
          );
          const updatedCartTicket = {
            ...ticket,
            ticket: { ...ticket?.ticket, quantity: cartTicket?.quantity || 0 },
          };
          return updatedCartTicket;
        }
      );
      const updatedPerformance = {
        ...selectedPerformance,
        tickets: updatedPerformanceTickets,
      };
      setSelectedPerformances(updatedPerformance);
    } else {
      setSelectedPerformances(selectedPerformance);
    }
    setIsLoading(false);
  };
  const handlePerformanceOnChange = async (selectedPerformance) => {
    setIsFetchingCart(true);
    const eventId = selectedPerformance?.event_id;
    const cartDetails = await CartAPI.getCart(eventId);
    if (cartDetails?.status === 404) {
      _createPurchaseSession(eventId);
    }
    if (cartDetails?.status === 200 || cartDetails?.status === 201) {
      const performance = cartDetails?.data?.data?.performances?.find(
        (performance) => performance?.id == selectedPerformance?.id
      );
      const updatedPerformanceTickets = selectedPerformance?.tickets?.map(
        (ticket) => {
          const cartTicket = performance?.tickets?.find(
            (tic) => tic?.id === ticket?.ticket_id
          );
          const updatedCartTicket = {
            ...ticket,
            ticket: { ...ticket?.ticket, quantity: cartTicket?.quantity || 0 },
          };
          return updatedCartTicket;
        }
      );
      const updatedPerformance = {
        ...selectedPerformance,
        tickets: updatedPerformanceTickets,
      };
      setSelectedPerformances(updatedPerformance);
    }
    setIsFetchingCart(false);
  };
  return (
    <>
      <div className="container flex flex-wrap">
        {isCartLoading || isEventDetailsLoading ? (
          <>
            <div className="h-96 w-full rounded-md bg-gray-300 animate-pulse my-10"></div>
          </>
        ) : (
          <>
            {(!isCartLoading || !isEventDetailsLoading) &&
              (!eventCartData?.data?.id || isSessionExpired ? (
                <>
                  <SessionExpiryNavigation
                    identifier={eventData?.data?.slugified_identifier}
                  />
                </>
              ) : (
                <>
                  <div className="flex w-full justify-between">
                    <BackBreadCrumb />
                    <SessionCountDown
                      endTime={eventCartData?.data?.end_date}
                      setSessionExpiry={setIsSessionExpired}
                    />
                  </div>
                  <TitleCard title="Manual Seat Selection" />

                  {/* <EventDetails
          eventDetail={eventDetail}
          selectedPerformances={selectedPerformances}
        /> */}
                  <div className="w-full lg:w-3/5 xl:w-2/3">
                    <div className="flex flex-wrap gap-4 mb-10">
                      {ticketTypeWithColor?.map((ticket) => (
                        <>
                          <div className="border-0 rounded-full px-4 py-2 bg-zinc-150 dark:bg-neutral-800 font-normal text-xs flex justify-between text-center align-middle gap-2">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{
                                backgroundColor: `${ticket.color}`,
                              }}
                            ></div>{" "}
                            <span className="text-xs font-medium">
                              {ticket.type}
                            </span>
                          </div>
                        </>
                      ))}
                    </div>
                    <div className="lg:pr-10 md:mb-8 mb-2 md:p-4 p-2 pt-0 rounded-xl">
                      <SeatsioSeatingChart
                        workspaceKey="73c22c5c-d615-450e-821e-b8891af3c763"
                        event="e4f5cdd9-ed7e-4a2a-bacb-7fc413837a51"
                        region="eu"
                        pricing={pricing}
                        priceFormatter={(price) => "AED" + price}
                        onObjectSelected={_onObjectSelected}
                        onObjectDeselected={_onObjectDeselected}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-2/5 xl:w-1/3 lg:block mb-8">
                    <ManualSelectionSidebar
                      selectedPerformances={selectedPerformances}
                      selectedSeats={selectedSeats}
                      eventDetail={eventData}
                      resetSelectedPerformance={resetSelectedPerformance}
                      handlePerformanceOnChange={handlePerformanceOnChange}
                      encrypted_purchase_session_id={
                        encrypted_purchase_session_id
                      }
                    />
                  </div>
                </>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default page;
