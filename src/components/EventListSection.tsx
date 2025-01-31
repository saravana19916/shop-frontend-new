"use client";
import React, { FC, useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import CardCategory6 from "@/components/CardCategory6";
import ExperiencesCard from "@/components/ExperiencesCard";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import { IEventType, Data, Event } from "@/model/IEventType";
import { IWishListEvent } from "@/model/IWishListEvent";

export interface EventListSectionProps {
  data?: Data | null | undefined;
  categoryCardType?:
    | "card1"
    | "card3"
    | "card4"
    | "card5"
    | "card6"
    | "card7"
    | "numbercard";
  itemPerRow?: number;
  tag?: "count" | "discount";
  sliderStyle?: "style1" | "style2";
  wishListEvents?: IWishListEvent[];
  refetchWishList?: () => void;
  user?: any;
}

const EventListSection: FC<EventListSectionProps> = ({
  data,
  categoryCardType = "card3",
  itemPerRow = 3,
  tag,
  sliderStyle = "style2",
  wishListEvents,
  refetchWishList,
  user,
}) => {
  const SkeletonCard4 = () => {
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl p-6">
            <div className="flex flex-col space-y-2">
              <div className="w-full rounded-md bg-gray-300 h-80"></div>
              <div className="h-3 w-2/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-7/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-4/12 rounded-md bg-gray-300"></div>
            </div>
          </div>
          <div className="hidden md:block w-full md:w-1/4 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl p-6">
            <div className="flex flex-col space-y-2">
              <div className="w-full rounded-md bg-gray-300 h-80"></div>
              <div className="h-3 w-2/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-7/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-4/12 rounded-md bg-gray-300"></div>
            </div>
          </div>
          <div className="hidden md:block w-full md:w-1/4 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl p-6">
            <div className="flex flex-col space-y-2">
              <div className="w-full rounded-md bg-gray-300 h-80"></div>
              <div className="h-3 w-2/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-7/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-4/12 rounded-md bg-gray-300"></div>
            </div>
          </div>
          <div className="hidden md:block w-full md:w-1/4 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl p-6">
            <div className="flex flex-col space-y-2">
              <div className="w-full rounded-md bg-gray-300 h-80"></div>
              <div className="h-3 w-2/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-7/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-4/12 rounded-md bg-gray-300"></div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const SkeletonCard6 = () => {
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/3 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl p-6">
            <div className="flex flex-col space-y-2">
              <div className="w-full rounded-md bg-gray-300 sm:h-f h-[35rem]"></div>
            </div>
          </div>
          <div className="hidden md:block w-full md:w-1/3 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl p-6">
            <div className="flex flex-col space-y-2">
              <div className="w-full rounded-md bg-gray-300 h-[35rem]"></div>
            </div>
          </div>
          <div className="hidden md:block w-full md:w-1/3 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl p-6">
            <div className="flex flex-col space-y-2">
              <div className="w-full rounded-md bg-gray-300 h-[35rem]"></div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const SkeletonCard5 = () => {
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/5 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl p-6">
            <div className="flex flex-col space-y-2">
              <div className="w-full rounded-md bg-gray-300 h-40"></div>
              <div className="h-3 w-2/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-7/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-4/12 rounded-md bg-gray-300"></div>
            </div>
          </div>
          <div className="hidden md:block w-full md:w-1/5 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl p-6">
            <div className="flex flex-col space-y-2">
              <div className="w-full rounded-md bg-gray-300 h-40"></div>
              <div className="h-3 w-2/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-7/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-4/12 rounded-md bg-gray-300"></div>
            </div>
          </div>
          <div className="hidden md:block w-full md:w-1/5 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl p-6">
            <div className="flex flex-col space-y-2">
              <div className="w-full rounded-md bg-gray-300 h-40"></div>
              <div className="h-3 w-2/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-7/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-4/12 rounded-md bg-gray-300"></div>
            </div>
          </div>
          <div className="hidden md:block w-full md:w-1/5 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl p-6">
            <div className="flex flex-col space-y-2">
              <div className="w-full rounded-md bg-gray-300 h-40"></div>
              <div className="h-3 w-2/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-7/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-4/12 rounded-md bg-gray-300"></div>
            </div>
          </div>
          <div className="hidden md:block w-full md:w-1/5 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl p-6">
            <div className="flex flex-col space-y-2">
              <div className="w-full rounded-md bg-gray-300 h-40"></div>
              <div className="h-3 w-2/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-7/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-4/12 rounded-md bg-gray-300"></div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const SkeletonCard = (cardType: any) => {
    switch (cardType) {
      case "card7":
        return <>{SkeletonCard6()}</>;
      case "card6":
        return <>{SkeletonCard6()}</>;
      case "card4":
        return <>{SkeletonCard4()}</>;
      case "card5":
        return <>{SkeletonCard5()}</>;
    }
  };
  const convertToCamelCase = (inputString: any) => {
    const lowercaseString = inputString.toLowerCase();
    const camelCaseString = lowercaseString.replace(/\s+/g, "_");
    return camelCaseString;
  };

  return (
    <>
      <div
        className={`container relative mb-24 ${
          categoryCardType === "numbercard" ? "xxl:px-10 xxl:ps-32" : ""
        }`}
        id={`${convertToCamelCase(data.title)}`}
      >
        {data.title == "" ? (
          SkeletonCard(categoryCardType)
        ) : (
          <div>
            <div className="mb-6 lg:mb-8 space-y-3">
              <h3 className="text-3xl md:text-4xl font-semibold">
                {data && data!.title ? data.title : ""}
              </h3>

              <p className="block mt-2 md:mt-3 font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400">
                {data && data!.subtitle ? data.subtitle : ""}
              </p>
            </div>

            {categoryCardType == "card6" && (
              <SectionSliderNewCategories
                user={user}
                categoryCardType="card6"
                itemPerRow={3}
                sliderStyle={sliderStyle}
                tag={tag}
                eventList={data && data?.events ? data?.events : undefined}
                wishListEvents={wishListEvents}
                refetchWishList={refetchWishList}
              />
              // <div className="grid grid-cols-12 gap-6">
              //   {data &&
              //     data!.events &&
              //     data!.events!.length > 0 &&
              //     data.events.map((value: Event, index: number) => {
              //       if (itemPerRow && index < itemPerRow) {

              //         if (index == 0 || index == 3) {
              //           return (
              //             <>
              //               <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
              //                 <CardCategory6 event={value} />
              //               </div>
              //             </>
              //           );
              //         } else {
              //           if (index == 1) {
              //             return (
              //               <>
              //                 <div className="col-span-12 sm:col-span-6 lg:col-span-4 grid grid-rows-2 gap-6">
              //                   <CardCategory6 event={value} />
              //                   <CardCategory6 event={data.events[index + 1]} />
              //                 </div>
              //               </>
              //             );
              //           }
              //         }
              //       }
              //     })}
              // </div>
            )}

            {categoryCardType == "card3" && (
              <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data &&
                  data!.events &&
                  data!.events!.length > 0 &&
                  data.events.map((value: Event, index: number) => {
                    if (itemPerRow && index < itemPerRow) {
                      return (
                        <>
                          <ExperiencesCard key={value.id} data={value} />
                        </>
                      );
                    }
                  })}
              </div>
            )}

            {categoryCardType == "card4" && (
              <SectionSliderNewCategories
                user={user}
                categoryCardType="card4"
                itemPerRow={itemPerRow}
                sliderStyle={sliderStyle}
                tag={tag}
                eventList={data && data?.events ? data?.events : undefined}
                wishListEvents={wishListEvents}
                refetchWishList={refetchWishList}
              />
            )}
            {categoryCardType == "numbercard" && (
              <SectionSliderNewCategories
                user={user}
                categoryCardType="numbercard"
                itemPerRow={itemPerRow}
                sliderStyle={sliderStyle}
                tag={tag}
                eventList={data && data?.events ? data?.events : undefined}
                wishListEvents={wishListEvents}
                refetchWishList={refetchWishList}
              />
            )}
            {categoryCardType == "card5" && (
              <SectionSliderNewCategories
                user={user}
                categoryCardType="card5"
                itemPerRow={itemPerRow}
                sliderStyle={sliderStyle}
                eventList={data && data?.events ? data?.events : undefined}
                wishListEvents={wishListEvents}
                refetchWishList={refetchWishList}
              />
            )}
            {categoryCardType == "card7" && (
              <SectionSliderNewCategories
                user={user}
                categoryCardType="card7"
                itemPerRow={itemPerRow}
                sliderStyle={sliderStyle}
                eventList={data && data?.events ? data?.events : undefined}
                wishListEvents={wishListEvents}
                refetchWishList={refetchWishList}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EventListSection;
