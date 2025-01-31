import { IEventDetails } from "@/model/IEventDetail";
import React, { FC } from "react";
interface IEventThingsToKnow {
  eventDetail: IEventDetails;
}
const EventThingsToKnow: FC<IEventThingsToKnow> = ({ eventDetail }) => {
  return (
    <>
      <div className="listingSection__wrap !space-y-6">
        {eventDetail?.data?.id > 0 ? (
          <>
            <h2 className="text-2xl font-semibold">Things to know</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <div>
              <p className="block text-lg font-semibold mb-4">
                Cancellation policy
              </p>
              <span className="block font-normal text-neutral-6000 dark:text-neutral-300">
                Refund 50% of the booking value when customers cancel the room
                within 48 hours after successful booking and 14 days before the
                check-in time.
              </span>
              <span className="block font-normal text-neutral-6000 dark:text-neutral-300">
                Then, cancel the room 14 days before the check-in time, get a
                50% refund of the total amount paid (minus the service fee).
              </span>
            </div>
            <div>
              <p className="block text-lg font-semibold mb-5">Check-in time</p>
              <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4 lg:w-6/12 xl:w-8/12 w-full">
                <div className="p-4 odd:bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
                  <span>Check-in</span>
                  <span>08:00 am - 12:00 pm</span>
                </div>
                <div className="mt-4 p-4 odd:bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
                  <span>Check-out</span>
                  <span>02:00 pm - 04:00 pm</span>
                </div>
              </div>
            </div>
            <div className="lg:w-10/12 w-full">
              <p className="block text-lg font-semibold mb-4 mt-3">
                Special Note
              </p>
              <ul className="list-disc ps-5 ms-1 marker:text-gray-300 text-neutral-6000 dark:text-neutral-300">
                <li>
                  Ban and I will work together to keep the landscape and
                  environment green and clean by not littering, not using
                  stimulants and respecting people around.
                </li>
                <li className="mt-2">Do not sing karaoke past 11:30</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="h-3 w-2/12 rounded-md bg-gray-300 animate-pulse"></div>
            <div className="h-5 w-2/3 rounded-md bg-gray-300 animate-pulse"></div>
            <div className="h-96 w-full rounded-md bg-gray-300 animate-pulse"></div>
          </>
        )}
      </div>
    </>
  );
};

export default EventThingsToKnow;
