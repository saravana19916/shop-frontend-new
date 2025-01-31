import { PencilSquareIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
interface IProps {
  currentImage: any;
  quantity: number;
  ticketType: string;
  eventName: string;
  date: string | Date;
  infoMessage?: string;
  handleEditRedirect?: () => void;
}
const CardForSelectedTicket: FC<IProps> = ({
  currentImage,
  quantity,
  ticketType,
  eventName,
  date,
  infoMessage,
  handleEditRedirect,
}) => {
  const [generatedSeats, setGeneratedSeats] = useState([]);

  useEffect(() => {
    if (Number(quantity) > 0) {
      const prefix = ticketType === "VIP" ? "V" : "G";
      const seats = Array.from(
        { length: quantity },
        (_, i) => `${prefix}-${i + 1}`
      );
      setGeneratedSeats(seats);
    } else {
      setGeneratedSeats([]);
    }
  }, [ticketType, quantity]);
  return (
    <>
      <div className="flex flex-col bg-white dark:bg-neutral-800 border-2 dark:border border-gray-550 rounded-3xl p-0 overflow-hidden my-4">
        <div className="flex items-center gap-4 px-6 py-4">
          <img
            src={currentImage}
            alt="Event Thumbnail"
            className="w-12 h-12 object-cover rounded-xl aspect-square"
          />{" "}
          <div>
            <span className="text-sm font-medium">
              <span className="font-semibold">
                {quantity || 0} &nbsp;x&nbsp; {ticketType || ""} Ticket&nbsp;
              </span>
              ,&nbsp; {eventName}&nbsp; , &nbsp;{" "}
              <span>{moment(date)?.format("DD MMM YY , HH:mm")}</span>
            </span>
          </div>
          {handleEditRedirect ? (
            <>
              <div className="ms-auto">
                <PencilSquareIcon
                  className="w-6 h-6 cursor-pointer text-gray-500"
                  onClick={handleEditRedirect}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="border-t-2 dark:border-t border-gray-550"></div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 bg-lightGrey-100 dark:bg-neutral-800 px-6 py-3">
          {generatedSeats?.length ? (
            <>
              {generatedSeats.map((seat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-1 text-xs font-medium"
                >
                  <ShieldCheckIcon className="w-4 h-4" /> {seat}
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default CardForSelectedTicket;
