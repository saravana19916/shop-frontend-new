"use client";
import React, { Fragment, useEffect, useState } from "react";
import EventGalleries from "./EventGalleries";
import {
  IEventDetails,
  IEventData,
  IPerformance,
  ITicketType,
  ITicketSelection,
} from "@/model/IEventDetail";
import { useMutation, useQuery } from "@tanstack/react-query";

import CartAPI from "@/services/cart.services";
import { EventTypes, IEventType, Data, Event } from "@/model/IEventType";
import eventDetailServices from "@/services/event-detail.services";
import EventShortDetail from "./EventShortDetail";
import EventDescriptions from "./EventDescriptions";
import EventInclusion from "./EventInclusion";
import SectionDateRange from "@/app/(listing-detail)/SectionDateRange";
import EventAmenities from "./EventAmenities";
import EventTicketRates from "./EventTicketRates";
import EventHostInformation from "./EventHostInformation";
import EventLocation from "./EventLocation";
import EditOrderSummary from "@/app/(listing-detail)/event-detail/EditOrderSummary";
import BackgroundSection from "@/components/BackgroundSection";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import MobileFooterSticky from "@/app/(listing-detail)/(components)/MobileFooterSticky";
import HomeService from "@/services/home.services";
import AuthService from "@/services/auth.service";
import OrderSummary from "@/app/(listing-detail)/event-detail/OrderSummary";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import OTPValidation from "@/app/(listing-detail)/event-detail/OTPValidation";
import GalleriesModel from "./GalleriesModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import EventAvailabilityDates from "./EventAvailabilityDates";
import EventThingsToKnow from "./EventThingsToKnow";
import PurchaseSessionAPI from "@/services/purchase-session.services";
import LoadingSpinner from "@/components/LoadingSpinner";
import { IWishListEvent } from "@/model/IWishListEvent";
import WishlistService from "@/services/wishlist.services";
import { fetchEventDetails } from "@/services/event-detail.services";
import Breadcrumb, { IBreadCrumbProps } from "@/shared/Breadcrumb";
import {
  ArrowLongLeftIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import BackBreadCrumb from "@/shared/BackBreadCrumb";
import {
  createPurchaseSession,
  useCreatePurchaseSession,
} from "@/queries/purchaseSession.query";

const EventsPage = ({ params }) => {
  const router = useRouter();
  const [wishlist, setWishList] = useState<IWishListEvent[]>([]);

  const event: IEventData = {
    id: 0,
    identifier: "",
    slugified_identifier: "",
    facebook: "",
    twitter: "",
    age_policy: "",
    has_promotion_code: 0,
    email_mandatory: 0,
    publish_status: "",
    type: "",
    active: 0,
    free: 0,
    hidden: 0,
    use_dtcm: 0,
    added_date: undefined,
    updated_date: undefined,
    venue_id: 0,
    promoter_id: 0,
    country_id: 0,
    city_id: 0,
    template_id: 0,
    has_custom_gac: 0,
    google_analytics_code: "",
    ticket_template: "",
    has_custom_fbc: 0,
    facebook_code: "",
    has_custom_purchase: 0,
    purchase_code: "",
    purchase_disable_for_mobile: 0,
    start_date: undefined,
    end_date: undefined,
    use_paypal: 0,
    trailer: "",
    show_duration: "",
    reference_key: null,
    has_custom_confirmation: 0,
    confirmation_code: "",
    paypal_discount_value: null,
    vat: 0,
    insured: 0,
    third_party_buy_url: "",
    promotion_by_card: 0,
    insurance_value: null,
    insurance_percentage: 0,
    test_rajesh: null,
    enable_external_purchase: 0,
    external_purchase_url: null,
    display_date: "",
    detail: undefined,
    performances: [],
    eventrules: [],
    venue: undefined,
    promoter: undefined,
    galleries: [],
    price_starts_from: 0,
  };
  const addOnObj = {
    eventId: null,
    insure: {
      quantity: null,
      cost: null,
    },
  };
  const [userCount, setUserCount] = useState({
    adult: 0,
    child: 0,
    infant: 0,
  });
  const _getWishList = async () => {
    const getMyWishlist = await WishlistService?.getMyWishlist();
    if (getMyWishlist?.status === 200 || getMyWishlist?.status === 201) {
      const eventDetails: any = getMyWishlist?.data;
      setWishList(eventDetails);
    } else {
      setWishList([]);
    }
  };
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
  const [eventDetail, setEventDetail] = useState<IEventDetails>({
    message: "",
    data: event,
    success: false,
    id: "",
  });
  const events: Event[] = [];
  const [eventData3, setEventData3] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const [identifierCount, setIdentifierCount] =
    useState<IPerformance>(performancesObj);
  const [selectedperformances, setSelectedperformances] =
    useState(performancesObj);
  const [addons, setAddons] = useState<any>(addOnObj);
  const [totalReserve, setTotalReserve] = useState<number>(0);
  const [isLogin, setIslogin] = useState(false);
  const [isOpenOPT, setIsOpenOPT] = useState(false);
  const [isOpenGalleries, setIsOpenGalleries] = useState(false);
  const [isOpenTC, setIsOpenTC] = useState(false);
  const [checkedTC, setCheckedTC] = useState(false);
  const id = params.id;
  const {
    data: eventDetails,
    isLoading,
    error,
    isRefetching,
  } = useQuery({
    queryKey: ["eventDetails", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Event ID is not available.");
      }
      return fetchEventDetails(id);
    },
    enabled: !!id,
  });

  const [selectedType, setSelectedType] = useState<null | ITicketType>(null);
  const [selectedSelection, setSelectedSelection] =
    useState<null | ITicketSelection>(null);

  const [orderStatus, setOrderStatus] = useState("");
  const [breadCrumbsList, setBreadCrumbsList] = useState<IBreadCrumbProps[]>(
    []
  );
  useEffect(() => {
    if (eventDetail && eventDetail?.data?.identifier) {
      const eventName = eventDetail?.data?.identifier;
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
          isActive: true,
          href: `/${id}`,
        },
      ];
      setBreadCrumbsList(breadCrumbs);
    }
  }, [eventDetail]);
  useEffect(() => {
    eventDetailServices.getEventDetail(id).then((data: IEventDetails) => {
      setEventDetail(data);
    });
    HomeService.getEventsForType(EventTypes[2]).then(
      (data) => {
        setEventData3(data.data);
      },
      (error) => {
        console.log(error);
      }
    );
    _getWishList();
  }, [id]);
  useEffect(() => {
    if (selectedSelection?.value === 1) {
      setIdentifierCount(performancesObj);
      setSelectedperformances(performancesObj);
    }
  }, [selectedSelection]);

  const handelIdentifierCount = (Value: IPerformance) => {
    setIdentifierCount(Value);
    setSelectedperformances(Value);
  };

  const handleProceedStatus = (status: string) => {
    setOrderStatus(status);
  };
  const handleAddons = (value: any) => setAddons(value);
  useEffect(() => {
    localStorage.removeItem("cart");
    localStorage.removeItem("event");
    localStorage.removeItem("addons");
    localStorage.removeItem("selectedSeats");
  }, []);
  function hasOnHoldTicket(data) {
    return data.tickets.some((ticket) => ticket.ticket.on_hold > 0);
  }
  function getOnHoldTicketsInfo(data) {
    return data.tickets
      .filter((ticket) => ticket.ticket.on_hold > 0)
      .map((ticket) => ({
        quantity: ticket.ticket.on_hold,
        event_id: ticket.ticket.event_id,
        ticket_id: ticket.ticket_id,
        performance_id: ticket.performance_id,
      }));
  }
  const handelBookNow = () => {
    if (selectedperformances.id == 0) {
      toast.error(orderStatus, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    } else {
      console.log(selectedperformances, "selectedperformances");
      handelProceedBuy();
      // setIsOpenTC(true);
    }
  };
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const user: any | undefined | null = AuthService.authUser();
  const { mutate: createPurchaseSession, isPending: isCreating } =
    useCreatePurchaseSession();
  useEffect(() => {
    setIsBooking(isCreating);
  }, [isCreating]);
  const handelProceedBuy = async () => {
    if (selectedperformances.id != 0) {
      console.log(selectedperformances, "selectedperformances");

      localStorage.setItem(
        "selectedPerformanceId",
        JSON.stringify(selectedperformances?.id)
      );
      localStorage.setItem("userCount", JSON.stringify(userCount));
      if (user != null) {
        setIslogin(true);
      } else {
        setIslogin(false);
        // router.push("/loginoptions");
      }
      setIsBooking(true);
      createPurchaseSession(selectedperformances?.event_id, {
        onSuccess: (response) => {
          console.log(response?.data, "response");
          const encrypted_identifier = response.data?.encrypted_identifier;
          router.push(`/ticket-selection/${encrypted_identifier}`);
        },
        onError: (error) => {
          console.log(error);

          toast.error("Something went wrong!", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
          setIsBooking(false);
        },
      });
      // const bookResponse: any =
      //   await PurchaseSessionAPI.getCreatePurchaseSession(
      //     selectedperformances?.event_id
      //   );
      // if (bookResponse?.status === 200) {
      //   const encrypted_purchase_session_id =
      //     bookResponse?.data?.encrypted_identifier;
      //   setIsBooking(false);
      // } else {
      //   toast.error("Something went wrong!", {
      //     position: toast.POSITION.TOP_RIGHT,
      //     theme: "colored",
      //   });
      // }
      setIsBooking(false);
    } else {
      sessionStorage.setItem("event", JSON.stringify(eventDetail));
      sessionStorage.setItem("addons", JSON.stringify(addons));
      {
        selectedSelection?.value == 1 ? router.push("/floor-plan") : null;
      }
    }
  };

  const setOPTModelStatus = (res: boolean) => {
    setIsOpenOPT(res);
  };
  const setGalleriesModelStatus = (res: boolean) => {
    setIsOpenGalleries(res);
  };
  const { t } = useTranslation();

  const ticketsForPrice = eventDetail?.data?.performances[0]?.tickets;

  const paymentCurrency =
    ticketsForPrice?.length > 0
      ? ticketsForPrice[0].ticket.payment_currency
      : null;

  return (
    <div className="ListingDetailPage">
      <ToastContainer />
      <div className="container ListingDetailPage__content">
        <BackBreadCrumb />
        <div className={` nc-ListingExperiencesDetailPage `}>
          <EventGalleries
            eventDetail={eventDetail}
            onOpenGalleriesModel={setGalleriesModelStatus}
          />
          <main className="relative z-10 lg:mt-11 mt-7 flex flex-col-reverse lg:flex-row lg:gap-0 gap-14">
            <div className="w-full lg:w-3/5 xl:w-2/3 space-y-4 lg:pr-10 lg:space-y-10 ">
              <div className="scrollable-container flex flex-col gap-[2.75rem]">
                <EventShortDetail
                  eventDetail={eventDetail}
                  refetchWishList={_getWishList}
                  wishlistEvents={wishlist}
                  user={user}
                />
                <EventDescriptions eventDetail={eventDetail} />
                <EventAvailabilityDates eventDetail={eventDetail} />
                <EventTicketRates eventDetail={eventDetail} />
                {/* <EventFloorPlan eventDetail={eventDetail} /> */}
                <EventInclusion eventDetail={eventDetail} />

                <EventLocation eventDetail={eventDetail} />
                <EventAmenities eventDetail={eventDetail} />
                <EventThingsToKnow eventDetail={eventDetail} />
                <EventHostInformation eventDetail={eventDetail} />
              </div>
            </div>
            <div className="flex-grow mt-7 lg:mt-0">
              <div className="listingSectionSidebar__wrap  sticky top-28 lg:shadow-xl">
                <div>
                  {eventDetail?.data?.id > 0 ? (
                    <div className="block flex-grow mt-2 lg:mt-0">
                      <div>
                        <span className="text-neutral-400 font-light text-xs mb-1.5">
                          price starts from
                        </span>
                        <span className="text-3xl font-semibold block">
                          {/* {t("orderSummary")} */}
                          {`${paymentCurrency || ""} ${
                            eventDetail?.data?.price_starts_from
                          }`}
                        </span>
                      </div>
                      <div>
                        <EditOrderSummary
                          eventdetail={eventDetail}
                          onIdentifierCount={handelIdentifierCount}
                          handleAddons={handleAddons}
                          setSelectedTicketSelection={setSelectedSelection}
                          setSelectedTicketType={setSelectedType}
                          onProceedStatus={handleProceedStatus}
                          userCount={userCount}
                          setUserCount={setUserCount}
                        />
                        {/* {identifierCount.id !== 0 && (
                          <OrderSummary
                            performance={identifierCount}
                            addons={addons}
                            payment_currency={
                              identifierCount?.tickets[0]?.ticket
                                ?.payment_currency
                            }
                            vat={eventDetail?.data?.vat}
                            setTotalReserve={setTotalReserve}
                          />
                        )} */}
                        <div
                          className="flex 
                       justify-center mt-10"
                        >
                          <ButtonPrimary
                            onClick={handelBookNow}
                            sizeClass="w-full py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
                            className={isBooking ? "animate-pulse" : ""}
                            disabled={isBooking}
                          >
                            {t("bookNow")} &nbsp;{" "}
                            {isBooking && <LoadingSpinner />}
                          </ButtonPrimary>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="block flex-grow mt-14 lg:mt-0">
                        <div className="listingSectionSidebar__wrap shadow-xl">
                          <div className="flex justify-between">
                            <span className="text-2xl font-semibold">
                              {t("orderSummary")}
                            </span>
                          </div>
                          <div>
                            <div className="h-96 w-full rounded-md bg-gray-300 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="container py-24 lg:py-32">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="highlyRecommended"
            subHeading="hereAreSomeEventsYouMightAlsoLikeToExperience"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
            eventList={
              eventData3 && eventData3?.events ? eventData3?.events : undefined
            }
          />
        </div>
        <SectionSubscribe2 className="pt-24 lg:pt-32" />
      </div>
      {/* STICKY FOOTER MOBILE */}
      {/* <MobileFooterSticky
        totalReserve={totalReserve}
        paymentCurrency={identifierCount?.tickets[0]?.ticket?.payment_currency}
        handleReserve={handelBookNow}
      /> */}
      <OTPValidation openOTP={isOpenOPT} onChangeStatus={setOPTModelStatus} />
      <GalleriesModel
        openGalleri={isOpenGalleries}
        onChangeStatusGalleri={setGalleriesModelStatus}
        eventDetail={eventDetail}
      />
      <Transition appear show={isOpenTC} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpenTC(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col dark:text-neutral-700">
                  <Dialog.Title as="h3" className="text-2xl font-semibold">
                    <h1>{t("TICKET T&C'S")}</h1>
                  </Dialog.Title>
                  <div>
                    <ul className="list-disc p-4">
                      <li>{t("allChildren2YearsAndOlderRequireATicket.")}</li>
                      <li>
                        {t(
                          "childrenUnder2YearsOldAreAdmittedFreeProvidedTheySitOnAParentOrGuardian'sLap."
                        )}
                      </li>
                      <li>{t("under16'sMustBeAccompaniedByAdult21+")}</li>
                      <li>{t("strictlyNoReadmission.")}</li>
                      <li>
                        {t(
                          "bagsLargerThan30x30x15AreNotPermittedAndNoStorageOrCloakroomFacilitiesAreAvailable."
                        )}
                      </li>
                      <li>
                        {t("accessIsAvailableForPeopleOfDetermination.")}{" "}
                        {t("accessibleTicketsMustBePurchased.")}
                      </li>
                      <li>{t("noProfessionalCameras.")}</li>
                      <li>
                        {t("strobeAndFlashingLightEffectsOccurDuringTheShow")}
                      </li>
                    </ul>
                    <hr className="mb-4" />
                    <div className="flex gap-2 items-center">
                      <input
                        id="terms"
                        checked={checkedTC}
                        type="checkbox"
                        className="cursor-pointer focus:ring-action-primary h-5 w-5 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500"
                        onChange={(event) => setCheckedTC(event.target.checked)}
                      />
                      <label htmlFor="terms">
                        <b>{t("iHaveReadAndAgreeToTheAboveTerms")}</b>
                      </label>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-4 flex-col">
                    <ButtonPrimary
                      onClick={handelProceedBuy}
                      disabled={!checkedTC}
                      sizeClass="w-full py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
                      fontSize="text-lg sm:text-xl"
                    >
                      {t("proceedToBuy")}
                    </ButtonPrimary>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EventsPage;
