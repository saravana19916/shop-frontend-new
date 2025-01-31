"use client";

import {
  IEventData,
  IEventDetails,
  IPerformance,
  ITicketElement,
  ITicketSelection,
  ITicketType,
} from "@/model/IEventDetail";
import Image from "next/image";
import seat from "@/images/seat.svg";
import { Tab } from "@headlessui/react";
import {
  CalendarIcon,
  ClockIcon,
  ShieldCheckIcon,
  TicketIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import React, {
  Fragment,
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import StayDatesRangeInput from "./StayDatesRangeInput";
import ShowInput from "../listing-experiences-detail/ShowInput";
import TicketCategory from "./TicketCategory";
import GuestsInput from "./GuestsInput";
import Input from "@/shared/Input";
//import ButtonPrimary from "@/shared/ButtonPrimary";
import moment from "moment";
import orderServices from "@/services/order.services";
import styled from "styled-components";
import TicketType from "./TicketType";
import TicketSelection from "./TicketSelection";
import { useTranslation } from "react-i18next";

export interface EditOrderSummaryProps {
  eventdetail?: IEventDetails;
  onIdentifierCount?: any;
  handleAddons?: (value: any) => void;
  onProceedStatus?: (value: any) => void;
  setSelectedTicketType?: (value: null | ITicketType) => void;
  setSelectedTicketSelection?: (value: null | ITicketSelection) => void;
  userCount?: any;
  setUserCount?: Dispatch<SetStateAction<any>>;
}

const ButtonPrimary = styled.button`
  background-color: rgb(235, 0, 59);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 1px 9px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 9px;
`;
const EditOrderSummary: FC<EditOrderSummaryProps> = ({
  eventdetail,
  onIdentifierCount,
  handleAddons,
  onProceedStatus,
  setSelectedTicketType,
  setSelectedTicketSelection,
  userCount,
  setUserCount,
}) => {
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
  const [selectedOrderSummaryIndex, setSelectedOrderSummaryIndex] = useState(0);
  const [eventDetail, setEventDetail] = useState<IEventDetails>(eventdetail);
  const [selectedDate, setSelectedDate] = useState<Date>(null);
  const [selectedperformances, setSelectedperformances] =
    useState(performancesObj);
  const [identifierCount, setIdentifierCount] =
    useState<IPerformance>(performancesObj);
  const [addons, setAddons] = useState<any>();
  const [selectedShow, setSelectedShow] = useState("");
  const [selectDatePerformances, setSelectDatePerformances] = useState<
    IPerformance[]
  >([]);
  const [enableDates, setEnableDates] = useState([]);
  const [showsStartDate, setShowsStartDate] = useState<Date>(new Date());
  const [showsEndDate, setShowsEndDate] = useState<Date>(new Date());
  const [osMinimized, setOsMinimized] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSelection, setSelectedSelection] = useState(null);
  useEffect(() => {
    onProceedStatus("Please select event date");
    const cart: IPerformance = JSON.parse(localStorage.getItem("cart"));
    const addons = JSON.parse(localStorage.getItem("addons"));
    setSelectedperformances(cart);
    setAddons(addons);
    if (cart) {
      setSelectedDate(cart.start_date);
    }
    setEventDetail(eventdetail);
    setEnableDates(
      orderServices.getAllPerformancesDates(eventDetail?.data?.performances)
    );
    setSelectDatePerformances(
      orderServices.getPerformancesTime(
        eventDetail?.data?.performances,
        selectedDate
      )
    );
  }, []);

  const getBookdate = (date: Date) => {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", JSON.stringify(date));
    onProceedStatus("Please select Show Time");
    onIdentifierCount(performancesObj);
    setSelectedOrderSummaryIndex(1);
    setSelectedShow("");
    setSelectDatePerformances(
      orderServices.getPerformancesTime(eventDetail?.data?.performances, date)
    );
  };

  const handleShow = (Value: IPerformance) => {
    onIdentifierCount(Value);
    setSelectedperformances(Value);
    sessionStorage.setItem("selectedShowDetails", JSON.stringify(Value));
    onProceedStatus(null);
    setSelectedShow(
      moment(Value.start_date).format("h:mm a") +
        " to " +
        moment(Value.end_date).format("h:mm a")
    );
    setSelectedOrderSummaryIndex(2);
  };

  const handelIdentifierCount = (Value: IPerformance) => {
    onIdentifierCount(Value);
    setIdentifierCount(Value);
  };
  const handleAddOnChange = (value: any) => {
    setAddons(value);
    handleAddons(value);
  };
  const ticketType: ITicketType[] = [
    { value: 1, label: "Seated Ticket" },
    { value: 2, label: "Standing  Ticket" },
    { value: 3, label: "Hospitality  Ticket" },
    { value: 4, label: "Hospitality lounge" },
  ];
  const ticketSelection: ITicketSelection[] = [
    { value: 1, label: "I want to choose" },
    { value: 2, label: "Best available" },
  ];
  // const scrollToFloorPlan = () => {
  //   const floorPlanSection = document.getElementById("floorPlan");
  //   floorPlanSection?.scrollIntoView({ behavior: "smooth" });
  // };
  const handleTicketTypeChange = (value: any) => {
    setSelectedType(value);
    setSelectedTicketType(value);
    setSelectedSelection(null);
    setSelectedTicketSelection(null);
    // localStorage.removeItem("ticketSelection");
    if (value?.value == 1) {
      onProceedStatus(t("pleaseSelectTicketSelection"));
    } else {
      onProceedStatus(t("pleaseSelectTicketCategory"));
    }
  };
  const handleTicketSelectionChange = (value: any) => {
    setSelectedSelection(value);
    setSelectedTicketSelection(value);
    localStorage.setItem("ticketSelection", JSON.stringify(value));
    if (value?.value == 2) {
      onProceedStatus(t("pleaseSelectTicketCategory"));
    }
    if (value?.value == 1) {
      onProceedStatus(t("iWantToChoose"));
    }
  };
  const { t } = useTranslation();

  return (
    <>
      <div>
        <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl mt-6">
          <StayDatesRangeInput
            className={"flex-1 z-[11]"}
            eventStartDate={eventDetail?.data?.start_date}
            eventEndDate={eventDetail?.data?.end_date}
            onSelectDate={getBookdate}
            enableDates={enableDates}
            selectDate={selectedDate}
            showsStartDate={showsStartDate}
            showsEndDate={showsEndDate}
          />
        </form>

        <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl mt-3">
          <ShowInput
            className={"flex-1 " + (osMinimized ? "hidden" : "")}
            title={selectedShow ? selectedShow : "showTime"}
            subTitle="chooseTheShowTime"
            performances={selectDatePerformances}
            onSelectShow={handleShow}
          />
        </form>
        {/* <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl mt-4 ">
          <TicketType
            className={"flex-1 " + (osMinimized ? "hidden" : "")}
            title={selectedType ? selectedType?.label : "ticketType"}
            subTitle="chooseTheTicketType"
            ticketType={ticketType}
            selectedType={selectedType}
            onSelectTicketType={handleTicketTypeChange}
          />
        </form> */}
        {/* {selectedType ? (
          <>
            {selectedType?.value === 1 ? (
              <>
                <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl mt-4 ">
                  <TicketSelection
                    className={"flex-1 " + (osMinimized ? "hidden" : "")}
                    title={
                      selectedSelection
                        ? selectedSelection?.label
                        : "ticketSelection"
                    }
                    subTitle="chooseTheTicketSelection"
                    ticketSelection={ticketSelection}
                    selectedSelection={selectedSelection}
                    onSelectTicketSelection={handleTicketSelectionChange}
                  />
                </form>
              </>
            ) : (
              <>
                <div className="flex flex-col border items-center border-neutral-200 dark:border-neutral-700 rounded-3xl mt-4 p-4 gap-3 opacity-50">
                  <div className="flex-1 flex items-center focus:outline-none rounded-b-3xl w-full gap-3">
                    <div className="text-neutral-700 dark:text-neutral-400">
                      <Image
                        className="text-neutral-700 dark:text-neutral-400"
                        src={seat}
                        alt=""
                        style={{ width: "24px", height: "24px" }}
                      />
                    </div>
                    <div className="flex-grow text-left">
                      <span className="block xl:text-lg font-semibold">
                        {t("ticketSelection")}
                      </span>
                      <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                        {t("chooseTheTicketSelection")}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    {ticketSelection.map((value, index) => {
                      return (
                        <>
                          <div
                            key={value.value}
                            className={
                              "font-medium text-neutral-800 border border-neutral-200 dark:border-neutral-700 px-4 dark:text-neutral-200 p-4 ms-3 flex gap-3 rounded-3xl"
                            }
                          >
                            <span className="block ms-2">{value.label}</span>
                            <span>
                              <i
                                className={`mt-1 la la-info-circle text-xl`}
                              ></i>
                            </span>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </>
        ) : null} */}

        <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl mt-3">
          <TicketCategory
            className={"flex-1 " + (osMinimized ? "hidden" : "")}
            title="Guests"
            subTitle="Add Guests"
            performances={selectedperformances}
            onSelectIdentifierCount={handelIdentifierCount}
            isDisabled={selectedSelection?.value == 1 ? true : false}
            userCount={userCount}
            setUserCount={setUserCount}
          />
        </form>

        {/* <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl mt-4 ">
          <GuestsInput
            className={"flex-1 " + (osMinimized ? "hidden" : "")}
            title="add-ons"
            subTitle="addOnServices&Goodies"
            eventDetail={eventDetail}
            onSelectAddOn={handleAddOnChange}
          />
        </form> */}
        {/* <div className="h-4"></div> */}
        {/* <div className="border-b border-neutral-200 dark:border-neutral-700"></div> */}
      </div>
      {/* <Tab.Group
        selectedIndex={selectedOrderSummaryIndex}
        onChange={(index) => {
          setSelectedOrderSummaryIndex(index);
        }}
      >
        <Tab.List className="flex space-x-1 overflow-x-auto justify-center">
          <Tab key={"performance"} as={Fragment}>
            {({ selected }) => (
              <button
                className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize focus:outline-none ${
                  selected
                    ? "bg-neutral-100 dark:bg-neutral-800 text-secondary-50 "
                    : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                } `}
              >
                <div className="text-neutral-700 dark:text-neutral-400">
                  <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                </div>
              </button>
            )}
          </Tab>
          <Tab key={"showtime"} as={Fragment}>
            {({ selected }) => (
              <button
                className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize focus:outline-none ${
                  selected
                    ? "bg-neutral-100 dark:bg-neutral-800 text-secondary-50 "
                    : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                } `}
              >
                <div className="text-neutral-700 dark:text-neutral-400">
                  <ClockIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                </div>
              </button>
            )}
          </Tab>
          <Tab key={"tickets"} as={Fragment}>
            {({ selected }) => (
              <button
                className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize focus:outline-none ${
                  selected
                    ? "bg-neutral-100 dark:bg-neutral-800 text-secondary-50 "
                    : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                } `}
              >
                <div className="text-neutral-700 dark:text-neutral-400">
                  <TicketIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                </div>
              </button>
            )}
          </Tab>
          <Tab key={"addons"} as={Fragment}>
            {({ selected }) => (
              <button
                className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize focus:outline-none ${
                  selected
                    ? "bg-neutral-100 dark:bg-neutral-800 text-secondary-50 "
                    : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                } `}
              >
                <div className="text-neutral-700 dark:text-neutral-400">
                  <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                </div>
              </button>
            )}
          </Tab>
          <Tab key={"promo"} as={Fragment}>
            {({ selected }) => (
              <button
                className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize focus:outline-none ${
                  selected
                    ? "bg-neutral-100 dark:bg-neutral-800 text-secondary-50 "
                    : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                } `}
              >
                <div className="text-neutral-700 dark:text-neutral-400">
                  <ShieldCheckIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                </div>
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="">
            <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl mt-4 ">
              <StayDatesRangeInput
                className={"flex-1 z-[11]"}
                eventStartDate={eventDetail?.data?.start_date}
                eventEndDate={eventDetail?.data?.end_date}
                onSelectDate={getBookdate}
                enableDates={enableDates}
                selectDate={selectedDate}
                showsStartDate={showsStartDate}
                showsEndDate={showsEndDate}
              />
            </form>
          </Tab.Panel>
          <Tab.Panel className="">
            <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl mt-4 ">
              <ShowInput
                className={"flex-1 " + (osMinimized ? "hidden" : "")}
                title={selectedShow ? selectedShow : "Show Time"}
                subTitle="please choose the show time"
                performances={selectDatePerformances}
                onSelectShow={handleShow}
              />
            </form>
          </Tab.Panel>
          <Tab.Panel className="">
            <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl mt-4 ">
              <TicketCategory
                className={"flex-1 " + (osMinimized ? "hidden" : "")}
                title="Ticket category"
                subTitle="ticket type & categories"
                performances={selectedperformances}
                onSelectIdentifierCount={handelIdentifierCount}
              />
            </form>
          </Tab.Panel>
          <Tab.Panel className="">
            <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl mt-4 ">
              <GuestsInput
                className={"flex-1 " + (osMinimized ? "hidden" : "")}
                title="Add-ons"
                subTitle="add on services & goodies"
                eventDetail={eventDetail}
              />
            </form>
          </Tab.Panel>
          <Tab.Panel className="">
            <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl mt-4 p-3">
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Have A Promo Code?
                </span>
              </label>
              <div className="flex items-center gap-6">
                <Input
                  type="text"
                  name="promo_code"
                  placeholder="Promo Code"
                  className="mt-1"
                />
                <ButtonPrimary
                  type="submit"
                  sizeClass="px-4 py-2 sm:px-3"
                  fontSize="text-xs sm:text-xs"
                >
                  APPLY
                </ButtonPrimary>
              </div>
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group> */}
    </>
  );
};

export default EditOrderSummary;
