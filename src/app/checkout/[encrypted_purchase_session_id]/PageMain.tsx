"use client";

import { Tab } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IEventDetails, IPerformance } from "@/model/IEventDetail";
import moment from "moment";
import placeHolderImg from "@/images/placeholder-small.png";

import "./custome-nternational-phone-input.scss";
import NumberOTP from "./NumberOTP";
import EmailOTP from "./EmailOTP";
import AuthService from "@/services/auth.service";

import { useTranslation } from "react-i18next";

import { IBreadCrumbProps } from "@/shared/Breadcrumb";
import BackBreadCrumb from "@/shared/BackBreadCrumb";
import { useGetCartDetailById } from "@/queries/cart.query";
import { useGetEventDetailById } from "@/queries/eventDetail.query";
import SessionCountDown from "@/shared/SessionCountDown";
import SessionExpiryNavigation from "@/shared/SessionExpiryNavigation";
import CheckOutOrderSummary from "./CheckOutOrderSummary";
import ReviewOrder from "./ReviewOrder";
export interface CheckOutPagePageMainProps {
  className?: string;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
}) => {
  const router = useRouter();
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split("/");
      const sessionIdFromUrl = pathParts[pathParts.length - 1];
      if (sessionIdFromUrl) {
        setSessionId(sessionIdFromUrl);
      }
    }
  }, []);
  const {
    data: eventCartData,
    isLoading: isCartLoading,
    refetch: refetchCartData,
    isRefetching: isRefetchingCartData,
  } = useGetCartDetailById({
    initialData: {
      id: sessionId,
    },
    enabled: !!sessionId,
    key: `${sessionId}_checkout`,
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
  }, [eventId, eventData, eventCartData]);
  const thumbnailURL = process.env.AWS_CLOUD_FRONT_URL + "images/events/";
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
  const [selectedPerformances, setSelectedPerformances] =
    useState(performancesObj);

  const [isNumberOTPModalOpen, setIsNumberOTPModalOpen] =
    useState<boolean>(false);
  const [isEmailOTPModalOpen, setIsEmailOTPModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<any>();
  const [isLogin, setIsLogin] = useState(false);

  const [userData, setUserData] = useState<any>(null);
  const [breadCrumbsList, setBreadCrumbsList] = useState<IBreadCrumbProps[]>(
    []
  );
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
          title: "Checkout",
          isHome: false,
          isActive: true,
          href: "/checkout",
        },
      ];
      setBreadCrumbsList(breadCrumbs);
    }
  }, [eventData]);
  useEffect(() => {
    const user: any | undefined | null = AuthService.authUser();
    setUserData(user);
    if (user && user.user && user.user.profile) {
      setUserEmail(user.user.email);
      setUserPhone(user.user.profile.phone_number);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);
  useEffect(() => {
    const formattedUserPhone = userPhone && userPhone?.replace("+", "");
    const formattedPhoneNumber = userData?.user?.profile?.phone_number?.replace(
      "+",
      ""
    );

    if (
      formattedUserPhone &&
      formattedPhoneNumber &&
      formattedUserPhone === formattedPhoneNumber
    ) {
      setIsPhoneNumberVerified(true);
    } else {
      setIsPhoneNumberVerified(false);
    }

    if (
      userEmail &&
      userData?.user?.email &&
      userEmail == userData?.user?.email
    ) {
      setIsEmailAddressVerified(true);
    } else {
      setIsEmailAddressVerified(false);
    }
  }, [userPhone, userEmail, userData]);
  const [isPhoneNumberVerified, setIsPhoneNumberVerified] =
    useState<boolean>(false);
  const [isEmailAddressVerified, setIsEmailAddressVerified] =
    useState<boolean>(false);
  const setNumberOPTModelStatus = (res: boolean) => {
    setIsNumberOTPModalOpen(res);
  };
  const setEmailOPTModelStatus = (res: boolean) => {
    setIsEmailOTPModalOpen(res);
  };

  const currentImage = eventData?.data?.galleries[0]?.img_name
    ? thumbnailURL + eventData?.data?.galleries[0]?.img_name
    : placeHolderImg;

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const _getCartDetails = async () => {
    setIsLoading(true);
    if (typeof window !== "undefined") {
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
              ticket: {
                ...ticket?.ticket,
                quantity: cartTicket?.quantity || 0,
              },
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
    }
    setIsLoading(false);
  };

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

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8 sticky top-30 lg:shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <Image
                className="object-cover"
                alt=""
                width={0}
                height={0}
                sizes="200px"
                src={currentImage}
              />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              {selectedPerformances?.start_date ? (
                <>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1 flex items-center gap-1">
                    {<CalendarIcon className="w-4 h-4" />}
                    <span>
                      {moment(selectedPerformances?.start_date).format(
                        "DD MMM YYYY"
                      )}
                    </span>
                  </span>
                </>
              ) : (
                <></>
              )}

              <span className="text-base font-medium mt-1 block">
                {eventData?.data?.detail?.name || ""}
              </span>
            </div>

            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              <i className="las la-map-marker-alt"></i>
              <span className="ml-1">
                {" "}
                {eventData?.data?.venue?.detail?.address || ""}
              </span>
            </span>
          </div>
        </div>
        <CheckOutOrderSummary eventCartData={eventCartData} />
      </div>
    );
  };
  const hasQuantity = selectedPerformances?.tickets?.some(
    (ticket) => ticket?.ticket?.quantity > 0
  );

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      {isCartLoading || isEventDetailsLoading ? (
        <>
          <div className="container">
            <div className="h-96 w-full rounded-md bg-gray-300 animate-pulse my-10"></div>
          </div>
        </>
      ) : (
        <>
          {!eventCartData?.data?.id || isSessionExpired ? (
            <>
              <div className="container">
                <SessionExpiryNavigation
                  identifier={eventData?.data?.slugified_identifier}
                />
              </div>
            </>
          ) : (
            <>
              <>
                <div className="container">
                  <div className="flex w-full justify-between">
                    <BackBreadCrumb />
                    <SessionCountDown
                      endTime={eventCartData?.data?.end_date}
                      setSessionExpiry={setIsSessionExpired}
                    />
                  </div>
                  {/* <Breadcrumb breadCrumbsList={breadCrumbsList} /> */}
                </div>
                <main className="container mt-2 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
                  <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">
                    <ReviewOrder
                      userData={userData}
                      hasQuantity={hasQuantity}
                      selectedPerformances={selectedPerformances}
                      sessionId={sessionId}
                      eventData={eventData}
                      eventCartData={eventCartData}
                      refetchCartData={refetchCartData}
                      setIsNumberOTPModalOpen={setIsNumberOTPModalOpen}
                      isLogin={isLogin}
                      setIsEmailOTPModalOpen={setIsEmailOTPModalOpen}
                      userPhone={userPhone}
                      setUserPhone={setUserPhone}
                      userEmail={userEmail}
                      setUserEmail={setUserEmail}
                      isEmailAddressVerified={isEmailAddressVerified}
                      isPhoneNumberVerified={isPhoneNumberVerified}
                      setEmailOPTModelStatus={setEmailOPTModelStatus}
                      setNumberOPTModelStatus={setNumberOPTModelStatus}
                    />
                  </div>
                  <div className="sm:w-full lg:w-2/5 xl:w-1/3 lg:block md:flex-grow">
                    {renderSidebar()}
                  </div>
                </main>
                <NumberOTP
                  openOTP={isNumberOTPModalOpen}
                  onChangeStatus={setNumberOPTModelStatus}
                  userPhone={userPhone}
                />
                <EmailOTP
                  openOTP={isEmailOTPModalOpen}
                  onChangeStatus={setEmailOPTModelStatus}
                  userEmail={userEmail}
                />
              </>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CheckOutPagePageMain;
