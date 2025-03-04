"use client";

import { Tab } from "@headlessui/react";
import CarCard from "@/components/CarCard";
import CommentListing from "@/components/CommentListing";
import ExperiencesCard from "@/components/ExperiencesCard";
import StartRating from "@/components/StartRating";
import StayCard from "@/components/StayCard2";
import {
  DEMO_CAR_LISTINGS,
  DEMO_EXPERIENCES_LISTINGS,
  DEMO_STAY_LISTINGS,
} from "@/data/listings";
import React, { FC, Fragment, useEffect, useState } from "react";
import Avatar from "@/shared/Avatar";
import { SocialType } from "@/shared/SocialsShare";
import ButtonSecondary from "@/shared/ButtonSecondary";
import SocialsList from "@/shared/SocialsList";
import eventDetailServices from "@/services/event-detail.services";
import { IPromoterDetails } from "@/model/IEventDetail";
import moment from "moment";
import EventListSection from "@/components/EventListSection";
import { EventTypes, IEventType, Data, Event } from "@/model/IEventType";
import HomeService from "@/services/home.services";
import CardCategory4 from "@/components/CardCategory4";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export interface PromoterPageProps {
  params?: { id: string };
}

const PromoterPage: FC<PromoterPageProps> = ({ params }) => {
  const id = Number(params.id);
  let [categories] = useState(["Stays", "Experiences", "Car for rent"]);
  const [promoterDetail, setPromoterDetail] = useState<
    IPromoterDetails | null | undefined
  >(null);
  const [socialsData, setSocialsData] = useState<SocialType[]>([]);
  useEffect(() => {
    eventDetailServices.getPromoterDetail(id).then(
      (data: any) => {
        setPromoterDetail(data);
        setSocialsData([
          {
            name: "Facebook",
            icon: "lab la-facebook-square",
            href: data?.data?.facebook,
          },
          {
            name: "Twitter",
            icon: "lab la-twitter",
            href: data?.data?.twitter,
          },
          { name: "Website", icon: "lab la-weebly", href: data?.data?.website },
        ]);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const renderSidebar = () => {
    return (
      <div className=" w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
        <Avatar
          hasChecked
          hasCheckedClass="w-6 h-6 -top-0.5 right-2"
          sizeClass="w-28 h-28"
          imgUrl={`${process.env.AWS_CLOUD_FRONT_URL}images/promoters/${promoterDetail?.data?.image_file_name}`}
          userName={promoterDetail?.data?.detail?.name}
        />

        {/* ---- */}
        <div className="space-y-3 text-center flex flex-col items-center">
          <h2 className="text-3xl font-semibold">
            {promoterDetail?.data?.detail?.name}
          </h2>
          {/*<StartRating className="!text-base" />*/}
        </div>

        {/* ---- */}
        <p className="text-neutral-500 dark:text-neutral-400">
          {promoterDetail?.data?.detail?.description}
        </p>

        {/* ---- */}
        <SocialsList
          className="!space-x-3"
          itemClass="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xl"
          socials={socialsData}
        />

        {/* ---- */}
        <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>

        {/* ---- */}
        <div className="space-y-4">
          {/*<div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              Ha Noi, Viet Nam
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
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
            <span className="text-neutral-6000 dark:text-neutral-300">
              Speaking English
            </span>
          </div>*/}

          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
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
            <span className="text-neutral-6000 dark:text-neutral-300">
              Joined in{" "}
              {moment(promoterDetail?.data?.added_date).format("MMM, YYYY")}
            </span>
          </div>
        </div>
      </div>
    );
  };
  const events: Event[] = [];
  const [eventData2, setEventData2] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const [eventData3, setEventData3] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const { t } = useTranslation();
  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">{t("wowEventsPortfolio")}</h2>
          {/* <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {`Kevin Francis's listings is very rich, 5 star reviews help him to be
            more branded.`}
          </span> */}
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
          {eventData2?.events?.map((stay) => (
            <CarCard key={stay.id} event={stay} />
          ))}
        </div>
      </div>
    );
  };
  const tapsection = () => {
    return (
      <>
        <div>
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? "bg-secondary-900 text-secondary-50 "
                          : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="">
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {DEMO_STAY_LISTINGS.filter((_, i) => i < 4).map((stay) => (
                    <StayCard key={stay.id} data={stay} />
                  ))}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>{t("showMeMore")}</ButtonSecondary>
                </div>
              </Tab.Panel>
              <Tab.Panel className="">
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {/*{DEMO_EXPERIENCES_LISTINGS.filter((_, i) => i < 4).map(
                    (stay) => (
                      <ExperiencesCard key={stay.id} data={stay} />
                    )
                  )}*/}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>{t("showMeMore")}</ButtonSecondary>
                </div>
              </Tab.Panel>
              <Tab.Panel className="">
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {DEMO_CAR_LISTINGS.filter((_, i) => i < 4).map((stay) => (
                    <CarCard key={stay.id} data={stay} />
                  ))}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>{t("showMeMore")}</ButtonSecondary>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </>
    );
  };
  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing hasListingTitle className="pb-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    HomeService.getEventsForType(EventTypes[1]).then(
      (data) => {
        setEventData2(data.data);
      },
      (error) => {
        console.log(error);
      }
    );

    HomeService.getEventsForType(EventTypes[2]).then(
      (data) => {
        setEventData3(data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  return (
    <div className={`nc-PromoterPage `}>
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="block flex-grow mb-24 lg:mb-0">
          {promoterDetail?.data?.id && (
            <div className="lg:sticky lg:top-24">{renderSidebar()}</div>
          )}
        </div>
        {promoterDetail?.data?.id && (
          <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
            {renderSection1()}
            {/* {renderSection2()} */}
          </div>
        )}
      </main>
    </div>
  );
};

export default PromoterPage;
