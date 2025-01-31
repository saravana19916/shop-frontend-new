"use client";
import CardCategory5 from "@/components/CardCategory5";
import React, { Fragment, useEffect, useState } from "react";
import { EventTypes, IEventType, Data, Event } from "@/model/IEventType";
import HomeService from "@/services/home.services";
import CardCategory4 from "@/components/CardCategory4";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import WishlistService from "@/services/wishlist.services";
import { IWishListEvent } from "@/model/IWishListEvent";
import { boolean } from "zod";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import WishListCard2 from "./WishListCard2";
import { Tab } from "@headlessui/react";
import AuthService from "@/services/auth.service";

const WishlistPage = ({}) => {
  const user: any | undefined | null = AuthService.authUser();

  const events: Event[] = [];
  const [imageHeight, setImageHeight] = useState(0);
  const handleImageHeight = (height: number) => setImageHeight(height);

  const [wishlist, setWishlist] = useState<IWishListEvent[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const _getWishList = async () => {
    setIsFetching(true);
    const getMyWishlist = await WishlistService?.getMyWishlist();
    setIsFetching(false);
    if (getMyWishlist?.status === 200 || getMyWishlist?.status === 201) {
      const eventDetails: any = getMyWishlist?.data;
      setWishlist(eventDetails);
    } else {
      setWishlist([]);
    }
  };
  useEffect(() => {
    _getWishList();
  }, []);
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
  console.log(wishlist, "event?.event?.performances");
  const [eventTypesList, setEventTypesList] = useState<any>([]);

  useEffect(() => {
    const eventTypes = Array.from(
      new Set(wishlist?.map((event) => event?.event?.type))
    )
      ?.filter((type) => type !== undefined)
      ?.filter((type) => type !== null);
    setEventTypesList(eventTypes || []);
  }, [wishlist]);

  return (
    <main className="my-4 lg:my-8">
      <div>
        <h2 className="text-3xl font-semibold mb-8 mt-4">Wishlist</h2>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="mt-8">
        {isFetching && !wishlist?.length ? (
          <>{SkeletonCard4()}</>
        ) : (
          <>
            <Tab.Group>
              <Tab.List className="flex space-x-3 overflow-x-auto">
                <Tab key={"all"} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-12 py-2 text-sm sm:text-base sm:px-8 sm:py-2.5 capitalize rounded-full focus:outline-none ${
                        selected
                          ? "bg-primary-900 text-white "
                          : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      } `}
                    >
                      All
                    </button>
                  )}
                </Tab>
                {eventTypesList.map((item) => (
                  <Tab key={item} as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`flex-shrink-0 block !leading-none font-medium px-8 py-2 text-sm sm:text-base sm:px-8 sm:py-2.5 capitalize rounded-full focus:outline-none ${
                          selected
                            ? "bg-primary-900 text-white "
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
                <Tab.Panel className="mt-8">
                  {wishlist && wishlist.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {wishlist.map((item) => (
                          <>
                            <WishListCard2
                              event={item}
                              imgHeight={handleImageHeight}
                              refetchWishList={_getWishList}
                              wishlistEvents={wishlist}
                              user={user}
                            />
                          </>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="my-12 rounded-xl p-5 py-12 bg-zinc-100 w-full flex flex-col items-center">
                        <span className="text-neutral-600 text-xl">
                          No event found on wishlist!
                        </span>
                        <a
                          className="text-primary-6000 text-sm mt-2 font-light flex gap-2"
                          href="/home"
                        >
                          Take me to homepage{" "}
                          <ArrowLongRightIcon className="w-5 h-5 font-light opacity-70" />
                        </a>
                      </div>
                    </>
                  )}
                </Tab.Panel>
                {eventTypesList?.map((type) => {
                  const list = wishlist?.filter(
                    (event) => event?.event?.type == type
                  );
                  return (
                    <>
                      <Tab.Panel className="mt-8">
                        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {list.map((item) => (
                            <>
                              <WishListCard2
                                event={item}
                                imgHeight={handleImageHeight}
                                refetchWishList={_getWishList}
                                wishlistEvents={wishlist}
                              />
                            </>
                          ))}
                        </div>
                      </Tab.Panel>
                    </>
                  );
                })}
              </Tab.Panels>
            </Tab.Group>
          </>
        )}
      </div>
    </main>
  );
};
export default WishlistPage;
