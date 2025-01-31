"use client";
import React, { FC } from "react";
import SectionSlider from "./SectionSlider";
import { Data } from "@/model/IEventType";
import { IWishListEvent } from "@/model/IWishListEvent";
import Select from "@/shared/Select";
import Everything from "./Everything";

export interface EventListProps {
  data?: Data | null | undefined;
  categoryCardType?:
    | "lastChance"
    | "hotOnes"
    | "top10"
    | "specials"
    | "everything";
  itemPerRow?: number;
  tag?: "count" | "discount";
  sliderStyle?: "style1" | "style2";
  wishListEvents?: IWishListEvent[];
  refetchWishList?: () => void;
  user?: any;
}

const EventList: FC<EventListProps> = ({
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
          categoryCardType === "top10" || categoryCardType === "everything"
            ? "bg-gray-100 pt-5 pb-32 rounded-2xl"
            : ""
        }`}
        id={`${convertToCamelCase(data.title)}`}
      >
        {data.title == "" ? (
          SkeletonCard(categoryCardType)
        ) : (
          <div>
            <div className="mb-6 lg:mb-8 space-y-3">
              <h3 className="text-3xl font-bold text-center">
                {data && data!.title ? data.title : ""}
              </h3>

              <p className="block text-sm text-grey-700 font-semibold dark:text-neutral-400 mt-1.5 text-center">
                {data && data!.subtitle ? data.subtitle : ""}
              </p>

              <div className="flex justify-center items-center space-x-3">
                {categoryCardType === "specials" ||
                categoryCardType === "everything" ? (
                  <>
                    <Select
                      className={`pl-4 !w-48 !rounded-full ${
                        categoryCardType === "everything"
                          ? "bg-white"
                          : "!bg-gray-100"
                      }`}
                    >
                      <option value="">abu dhabi</option>
                    </Select>
                    <Select
                      className={`pl-4 !w-48 !rounded-full ${
                        categoryCardType === "everything"
                          ? "bg-white"
                          : "!bg-gray-100"
                      }`}
                    >
                      <option value="">events</option>
                    </Select>
                    <Select
                      className={`pl-4 !w-48 !rounded-full ${
                        categoryCardType === "everything"
                          ? "bg-white"
                          : "!bg-gray-100"
                      }`}
                    >
                      <option value="">concerts</option>
                    </Select>
                    <Select
                      className={`pl-4 !w-48 !rounded-full ${
                        categoryCardType === "everything"
                          ? "bg-white"
                          : "!bg-gray-100"
                      }`}
                    >
                      <option value="">suitable for</option>
                    </Select>
                  </>
                ) : (
                  <Select
                    className={`pl-4 !w-48 !rounded-full ${
                      categoryCardType === "top10" ? "bg-white" : "!bg-gray-100"
                    }`}
                  >
                    <option value="">London</option>
                  </Select>
                )}
              </div>
            </div>

            {categoryCardType == "lastChance" && (
              <SectionSlider
                user={user}
                categoryCardType="lastChance"
                itemPerRow={itemPerRow}
                sliderStyle={sliderStyle}
                eventList={data && data?.events ? data?.events : undefined}
                wishListEvents={wishListEvents}
                refetchWishList={refetchWishList}
                customClass="p-5 bg-gray-100 rounded-lg"
              />
            )}

            {categoryCardType == "hotOnes" && (
              <SectionSlider
                user={user}
                categoryCardType="hotOnes"
                itemPerRow={itemPerRow}
                sliderStyle={sliderStyle}
                eventList={data && data?.events ? data?.events : undefined}
                wishListEvents={wishListEvents}
                refetchWishList={refetchWishList}
                customClass="p-5 bg-gray-100 rounded-lg pb-0"
              />
            )}

            {categoryCardType == "top10" && (
              <SectionSlider
                user={user}
                categoryCardType="top10"
                itemPerRow={itemPerRow}
                sliderStyle={sliderStyle}
                eventList={data && data?.events ? data?.events : undefined}
                wishListEvents={wishListEvents}
                refetchWishList={refetchWishList}
                customClass="p-5 bg-white rounded-lg"
              />
            )}

            {categoryCardType == "specials" && (
              <SectionSlider
                user={user}
                categoryCardType="specials"
                itemPerRow={itemPerRow}
                sliderStyle={sliderStyle}
                eventList={data && data?.events ? data?.events : undefined}
                wishListEvents={wishListEvents}
                refetchWishList={refetchWishList}
                customClass="p-5 bg-gray-100 rounded-t-lg"
              />
            )}

            {categoryCardType == "everything" && (
              <Everything
                user={user}
                itemPerRow={itemPerRow}
                sliderStyle={sliderStyle}
                eventList={data && data?.events ? data?.events : undefined}
                wishListEvents={wishListEvents}
                refetchWishList={refetchWishList}
                className="p-5 bg-white rounded-lg"
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EventList;
