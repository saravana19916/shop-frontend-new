import {
  BookmarkIcon,
  ShoppingCartIcon,
  TicketIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";

import Link from "next/link";
import React, { FC, Fragment, useEffect, useState } from "react";
import ButtonPrimary from "./ButtonPrimary";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";
import { useGetCart } from "@/queries/cart.query";
import { Route } from "next";
interface IProps {
  className?: string;
  user?: any;
}
const userDataMenu = [
  {
    key: "tickets",
    label: "My Tickets",
    href: "/my-tickets",
  },
  {
    key: "wishlist",
    label: "Wishlist",
    href: "/account-wishlist",
  },
  {
    key: "account",
    label: "Account",
    href: "/account",
  },
];
const NavBarCart: FC<IProps> = ({ className = "", user }) => {
  const handleMouseEnter = () => {
    const element = document.getElementById("cartPopoverButton");
    if (element && element.classList.contains("show-popover-custom")) {
      return;
    } else {
      element.click();
    }
  };
  const queryClient = useQueryClient();
  const { data: cartData } = useGetCart({
    key: "CART_DATA",
  });
  const hasPerformance = cartData?.data?.some(
    (event) => event?.performances?.length > 0
  );
  const GetIcon = (key: string, className) => {
    switch (key) {
      case "tickets":
        return <TicketIcon className={className} />;
      case "wishlist":
        return <BookmarkIcon className={className} />;
      case "account":
        return <UserCircleIcon className={className} />;
      default:
        return;
    }
  };
  return (
    <>
      <Popover
        className="TemplatesDropdown hidden lg:block self-center"
        onMouseEnter={() => handleMouseEnter()}
      >
        {({ open, close }) => {
          useEffect(() => {
            queryClient.setQueryData(["currentPopoverState"], open || false);
          }, [open]);
          return (
            <>
              <Popover.Button
                id="cartPopoverButton"
                className={`${
                  open ? "show-popover-custom" : "text-opacity-80"
                } group h-10 sm:h-12 py-1.5 inline-flex items-center text-sm text-gray-800 dark:text-slate-300 font-medium hover:text-opacity-100 focus:outline-none
          `}
              >
                <div
                  className={`self-center cursor-pointer text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center ${className}`}
                >
                  <ShoppingCartIcon className="w-6 h-6" aria-hidden="true" />
                </div>
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-600 transform"
                enterFrom="opacity-0 -translate-y-6"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-400 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-6"
              >
                <Popover.Panel className="absolute z-20 top-full w-full inset-x-0">
                  <div className="bg-white dark:bg-neutral-900 ">
                    <div className="container pb-4">
                      {cartData?.data?.length > 0 && hasPerformance ? (
                        <>
                          {cartData?.data?.map((event) => (
                            <>
                              <div className="flex flex-col text-sm py-8">
                                <div className="flex justify-between items-center w-full">
                                  <h2 className="text-lg font-semibold">
                                    Cart
                                  </h2>
                                  <ButtonPrimary
                                    className="block"
                                    rounded="rounded-full"
                                    fontSize="text-base"
                                    fontWeight="font-normal"
                                    href={
                                      `/checkout/${event?.encrypted_identifier}` as Route
                                    }
                                  >
                                    Review Cart
                                  </ButtonPrimary>
                                </div>

                                {event?.performances?.map((performance) => (
                                  <>
                                    {performance?.tickets?.map((ticket) => (
                                      <>
                                        <div className="mt-3 w-full">
                                          <div className="flex items-center gap-6 py-4">
                                            <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>
                                            <div>
                                              <span className="text-sm font-medium">
                                                <span className="font-semibold">
                                                  {ticket?.quantity}{" "}
                                                  &nbsp;x&nbsp;{" "}
                                                  {ticket?.identifier}
                                                </span>
                                                &nbsp; - &nbsp;{" "}
                                                {event?.event?.identifier}{" "}
                                                &nbsp; - &nbsp;{" "}
                                                <span>
                                                  {moment(
                                                    performance?.start_date
                                                  )?.format("DD MMM YY, HH:mm")}
                                                </span>
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    ))}
                                  </>
                                ))}
                              </div>
                            </>
                          ))}
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col text-sm pt-12 pb-4 rounded-lg">
                            <div className="flex justify-between items-center w-full">
                              <span className="text-2xl font-semibold mb-6">
                                Your Cart is Empty!
                              </span>
                            </div>
                            {user ? (
                              <></>
                            ) : (
                              <>
                                <span>
                                  <a
                                    className="text-reddish-500 underline-offset-2"
                                    href="/login"
                                  >
                                    Sign In
                                  </a>{" "}
                                  to see if you have any cart items
                                </span>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    {user ? (
                      <>
                        <div className="container pb-10">
                          <div className="pb-8">
                            <span className="text-sm">My Profile</span>
                            <div className="mt-3">
                              {userDataMenu?.map((data) => (
                                <>
                                  <a
                                    className="text-neutral-600 mt-3 flex items-center text-sm hover:text-reddish-500 gap-2"
                                    href={data.href}
                                  >
                                    {GetIcon(
                                      data?.key,
                                      "me-2 w-4 h-4 inline-block"
                                    )}{" "}
                                    <span>
                                      {data?.label}
                                    </span>
                                  </a>
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    className="bg-gray-100 opacity-20 backdrop-blur-lg"
                    style={{ minHeight: "90vh" }}
                    onMouseEnter={() => {
                      close();
                    }}
                  ></div>
                </Popover.Panel>
              </Transition>
            </>
          );
        }}
      </Popover>
    </>
  );
};

export default NavBarCart;
