import { IPerformance } from "@/model/IEventDetail";
import { ShieldCheckIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import React, { FC } from "react";
interface IProps {
  selectedPerformances: IPerformance;
  padding?: string;
  selectedSeats?: string[];
}

const SelectedTickets: FC<IProps> = ({
  selectedPerformances,
  padding,
  selectedSeats,
}) => {
  const getTicketCategory = (performance: IPerformance) => {
    const ticketsCount = performance?.tickets
      ?.map((x) => {
        return `${x.ticket.identifier} x ${x.ticket.quantity || 0}`;
      })
      ?.filter((l) => l !== null)
      ?.filter((l) => l !== undefined);

    return (
      <span className="mt-1.5 text-md font-semibold">
        {ticketsCount?.join(", ")}
      </span>
    );
  };
  return (
    <>
      <div className="flex-1 flex space-x-4 p-0.5">
        <button
          type="button"
          className={`text-left flex-1 cursor-default px-5 flex flex-col justify-between space-x-5 ${padding}`}
        >
          <div
            className={`flex space-x-4 ${
              selectedSeats?.length > 0 ? "mb-3" : ""
            }`}
          >
            <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
            <span className="text-md mt-1 font-semibold">
              <span className="line-clamp-1">
                {getTicketCategory(selectedPerformances)}
              </span>
            </span>
          </div>
          {selectedSeats && selectedSeats?.length > 0 ? (
            <>
              <div className="flex flex-col mb-4">
                <div className="p-3">
                  <div className="flex flex-col">
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-x-20 gap-y-6 mt-1.5">
                      {selectedSeats?.map((seat, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-md font-semibold"
                        >
                          <ShieldCheckIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                          <span>{seat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </button>
      </div>
    </>
  );
};

export default SelectedTickets;
