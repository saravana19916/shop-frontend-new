"use client";

// import { FC, Fragment, useState } from "react";
// import { Popover, Transition } from "@headlessui/react";
// import NcInputNumber from "@/components/NcInputNumber";
// import { TicketIcon } from "@heroicons/react/24/outline";
// import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";
// import { GuestsObject } from "@/app/(client-components)/type";
// import { IPerformance } from "@/model/IEventDetail";

// export interface TicketCategoryProps {
//   className?: string;
//   title?: string;
//   subTitle?: string;
//   performances?: IPerformance;
//   onSelectIdentifierCount?: any;
// }

// const TicketCategory: FC<TicketCategoryProps> = ({
//   className = "flex-1",
//   title,
//   subTitle,
//   performances,
//   onSelectIdentifierCount,
// }) => {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [ticketIdentifierCount, setTicketIdentifierCount] =
//     useState<IPerformance>(performances);
//   const handleCategory = (value) => {
//     setSelectedCategory(value);
//   };
//   const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(2);

//   const handleChangeData = (value: number, type: any, ticket_id: number) => {
//     performances.tickets.filter((x) => {
//       if (x.ticket_id == ticket_id) {
//         x.ticket.on_hold = value;
//       }
//     });
//     setTicketIdentifierCount(performances);
//     onSelectIdentifierCount(performances);
//   };
//   return (
//     <Popover className={`flex relative ${className}`}>
//       {({ open, close }) => (
//         <>
//           <div
//             className={`flex-1 flex items-center focus:outline-none rounded-b-3xl ${
//               open ? "shadow-lg" : ""
//             }`}
//           >
//             <Popover.Button
//               className={`relative z-10 flex-1 flex text-left items-center p-3 space-x-3 focus:outline-none`}
//             >
//               <div className="text-neutral-700 dark:text-neutral-400">
//                 <TicketIcon className="w-5 h-5 lg:w-7 lg:h-7" />
//               </div>
//               <div className="flex-grow">
//                 <span className="block xl:text-lg font-semibold">
//                   {/* {totalGuests ? "Guests" : "Add guests"} */}
//                   {title}
//                 </span>
//                 <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
//                   {/* {totalGuests ? "Guests" : "Add guests"} */}
//                   {selectedCategory ? selectedCategory : subTitle}
//                 </span>
//               </div>
//             </Popover.Button>
//           </div>
//           <Transition
//             as={Fragment}
//             enter="transition ease-out duration-200"
//             enterFrom="opacity-0 translate-y-1"
//             enterTo="opacity-100 translate-y-0"
//             leave="transition ease-in duration-150"
//             leaveFrom="opacity-100 translate-y-0"
//             leaveTo="opacity-0 translate-y-1"
//           >
//             <Popover.Panel className="absolute right-0 z-20 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black ring-opacity-5 ">
//               <div className="flex flex-col gap-2">
//                 {performances?.tickets.map((res, index) => {
//                   return (
//                     <>
//                       <NcInputNumber
//                         key={res.id}
//                         className="w-full"
//                         defaultValue={res.ticket.on_hold}
//                         onChange={(value) =>
//                           handleChangeData(value, res, res.ticket_id)
//                         }
//                         min={0}
//                         label={`${res.ticket.identifier} - ${res.ticket.price} ${res.ticket.payment_currency}`}
//                       />
//                     </>
//                   );
//                 })}
//               </div>
//             </Popover.Panel>
//           </Transition>
//         </>
//       )}
//     </Popover>
//   );
// };
// export default TicketCategory;
import {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Popover, Transition } from "@headlessui/react";
import NcInputNumber from "@/components/NcInputNumber";
import { TicketIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { IPerformance, ITicketTicket } from "@/model/IEventDetail";
import { ITicketRate } from "./[id]/page";
import { useTranslation } from "react-i18next";
import { getCurrencyConversionRates } from "@/utils/currencyConvertor";
import CartAPI, { IPostCartPayload } from "@/services/cart.services";

export interface TicketCategoryProps {
  className?: string;
  title?: string;
  subTitle?: string;
  performances?: IPerformance;
  onSelectIdentifierCount?: any;
  payment_currency?: string;
  handleTicketQuantityChange?: (index: number, newValue: number) => void;
  isDisabled?: boolean;
  userCount?: any;
  setUserCount?: Dispatch<SetStateAction<any>>;
}
const userOptions = [
  {
    label: "Child",
    value: "child",
  },
  {
    label: "Adult",
    value: "adult",
  },
  {
    label: "Infant",
    value: "infant",
  },
];
const TicketCategory: FC<TicketCategoryProps> = ({
  className = "flex-1",
  title,
  subTitle,
  performances,
  onSelectIdentifierCount,
  payment_currency,
  handleTicketQuantityChange,
  isDisabled,
  userCount,
  setUserCount,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ticketIdentifierCount, setTicketIdentifierCount] =
    useState<IPerformance>(performances);
  const handleCategory = (value) => {
    setSelectedCategory(value);
  };
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(2);

  const handlePerformancesChange = (performances) => {
    const adult = performances?.tickets[0]?.ticket.on_hold || 0;
    const child = performances?.tickets[1]?.ticket.on_hold || 0;
    const infant = performances?.tickets[2]?.ticket.on_hold || 0;

    const data = {
      adult,
      child,
      infant,
    };
    setTicketsOnHold(data);
  };

  const handleChangeData = (value: number, type: any, ticket_id: number) => {
    performances.tickets.forEach((x) => {
      if (x.ticket_id === ticket_id) {
        x.ticket.on_hold = value;
      }
    });
    onSelectIdentifierCount({ ...performances });
    handlePerformancesChange(performances);
  };
  useEffect(() => handlePerformancesChange(performances), [performances]);
  const { t } = useTranslation();
  const ticketIdentifierCat = (ticket: ITicketTicket) => {
    return (
      <>
        <div>
          <span>
            {ticket.identifier} - {ticket.price} {ticket.payment_currency}
          </span>
        </div>
      </>
    );
  };
  const [currencyRates, setCurrencyRates] = useState(undefined);
  const getCurrencyRates = async () => {
    const currencyRates = await getCurrencyConversionRates("AED");
    setCurrencyRates(currencyRates?.data?.conversion_rates);
    sessionStorage.setItem(
      "currencyRates",
      JSON.stringify(currencyRates?.data?.conversion_rates)
    );
  };
  useEffect(() => {
    const storedRates = sessionStorage.getItem("currencyRates");
    if (storedRates) {
      const currencyRates = JSON.parse(storedRates);
      setCurrencyRates(currencyRates);
    } else {
      getCurrencyRates();
    }
  }, []);
  useEffect(() => {
    console.log(currencyRates);
  }, [currencyRates]);
  const [ticketsOnHold, setTicketsOnHold] = useState({
    adult: 0,
    child: 0,
    infant: 0,
  });

  const formatGuestDisplay = () => {
    const { adult, child, infant } = userCount;

    const guestList = [];
    if (adult > 0) guestList.push(`${adult} adult`);
    if (child > 0) guestList.push(`${child} child`);
    if (infant > 0) guestList.push(`${infant} infant`);

    return guestList.length > 0 ? guestList.join(", ") : "Add Guests";
  };
  const handleAddToCart = (
    eventData,
    previousCount: number,
    currentCount: number
  ) => {
    const quantity = currentCount - previousCount;
    const payload: IPostCartPayload = {
      event_id: eventData?.ticket?.event_id,
      performance_id: eventData?.performance_id,
      ticket_id: eventData?.ticket_id,
      quantity,
    };
    // const response = CartAPI.addToCart(payload);
    // console.log(response, "response");
  };
  const handleUser = (value, field) => {
    setUserCount((prev) => {
      return { ...prev, [field]: value };
    });
  };
  return (
    <Popover className={`flex relative ${className}`}>
      {({ open, close }) => (
        <>
          <div
            className={`flex-1 flex items-center focus:outline-none rounded-b-3xl ${
              open && !isDisabled ? "shadow-lg" : ""
            }`}
          >
            <Popover.Button
              disabled={isDisabled}
              className={`relative z-10 flex-1 flex text-left items-center p-3 space-x-3 focus:outline-none`}
            >
              <div
                className={`text-neutral-700 dark:text-neutral-400 ${
                  isDisabled ? "opacity-50" : ""
                }`}
              >
                {/* <TicketIcon className="w-5 h-5 lg:w-7 lg:h-7" /> */}
                <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className={`flex-grow ${isDisabled ? "opacity-50" : ""}`}>
                <span className="block xl:text-lg font-semibold">{t(title)}</span>
                <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                  {/* {selectedCategory ? selectedCategory : t(subTitle)} */}
                  {formatGuestDisplay()}
                </span>
              </div>
            </Popover.Button>
          </div>
          <>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-20 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black ring-opacity-5 ">
                <div className="flex flex-col gap-2">
                  {userOptions?.map((user) => (
                    <>
                      <NcInputNumber
                        key={user.value}
                        className="w-full"
                        initialValue={userCount[user?.value]}
                        onChange={(value) => handleUser(value, user.value)}
                        min={0}
                        label={user?.label}
                      />
                    </>
                  ))}

                  {/* {performances?.tickets.map((res, index) => (
                    <>
                      <NcInputNumber
                        key={index}
                        className="w-full"
                        initialValue={res.ticket.on_hold}
                        onChange={(value) => {
                          handleAddToCart(res, res.ticket.on_hold, value);
                          handleChangeData(value, res, res.ticket_id);
                        }}
                        min={0}
                        label={`${
                          res.ticket.identifier
                        } `}
                        label={`${res.ticket.identifier} - ${res.ticket.price} ${res.ticket.payment_currency}`}
                        floorplan={performances?.floorplan?.static_image}
                      />
                    </>
                  ))}
                  {performances && (
                    <NcInputNumber
                      key={3}
                      className="w-full"
                      initialValue={ticketsOnHold?.infant}
                      onChange={(value) => {
                        setTicketsOnHold((prev) => {
                          return {
                            ...prev,
                            infant: value,
                          };
                        });
                      }}
                      min={0}
                      label="Infant"
                      label={`${res.ticket.identifier} - ${res.ticket.price} ${res.ticket.payment_currency}`}
                      floorplan={performances?.floorplan?.static_image}
                    />
                  )} */}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        </>
      )}
    </Popover>
  );
};
export default TicketCategory;
