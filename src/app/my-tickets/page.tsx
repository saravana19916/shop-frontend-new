"use client";
import MyTicketsAPI from "@/services/my-tickets.services";
import React, { FC, useEffect, useState } from "react";
import Accordion from "./Accordion";
import MyOrdersCard from "@/components/MyOrdersCard";
interface IProps {}
const page: FC<IProps> = ({}) => {
  const [tickets, setTickets] = useState<any>([]);
  const [isFetchingTickets, setIsFetchingTickets] = useState<boolean>(false);
  const _getMyTickets = async () => {
    setIsFetchingTickets(true);
    const response = await MyTicketsAPI?.getMyTickets();
    setIsFetchingTickets(false);
    if (response.status === 200 || response.status === 201) {
      setTickets(response.data?.data || []);
    } else {
      setTickets([]);
    }
  };
  useEffect(() => {
    _getMyTickets();
  }, []);
  const SkeletonVerticalCard4 = () => {
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full animate-pulse flex-row items-center justify-center space-x-1 rounded-xl p-6">
            <div className="flex flex-col space-y-2">
              <div className="w-full rounded-md bg-gray-300 h-80"></div>
              <div className="h-3 w-2/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-7/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-4/12 rounded-md bg-gray-300"></div>
            </div>
          </div>
          <div className="hidden md:block w-full animate-pulse flex-row items-center justify-center space-x-1 rounded-xl p-6">
            <div className="flex flex-col space-y-2">
              <div className="w-full rounded-md bg-gray-300 h-80"></div>
              <div className="h-3 w-2/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-7/12 rounded-md bg-gray-300"></div>
              <div className="h-3 w-4/12 rounded-md bg-gray-300"></div>
            </div>
          </div>
          <div className="hidden md:block w-full animate-pulse flex-row items-center justify-center space-x-1 rounded-xl p-6">
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

  return (
    <>
      <main className="mx-2 my-2 lg:mx-8 lg:my-12">
        <div className="container">
          <div>
            <h2 className="text-3xl font-bold">My Tickets</h2>
          </div>
          {/* <div className="mt-6 lg:p-10 grid grid-cols-1 gap-6 rounded-3xl">
            {tickets.map((ticket, index) => (
              <MyOrdersCard key={index} ticket={ticket} />
            ))}
          </div> */}
          {isFetchingTickets ? (
            <>{SkeletonVerticalCard4()}</>
          ) : (
            <>
              {tickets?.length > 0 ? (
                <>
                  <div className="mt-6 lg:p-12 grid grid-cols-1 gap-6 rounded-3xl">
                    {tickets.map((ticket, index) => (
                      <MyOrdersCard key={index} ticket={ticket} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-zinc-50  rounded-2xl w-full p-5 mb-6 flex justify-center">
                    No Tickets booked so far!
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default page;
