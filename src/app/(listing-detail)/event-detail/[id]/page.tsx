"use client";

import React, { FC, useEffect, useState, Fragment } from "react";
import { Tab, Transition } from "@headlessui/react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import CommentListing from "@/components/CommentListing";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import Avatar from "@/shared/Avatar";
import Badge from "@/shared/Badge";
import ButtonCircle from "@/shared/ButtonCircle";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Input from "@/shared/Input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import {
  CalendarIcon,
  TicketIcon,
  UserPlusIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import StartRating from "@/components/StartRating";
import { includes_demo, PHOTOS } from "../constant";
import Image from "next/image";
import StayDatesRangeInput from "../StayDatesRangeInput";
import GuestsInput from "../GuestsInput";
import SectionDateRange from "../../SectionDateRange";
import { Route } from "next";
import TicketCategory from "../TicketCategory";
import {
  IEventData,
  IEventDetails,
  IPerformance,
  ITicketSelection,
  ITicketType,
} from "@/model/IEventDetail";
import eventDetailServices from "@/services/event-detail.services";
import { number } from "zod";
import { Amenities_demos } from "../../listing-stay-detail/constant";
import { Dialog } from "@headlessui/react";
import ShowInput from "../../listing-experiences-detail/ShowInput";
import moment from "moment";
import OrderSummary from "../OrderSummary";
import AuthService from "@/services/auth.service";
import EditOrderSummary from "../EditOrderSummary";
import OTPValidation from "../OTPValidation";
import { useTranslation } from "react-i18next";
import VideoPlayer from "@/components/VideoPlayer";

export interface queryParam {
  id: string;
}

export interface EventDetailPagePageProps {
  params?: queryParam;
}

export interface ITicketRate {
  id: number;
  identifier: string;
  price: string;
  currency: string;
}

