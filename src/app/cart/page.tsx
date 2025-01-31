"use client";
import { IEventDataSetForSelect } from "@/model/IEventType";
import CartAPI, { IDeleteFromCartPayload } from "@/services/cart.services";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Select from "@/shared/Select";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { QuestionMarkCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const capitalizeWords = (str) => {
    return str.toLowerCase().replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  };
  const [eventDataSet, setEventDataSet] = useState<IEventDataSetForSelect[]>(
    []
  );
  const [selectedEvent, setSelectedEvent] = useState<null | number>(0);
  const [cartItems, setCartItems] = useState<any>([]);
  const [isFetchingCartEvent, setIsFetchingCartEvent] =
    useState<boolean>(false);
  const [isFetchingCartItem, setIsFetchingCartItem] = useState<boolean>(false);
  const _getCartAll = async () => {
    setIsFetchingCartEvent(true);
    const cartEvents = await CartAPI?.getAllCart();
    console.log(cartEvents, "cartEvents");
    if (cartEvents?.status === 201 || cartEvents?.status === 200) {
      if (
        cartEvents &&
        cartEvents?.data?.data &&
        cartEvents?.data?.data?.length > 0
      ) {
        const eventsList = cartEvents?.data?.data?.map((performance) => {
          return {
            key: performance?.event?.id,
            value: performance?.event?.identifier,
          };
        });
        setEventDataSet(eventsList);
      } else {
        setEventDataSet([]);
      }
    } else {
      setEventDataSet([]);
    }
    setIsFetchingCartEvent(false);
  };
  useEffect(() => {
    _getCartAll();
  }, []);
  const _getCartItems = async (event_id) => {
    setIsFetchingCartItem(true);
    const cart = await CartAPI?.getCart(event_id);
    console.log(cart, "cart");
    if (cart?.status === 200 || cart.status === 201) {
      setCartItems(cart?.data?.data);
    } else {
      setCartItems(null);
    }
    setIsFetchingCartItem(false);
  };
  const { push } = useRouter();

  useEffect(() => {
    console.log(selectedEvent, "event");

    selectedEvent && _getCartItems(selectedEvent);
  }, [selectedEvent]);
  const _handleEventPage = () => {
    // selectedEvent && push(`/${selectedEvent}`);
  };
  const _handleCheckout = () => {
    // cartItems && cartItems?.performances && push("/checkout");
  };
  const _getTotalPrice = (price, serviceFee, processFee, quantity) => {
    if (price && quantity) {
      const totalPrice = (price + serviceFee || 0 + processFee || 0) * quantity;
      return totalPrice;
    } else return 0;
  };
  const getTotalPriceForAll = () => {
    let totalPrice = 0;

    cartItems?.performances?.forEach((performance) => {
      performance?.tickets?.forEach((ticket) => {
        const ticketTotalPrice = _getTotalPrice(
          ticket?.price,
          1,
          ticket?.service_fee,
          ticket?.quantity
        );
        totalPrice += ticketTotalPrice;
      });
    });

    return totalPrice;
  };
  const _handleDelete = async (ticket, performance) => {
    console.log(performance);
    console.log(ticket);
    const data: IDeleteFromCartPayload = {
      performance_id: performance?.id,
      event_id: selectedEvent,
      ticket_id: ticket?.id,
      quantity: ticket?.quantity,
    };
    const removeFromCart = await CartAPI?.deleteFromCart(data);
    console.log(removeFromCart, "removeFromCart");
    if (removeFromCart?.status === 201 || removeFromCart?.status === 200) {
      toast.dark("Ticket removed successfully!");
      setCartItems(removeFromCart?.data?.data);
    } else {
      toast.error("Unable to remove the ticket from cart!");
    }
  };

  return (
    <>
      <div className="container my-16">
        <div>
          <h2 className="text-3xl font-semibold my-3"> Your Shopping Cart</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {isFetchingCartEvent ? (
          <>
            <div className="my-12 h-72 w-full rounded-md bg-gray-300 animate-pulse"></div>
          </>
        ) : (
          <>
            {eventDataSet?.length > 0 ? (
              <>
                <div className="my-12 rounded-xl p-5 py-12 bg-zinc-100 w-full flex flex-col items-center">
                  <span className="text-neutral-600 text-xl mb-5">
                    Select an event to see its cart items
                  </span>
                  <div className="w-2/3 mb-4">
                    <Select
                      className="rounded-full p-2 px-4"
                      disabled={isFetchingCartEvent}
                      onChange={(event) =>
                        setSelectedEvent(
                          event?.target?.value
                            ? Number(event?.target?.value)
                            : null
                        )
                      }
                    >
                      <option value="">Select Event</option>
                      {eventDataSet &&
                        eventDataSet?.map((event) => (
                          <>
                            <option value={event.key} key={event.key}>
                              {event.value}
                            </option>
                          </>
                        ))}
                    </Select>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="my-12 rounded-xl p-5 py-12 bg-zinc-100 w-full flex flex-col items-center">
                  <span className="text-neutral-600 text-xl">
                    No event found on the cart
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
          </>
        )}

        {selectedEvent ? (
          <>
            {isFetchingCartItem ? (
              <>
                <div className="h-96 w-full rounded-md bg-gray-300 animate-pulse"></div>
              </>
            ) : (
              <>
                {cartItems ? (
                  <>
                    <div className="mt-5 mb-3 rounded-xl pb-4 bg-zinc-100 w-full">
                      <div className="p-6">
                        <span>Item(s)</span>
                      </div>
                      <div className="p-6 w-full bg-zinc-200">
                        {cartItems?.performances?.length > 0 ? (
                          <>
                            {cartItems?.performances?.map(
                              (performance, index) => (
                                <>
                                  <div
                                    key={index}
                                    className={`flex flex-col ${
                                      index === 0 ? "" : "mt-4"
                                    }`}
                                  >
                                    <span className="text-neutral-600 text-sm">
                                      Performance Date:
                                    </span>
                                    <span className="text-primary-6000">
                                      {moment(performance?.start_date)?.format(
                                        "DD MMM YYYY HH:mm"
                                      )}
                                    </span>
                                  </div>
                                  <div className="mt-6 w-full border-b"></div>
                                  {performance?.tickets?.length > 0 ? (
                                    <>
                                      <div className="overflow-x-auto">
                                        <table className="min-w-full">
                                          <thead className="bg-primary-6000 text-gray-200">
                                            <tr>
                                              <th className="px-4 py-2 border border-gray-300 font-normal border-l-primary-6000 border-y-primary-6000">
                                                Ticket Type
                                              </th>
                                              <th className="px-4 py-2 border border-gray-300 font-normal border-y-primary-6000">
                                                Quantity
                                              </th>
                                              <th className="px-4 py-2 border border-gray-300 font-normal  border-y-primary-6000">
                                                Price per Ticket
                                              </th>
                                              <th className="px-4 py-2 border border-gray-300 font-normal  border-y-primary-6000">
                                                Process Fee
                                                <span className="text-gray-200 font-bold inline">
                                                  <QuestionMarkCircleIcon className="h-5 w-5 inline-block ms-2" />
                                                </span>
                                              </th>
                                              <th className="px-4 py-2 border border-gray-300 font-normal  border-y-primary-6000">
                                                Service Fee
                                                <span className="text-gray-200 font-bold inline">
                                                  <QuestionMarkCircleIcon className="h-5 w-5 inline-block ms-2" />
                                                </span>
                                              </th>
                                              <th className="px-4 py-2 border border-gray-300 font-normal border-y-primary-6000">
                                                Discount Amount
                                              </th>
                                              <th className="px-4 py-2 border border-gray-300 font-normal border-y-primary-6000">
                                                Total Price
                                              </th>
                                              <th className="border border-gray-300 font-normal border-y-primary-6000 border-r-primary-6000">
                                                Action{" "}
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody className="bg-inherit">
                                            {performance?.tickets?.map(
                                              (ticket) => (
                                                <>
                                                  <tr key={ticket?.id}>
                                                    <td className="px-4 py-2 border border-gray-400 text-center">
                                                      {ticket?.identifier}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-400 text-center">
                                                      {ticket?.quantity}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-400 text-center">
                                                      {ticket?.currency}{" "}
                                                      {ticket?.price}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-400 text-center">
                                                      {ticket?.currency}{" "}
                                                      {ticket?.process_fee ||
                                                        "0.00"}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-400 text-center">
                                                      {ticket?.currency}{" "}
                                                      {ticket?.service_fee}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-400 text-center"></td>
                                                    <td className="px-4 py-2 border border-gray-400 text-center">
                                                      {ticket?.currency}{" "}
                                                      {_getTotalPrice(
                                                        ticket?.price,
                                                        1,
                                                        ticket?.service_fee,
                                                        ticket?.quantity
                                                      )?.toFixed(2)}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-400 text-center">
                                                      <button
                                                        onClick={() =>
                                                          _handleDelete(
                                                            ticket,
                                                            performance
                                                          )
                                                        }
                                                      >
                                                        <TrashIcon className="h-5 w-5 ms-3" />
                                                      </button>
                                                    </td>
                                                  </tr>
                                                </>
                                              )
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="bg-zinc-50  rounded-2xl w-full p-5 mb-6 flex justify-center">
                                        No Tickets found on Cart for the
                                        selected event!
                                      </div>
                                    </>
                                  )}
                                </>
                              )
                            )}
                          </>
                        ) : (
                          <>
                            <div className="bg-zinc-50  rounded-2xl w-full p-5 mb-6 flex justify-center">
                              No Performance found on Cart for the selected
                              event!
                            </div>
                          </>
                        )}
                      </div>
                      {cartItems?.performances?.length > 0 ? (
                        <>
                          <div className="p-6 w-full">
                            <div className="flex h-full">
                              <div className="lg:w-1/2 w-0"></div>
                              <div className="lg:w-1/2 w-full p-4">
                                <div className="flex items-center space-x-2">
                                  <label
                                    htmlFor="promoCode"
                                    className="text-sm font-semibold text-gray-700 w-full mb-2"
                                  >
                                    Have A Promo Code?
                                  </label>
                                </div>
                                <div className="flex items-center justify-between border-b-2 border-gray-400 pb-6 mb-6">
                                  <div className="relative w-11/12">
                                    <input
                                      id="promoCode"
                                      type="text"
                                      placeholder="Promo Code"
                                      className="border border-gray-300 w-11/12 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-6000 focus:border-primary-6000"
                                    />
                                    <span className="absolute inset-y-0 right-14 flex items-center text-gray-400">
                                      %
                                    </span>
                                  </div>
                                  <button className="px-10 bg-white py-1 text-primary-6000 font-semibold border border-primary-6000 rounded-full hover:bg-primary-6000 hover:text-white transition">
                                    Apply
                                  </button>
                                </div>
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="text-sm font-semibold text-gray-700">
                                      Total Price
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      Inclusive Of Tax
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-2xl font-bold text-green-500">
                                      {
                                        cartItems?.performances?.[0]
                                          ?.tickets?.[0]?.currency
                                      }{" "}
                                      {getTotalPriceForAll()?.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="mt-5 mb-12 w-full">
                      <div className="flex">
                        <div className="lg:w-1/2 w-0"></div>
                        <div className="lg:w-1/2 w-full flex justify-between space-x-4">
                          <ButtonSecondary
                            rounded="rounded-full"
                            sizeClass="px-12 p-2 w-1/2"
                            onClick={_handleEventPage}
                            disabled={!selectedEvent}
                          >
                            Continue Shopping
                          </ButtonSecondary>

                          <ButtonSecondary
                            rounded="rounded-full"
                            sizeClass="px-12 p-2 w-1/2"
                            bgColor=" bg-primary-6000 text-white"
                            borderColor="border-primary-6000"
                            disabled={!cartItems}
                            onClick={_handleCheckout}
                          >
                            Proceed to Checkout
                          </ButtonSecondary>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-zinc-50  rounded-2xl w-full p-5 mb-6 flex justify-center">
                      No Items found on Cart for the selected event!
                    </div>
                    <div className="mt-5 mb-12 w-full">
                      <div className="flex">
                        <div className="w-full flex justify-end space-x-4">
                          <ButtonSecondary
                            rounded="rounded-full"
                            sizeClass="px-12 p-2 "
                            textColor="text-primary-6000 hover:text-white"
                            bgColor="bg-white hover:bg-primary-6000"
                            borderColor="border border-primary-6000"
                            onClick={_handleEventPage}
                            disabled={!selectedEvent}
                          >
                            Continue Shopping
                          </ButtonSecondary>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default page;
