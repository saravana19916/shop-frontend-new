"use client";

import React, { FC, useEffect, useState } from "react";
import { IEventData, IEventDetails, IPerformance } from "@/model/IEventDetail";

import CartAPI, { IPostCartPayload } from "@/services/cart.services";
import PurchaseSessionAPI from "@/services/purchase-session.services";
import { toast, ToastContainer } from "react-toastify";
import { boolean } from "zod";
import Breadcrumb, { IBreadCrumbProps } from "@/shared/Breadcrumb";
import BackBreadCrumb from "@/shared/BackBreadCrumb";
import EventDetails from "./eventDetails";
import TicketSection from "./TicketSection";
import CartSection from "./CartSection";
import TitleCard from "@/shared/TitleCard";
import {
  useAddToCart,
  useGetCart,
  useGetCartDetailById,
} from "@/queries/cart.query";
import { useGetEventDetailById } from "@/queries/eventDetail.query";
import { AxiosError } from "axios";
import SessionCountDown from "@/shared/SessionCountDown";
import moment from "moment-timezone";
import SessionExpiryNavigation from "@/shared/SessionExpiryNavigation";

const page = ({ params }) => {
  const encrypted_purchase_session_id = params?.encrypted_purchase_session_id;
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
    quantity: 0,
    tickets: [],
    venuehall: null,
    floorplan: null,
  };
  const [breadCrumbsList, setBreadCrumbsList] = useState<IBreadCrumbProps[]>(
    []
  );

  const [selectedPerformances, setSelectedPerformances] =
    useState(performancesObj);
  const _createPurchaseSession = async (eventId) => {
    const createPurchaseSession =
      await PurchaseSessionAPI?.getCreatePurchaseSession(eventId);
    console.log(createPurchaseSession, "createPurchaseSession");
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingCart, setIsFetchingCart] = useState<boolean>(false);
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
  const { data: eventCartData, isLoading: isCartLoading } =
    useGetCartDetailById({
      initialData: {
        id: encrypted_purchase_session_id,
      },
      enabled: !!encrypted_purchase_session_id,
      key: `${encrypted_purchase_session_id}_ticket_selection`,
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
  const { mutate: addToCart, isPending: isAdding } = useAddToCart();
  const handleCountOnchange = async (value: number, ticketId: number) => {
    const ticket = selectedPerformances?.tickets?.find(
      (ticket) => ticket?.ticket_id === ticketId
    );

    if (!ticket) return;
    const quantity = value - (ticket?.ticket?.quantity || 0);
    const data: IPostCartPayload = {
      event_id: ticket?.ticket?.event_id,
      performance_id: ticket?.performance_id,
      ticket_id: ticket?.ticket_id,
      quantity,
    };

    // API Call to Add to Cart
    addToCart(data, {
      onSuccess: (response) => {
        const updatedTicket = {
          ...ticket,
          ticket: {
            ...ticket?.ticket,
            quantity: value,
          },
        };

        setSelectedPerformances((prev) => {
          return {
            ...prev,
            tickets: prev?.tickets?.map((ticket) =>
              ticket?.ticket_id === ticketId ? updatedTicket : ticket
            ),
          };
        });
        refetchCartData();
      },
      onError: (error: AxiosError) => {
        const errorResponse: any = error?.response?.data;
        const errorMessage =
          errorResponse?.error?.message || "Something went wrong!";
        toast.error(errorMessage);
        refetchCartData();
      },
    });
  };
  const resetSelectedPerformance = () => {
    setSelectedPerformances(performancesObj);
  };
  const handlePerformanceOnChange = async (selectedPerformance) => {
    setIsFetchingCart(true);
    const eventId = selectedPerformance?.event_id;
    const cartDetails = await CartAPI.getCart(eventId);
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
  const { data: cartData, refetch: refetchCartData } = useGetCart({
    key: "CART_DATA",
  });
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
  return (
    <>
      <div className="container flex flex-wrap ListingDetailPage__content">
        {isCartLoading || isEventDetailsLoading ? (
          <>
            <div className="h-96 w-full rounded-md bg-gray-300 animate-pulse my-10"></div>
          </>
        ) : (
          <>
            {!eventCartData?.data?.id || isSessionExpired ? (
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
                <TitleCard title="Choose Ticket" />
                {/* <EventDetails
              eventDetail={eventData}
              selectedPerformances={selectedPerformances}
            /> */}
                <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 mb-8 space-y-6 p-2">
                  <TicketSection
                    handleCountOnchange={handleCountOnchange}
                    selectedPerformances={selectedPerformances}
                    eventDetail={eventData}
                    isFetchingCart={isFetchingCart}
                    isAddingCart={isAdding}
                  />
                </div>
                <div className="w-full lg:w-2/5 xl:w-1/3 lg:block mb-8 mt-2">
                  <CartSection
                    selectedPerformances={selectedPerformances}
                    eventDetail={eventData}
                    resetSelectedPerformance={resetSelectedPerformance}
                    handlePerformanceOnChange={handlePerformanceOnChange}
                    encrypted_purchase_session_id={
                      encrypted_purchase_session_id
                    }
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default page;