const EventDetailPage: FC<EventDetailPagePageProps> = ({ params }) => {
  const thisPathname = usePathname();
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
  let [categories] = useState(["S", "E", "C"]);
  const [osMinimized, setOsMinimized] = useState(false);
  const [selectedperformances, setSelectedperformances] =
    useState(performancesObj);

  const ticketRateObj: ITicketRate[] = [];
  const [ticketRate, setTicketRate] = useState(ticketRateObj);
  const [selectedType, setSelectedType] = useState<null | ITicketType>(null);
  const [selectedSelection, setSelectedSelection] =
    useState<null | ITicketSelection>(null);
  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  };

  const minMax = (e) => {
    //e.preventDefault();
    //setOsMinimized(!osMinimized);
  };

  const handleScroll = () => {
    setTimeout(() => {
      setOsMinimized(window.scrollY > window.screen.height / 1.2);
    }, 2000);
  };

  const [videoLink, setVideoLink] = useState<string | null>(null);
  const [videoModalIsOpen, setVideoModalIsOpen] = useState<boolean>(false);

  const handleWatchVideo = () => {
    if (eventDetail?.data?.trailer) {
      setVideoLink(eventDetail?.data?.trailer);
      setVideoModalIsOpen(true);
    }
  };

  const renderSection1 = (eventDetail: IEventDetails) => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center">
          {eventDetail?.data?.type && (
            <Badge color="pink" name={eventDetail?.data?.type} />
          )}
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {eventDetail?.data?.detail?.name || ""}
        </h2>

        {/* 3 */}
        <div className="flex items-center space-x-4">
          {/* <StartRating /> */}
          {/* <span>·</span> */}
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1">
              {" "}
              {eventDetail?.data?.venue?.detail?.address || ""}
            </span>
          </span>
        </div>

        {/* 4 */}
        {/* <div className="flex items-center">
          <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
            Hosted by{" "}
            <span className="text-neutral-900 dark:text-neutral-200 font-medium">
              Kevin Francis
            </span>
          </span>
        </div> */}

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 */}
        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-clock text-2xl"></i>
            <span className="">{eventDetail?.data?.show_duration || 0}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="la la-youtube text-2xl"></i>
            <a href="#" onClick={handleWatchVideo}>
              <span className="">Watch Trailer</span>
              <VideoPlayer
                videoLink={videoLink}
                videoModalIsOpen={videoModalIsOpen}
                setVideoLink={setVideoLink}
                setVideoModalIsOpen={setVideoModalIsOpen}
              />
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-user-friends text-2xl"></i>
            <span className="">
              Up to {eventDetail?.data?.venue?.capacity} people
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-people-carry text-2xl"></i>
            <span className="">Age limit {eventDetail?.data?.age_policy}+</span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection2 = (eventDetail: IEventDetails) => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Descriptions</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <div
            dangerouslySetInnerHTML={{
              __html: eventDetail?.data?.detail?.description || "",
            }}
          />
          {/* <p>
            TRANG AN BOAT TOUR & MUA CAVE CLIMBING TOUR FROM HANOI
            <br />
            <br />
            07:30 – 08:00 – Our guide will meet you at your hotel/stay and start
            a 120km comfortable Limousine bus journey through the verdant
            landscape. Stopover for a rest on the way.
            <br />
            <br />
            BAI DINH PAGODA EXPLORER.
            <br />
            <br />
            10:30 – Arrive Bai Dinh pagoda complex, get on electric cars to
            visit massive architecture.
            <br />
            <br />
            12:15 – Enjoy the buffet lunch at our restaurant, a great place to
            savor the flavours of Vietnamese food.
            <br />
            <br />
            TRANG AN TOUR ON BOAT.
            <br />
            <br />
            13:30 – Visit Trang An Grottoes, get on a rowing boat traveling
            along the river with scenic mountain and green fields landscape.
            <br />
            <br />
            MUA CAVE HIKING. TAKE PICTURE
            <br />
            <br />
            15:45 – Arrive at Mua Cave and start an amazing trek up to the top
            of Ngoa Long mountain.
            <br />
            <br />
            17:30 – 20:00 – Return to our Limousine bus and then come back to
            Hanoi. Drop you off at your hotel/stay. Other things to note
            <br />
            <br />
            It is one full day tour. Start from 07.30 AM and finish at 20.00. We
            just put one hour and default departure time because we have many
            other tours. IF you need any further details
          </p> */}
        </div>
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          {/* <h2 className="text-2xl font-semibold">Inclusion </h2> */}
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Included in the price
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {includes_demo
            .filter((_, i) => i < 12)
            .map((item) => (
              <div key={item.name} className="flex items-center space-x-3">
                <i className="las la-check-circle text-2xl"></i>
                <span>{item.name}</span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const renderSection5 = () => {
    return (
      <div className="listingSection__wrap">
        {/* /* HEADING */}
        <h2 className="text-2xl font-semibold">Host Information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* /* host */}
        <div className="flex items-center space-x-4">
          <Avatar
            hasChecked
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-14 w-14"
            radius="rounded-full"
            imgUrl={`${process.env.AWS_CLOUD_FRONT_URL}images/promoters/${eventDetail?.data?.promoter?.image_file_name}`}
            userName={eventDetail?.data?.promoter?.detail?.name}
          />
          <div>
            <a className="block text-xl font-medium" href="#">
              {eventDetail?.data?.promoter?.detail?.name}
            </a>
            {/*<div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <StartRating />
              <span className="mx-2">·</span>
              <span> 12 places</span>
            </div>*/}
          </div>
        </div>

        {/* desc */}
        <span className="block text-neutral-6000 dark:text-neutral-300">
          {eventDetail?.data?.promoter?.detail?.description}
        </span>

        {/* info */}
        <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              Joined in{" "}
              {moment(eventDetail?.data?.promoter?.added_date).format(
                "MMM, YYYY"
              )}
            </span>
          </div>
          {/*<div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>Response rate - 100%</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Fast response - within a few hours</span>
          </div>*/}
        </div>

        {/* == */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <ButtonSecondary
            href={
              `/promoter/${eventDetail?.data?.promoter_id}` as Route<string>
            }
          >
            See host profile
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  const renderSection7 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Location</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            San Diego, CA, United States of America (SAN-San Diego Intl.)
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
          <div className="rounded-xl overflow-hidden z-0">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCBaWit5uUQFlaJ_0vUEfonAb_BI_7JC-0&q=${eventDetail?.data?.venue?.latitude},${eventDetail?.data?.venue?.longitude}`}
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Things to know</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Cancellation policy</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Any experience can be canceled and fully refunded within 24 hours of
            purchase, or at least 7 days before the experience starts.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Guest requirements</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Up to 10 guests ages 4 and up can attend. Parents may also bring
            children under 2 years of age.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">What to bring</h4>
          <div className="prose sm:prose">
            <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
              <li>
                Formal Wear To Visit Bai Dinh Pagoda Be ready before 7.30 Am.
              </li>
              <li>We will pick up from 07.30 to 08.00 AM</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderSection9 = (eventDetail: IEventDetails) => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Amenities </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` About the property's amenities and services`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {eventDetail?.data?.eventrules?.map((eventRule) => {
            return (
              <>
                <div
                  key={eventRule?.id}
                  className="flex items-center space-x-3"
                >
                  {/*<i className={`text-3xl las las la-key`}></i>*/}
                  <img
                    className="invert dark:invert-0 border-none rounded-full"
                    src={`${process.env.AWS_CLOUD_FRONT_URL}images/rules/${eventRule?.rule?.image}`}
                  />
                  <span className=" ">{eventRule?.rule?.identifier}</span>
                </div>
              </>
            );
          })}
        </div>

        {/* ----- */}
        {/*<div className="w-14 border-b border-neutral-200"></div>*/}
        <div>
          {/* <ButtonSecondary onClick={openModalAmenities}>
            View more 20 amenities
          </ButtonSecondary> */}
        </div>
        {/* {renderMotalAmenities()} */}
      </div>
    );
  };

  const renderSection10 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Ticket Rates </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}
        <div className="flow-root">
          <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
            {ticketRate.length > 0 &&
              ticketRate.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="p-4 odd:bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg"
                  >
                    <span>{value.identifier}</span>
                    <span>
                      {value.currency} {value.price}
                    </span>
                  </div>
                );
              })}
            {/* <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Monday - Thursday</span>
              <span>$199</span>
            </div>
            <div className="p-4  flex justify-between items-center space-x-4 rounded-lg">
              <span>Monday - Thursday</span>
              <span>$199</span>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Friday - Sunday</span>
              <span>$219</span>
            </div>
            <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
              <span>Rent by month</span>
              <span>-8.34 %</span>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Minimum number of nights</span>
              <span>1 night</span>
            </div>
            <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
              <span>Max number of nights</span>
              <span>90 nights</span>
            </div> */}
          </div>
        </div>
      </div>
    );
  };

  const renderSidebar1 = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        <div className="flex justify-between">
          <span className="text-2xl font-semibold">Order Summary</span>
        </div>
        <div>
          <EditOrderSummary
            eventdetail={eventDetail}
            onIdentifierCount={handelIdentifierCount}
            setSelectedTicketSelection={setSelectedSelection}
            setSelectedTicketType={setSelectedType}
          />
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
                    insuredescription={
                      eventDetail?.data?.detail?.insurance_description
                    }
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
                    <ButtonPrimary type="submit">APPLY</ButtonPrimary>
                  </div>
                </form>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group> */}
          {/* SUM */}
          {/* {sum(identifierCount)} */}
          {identifierCount.id !== 0 && (
            <OrderSummary
              performance={identifierCount}
              payment_currency={
                identifierCount?.tickets[0]?.ticket?.payment_currency
              }
              vat={eventDetail?.data?.vat}
              setTotalReserve={setTotalReserve}
            />
          )}

          {/* SUBMIT */}
          <div className="flex justify-center mt-10">
            <ButtonPrimary
              sizeClass="w-full py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
              onClick={handelReserveClick}
            >
              Reserve
            </ButtonPrimary>
          </div>
        </div>
      </div>
    );
  };

  const [selectedShow, setSelectedShow] = useState("");
  const [totalReserve, setTotalReserve] = useState<number>(0);

  const handleShow = (Value: IPerformance) => {
    setIdentifierCount(performancesObj);
    setSelectedperformances(Value);
    setSelectedShow(
      moment(Value.start_date).format("h:mm a") +
        " to " +
        moment(Value.end_date).format("h:mm a")
    );
    setSelectedOrderSummaryIndex(2);
  };
  const handelIdentifierCount = (Value: IPerformance) => {
    setIdentifierCount(Value);
    setSelectedperformances(Value);
    // sum(identifierCount);
  };
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const getBookdate = (date: Date) => {
    setSelectedDate(date);
    setSelectedperformances(performancesObj);
    setIdentifierCount(performancesObj);
    setSelectedOrderSummaryIndex(1);
    setSelectedShow("");
    const performances: IPerformance[] = [];
    eventDetail.data.performances.map((x) => {
      if (
        moment(date).format("yyyy-MM-DD") ==
        moment(x.start_date).format("yyyy-MM-DD")
      ) {
        performances.push(x);
      }
    });
    setSelectDatePerformances(performances);
  };
  const [selectDatePerformances, setSelectDatePerformances] = useState<
    IPerformance[]
  >([]);
  const [identifierCount, setIdentifierCount] =
    useState<IPerformance>(performancesObj);

  const [paymentCurrency, setPaymentCurrency] = useState("");
  const [selectedOrderSummaryIndex, setSelectedOrderSummaryIndex] = useState(0);
  const [isLogin, setIslogin] = useState(false);

  const sum = (identifierCount: IPerformance) => {
    return (
      <div className="flex flex-col space-y-4">
        {identifierCount.tickets.map((value, index) => {
          return (
            <>
              <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>
                  ${value.ticket.price} x {value.ticket.on_hold}{" "}
                  {value.ticket.identifier}
                </span>
                <span>{Number(value.ticket.price) * value.ticket.on_hold}</span>
              </div>
            </>
          );
        })}

        {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
        <span>$10 x 2 children</span>
        <span>$20.00</span>
      </div>
      <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
        <span>$10 x 5 Tix protect</span>
        <span>$50.00</span>
      </div> */}
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span>Process Fee</span>
          <span>$4.99</span>
        </div>
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span>VAT (5%)</span>
          <span>$2.58</span>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>$199</span>
        </div>
      </div>
    );
  };

  const [isOpenOPT, setIsOpenOPT] = useState(false);

  const setOPTModelStatus = (res: boolean) => {
    setIsOpenOPT(res);
  };
  const handelReserveClick = () => {
    const user: any | undefined | null = AuthService.authUser();
    if (user != null) {
      setIslogin(true);
      if (selectedperformances.id != 0) {
        // router.push("/checkout");
        localStorage.setItem("cart", JSON.stringify(selectedperformances));
        localStorage.setItem("event", JSON.stringify(eventDetail));
        sessionStorage.setItem("cart", JSON.stringify(selectedperformances));
        sessionStorage.setItem("event", JSON.stringify(eventDetail));
      }
    } else {
      // router.push("/floor-plan");
      setIslogin(false);
      setIsOpenOPT(true);
      // router.push("/login");
    }
    // href={"/checkout"}
  };
  const { t } = useTranslation();
  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-2xl font-semibold">{t("orderSummary")}</span>
        </div>

        {/* FORM */}
        {/* FORM */}
        <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
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
          <div
            className={
              "w-full border-b border-neutral-200 dark:border-neutral-700 " +
              (osMinimized ? "hidden" : "")
            }
          ></div>
          <ShowInput
            className={"flex-1 " + (osMinimized ? "hidden" : "")}
            title={selectedShow ? selectedShow : "showTime"}
            subTitle="chooseTheShowTime"
            performances={selectDatePerformances}
            onSelectShow={handleShow}
          />
          <div
            className={
              "w-full border-b border-neutral-200 dark:border-neutral-700 " +
              (osMinimized ? "hidden" : "")
            }
          ></div>
          <TicketCategory
            className={"flex-1 " + (osMinimized ? "hidden" : "")}
            title="Ticket category"
            subTitle="ticket type & categories"
            performances={selectedperformances}
            onSelectIdentifierCount={handelIdentifierCount}
          />
          <div
            className={
              "w-full border-b border-neutral-200 dark:border-neutral-700 " +
              (osMinimized ? "hidden" : "")
            }
          ></div>
          <GuestsInput
            className={"flex-1 " + (osMinimized ? "hidden" : "")}
            title="Add-ons"
            subTitle="add on services & goodies"
          />
          <div
            className={
              "w-full border-b border-neutral-200 dark:border-neutral-700 "
            }
          ></div>
          {/*<button
              className={`float-right text-4xl`}
              onClick={e => minMax(e)}
            >
              <i className={"la " + (osMinimized ? "la-caret-down" : "la-caret-up")}></i>
            </button>*/}
        </form>

        {/* SUM */}
        {/* {sum(identifierCount)} */}
        <OrderSummary
          performance={identifierCount}
          setTotalReserve={setTotalReserve}
        />
        {/* SUBMIT */}
        <ButtonPrimary
          sizeClass="w-full py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
          onClick={handelReserveClick}
        >
          Reserve
        </ButtonPrimary>
      </div>
    );
  };

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
  };

  const [eventDetail, setEventDetail] = useState<IEventDetails>({
    message: "",
    data: event,
    success: false,
    id: "",
  });

  // const idParams = useSearchParams();
  const id = Number(params.id);
  const [showsStartDate, setShowsStartDate] = useState<Date>(new Date());
  const [showsEndDate, setShowsEndDate] = useState<Date>(new Date());
  const [enableDates, setEnableDates] = useState([]);
  const getShowDates = (performance: IPerformance[]) => {
    let dates = performance.map((x) => {
      return x.start_date;
    });
    if (dates.length > 0) {
      setEnableDates(dates);
      setShowsStartDate(new Date(dates[0]));
      setShowsEndDate(new Date(dates[dates.length - 1]));
      setSelectedDate(new Date(dates[0]));
    }
  };
  useEffect(() => {
    eventDetailServices.getEventDetail(id).then(
      (data: IEventDetails) => {
        setEventDetail(data);
        data.data.performances.map((value, index) => [
          value.tickets.map((tickets, index) => {
            const rate: ITicketRate = {
              id: tickets.ticket.id,
              identifier: tickets.ticket.identifier,
              price: tickets.ticket.price,
              currency: tickets.ticket.currency,
            };
            ticketRateObj.push(rate);
          }),
        ]);
        if (ticketRateObj.length > 0) {
          let noDuplicatesTicketRate = ticketRateObj.reduce((arr, item) => {
            const filtered = arr.filter((i) => i["id"] !== item["id"]);
            return [...filtered, item];
          }, []);
          setTicketRate(noDuplicatesTicketRate);
        }
        getShowDates(data?.data?.performances);
      },
      (error) => {
        console.log(error);
      }
    );

    //window.addEventListener("scroll", handleScroll, ({ passive: true } as unknown) as EventListenerOptions);
    // remove event on unmount to prevent a memory leak with the cleanup
    /*return () => {
       window.removeEventListener("scroll", handleScroll, ({ passive: true } as unknown) as EventListenerOptions);
    }*/
  }, [identifierCount]);
  return (
    <div className={` nc-ListingExperiencesDetailPage `}>
      {/* SINGLE HEADER */}
      {eventDetail?.data?.id > 0 && (
        <header className="rounded-md sm:rounded-xl">
          <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
            <div
              className="col-span-3 row-span-3 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={handleOpenModalImageGallery}
            >
              <Image
                alt="photo 1"
                fill
                className="object-cover  rounded-md sm:rounded-xl"
                src={
                  process.env.AWS_CLOUD_FRONT_URL +
                    "images/events/" +
                    eventDetail?.data?.galleries[0]?.img_name || ""
                }
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            {/* {PHOTOS.filter((_, i) => i >= 1 && i < 4).map((item, index) => ( */}
            {eventDetail.data.galleries.map((item, index) => (
              <div
                key={index}
                className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                  index >= 2 ? "block" : ""
                }`}
              >
                <div className="aspect-w-4 aspect-h-3">
                  <Image
                    alt={item?.img_name}
                    fill
                    className="object-cover w-full h-full rounded-md sm:rounded-xl "
                    src={
                      process.env.AWS_CLOUD_FRONT_URL +
                        "images/events/" +
                        item?.img_name || ""
                    }
                    sizes="400px"
                  />
                </div>

                {/* OVERLAY */}
                <div
                  className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handleOpenModalImageGallery}
                />
              </div>
            ))}

            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              onClick={handleOpenModalImageGallery}
            >
              <Squares2X2Icon className="h-5 w-5" />
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </div>
          </div>
        </header>
      )}
      {/* MAIn */}
      <main className="relative z-10 mt-11 flex flex-col-reverse gap-8 lg:gap-0 lg:flex-row ">
        {/* CONTENT */}
        {eventDetail?.data?.id > 0 && (
          <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
            {renderSection1(eventDetail)}
            {renderSection2(eventDetail)}
            {renderSection3()}
            <SectionDateRange
              eventStartDate={showsStartDate}
              eventEndDate={showsEndDate}
              enableDates={enableDates}
              onSelectDate={getBookdate}
              selectDate={selectedDate}
            />

            {renderSection9(eventDetail)}

            {renderSection10()}
            {renderSection5()}
            {renderSection7()}
            {renderSection8()}
          </div>
        )}

        {/* SIDEBAR */}
        {eventDetail?.data?.id > 0 && (
          <div className="block flex-grow mt-14 lg:mt-0">
            <div className="top-28 sticky">{renderSidebar1()}</div>
          </div>
        )}
      </main>
      <OTPValidation openOTP={isOpenOPT} onChangeStatus={setOPTModelStatus} />
    </div>
  );
};

export default EventDetailPage;
