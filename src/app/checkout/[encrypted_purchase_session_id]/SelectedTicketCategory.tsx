import ModalSelectGuests from "@/components/ModalSelectGuests";
import NcInputNumber2 from "@/components/NcInputNumber2";
import { IPerformance } from "@/model/IEventDetail";
import { Popover, Transition } from "@headlessui/react";
import { PencilSquareIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
interface ISelectedTicketCategoryProps {
  selectedPerformances: IPerformance;
  padding?: string;
  hideEdit?: boolean;
  handleCountOnchange?: (value: number, ticketId: number) => void;
}
const SelectedTicketCategory: FC<ISelectedTicketCategoryProps> = ({
  selectedPerformances,
  padding = "p-3",
  hideEdit,
  handleCountOnchange,
}) => {
  const getTicketCategory = (performance: IPerformance) => {
    const ticketsCount = performance?.tickets
      ?.map((x) => {
        return `${x.ticket.identifier} x ${x.ticket.quantity || 0}`;
      })
      ?.filter((l) => l !== null)
      ?.filter((l) => l !== undefined);

    return (
      <span className="text-md font-semibold">{ticketsCount?.join(", ")}</span>
    );
  };
  const { t } = useTranslation();
  return (
    <>
      <Popover className="z-10 relative flex-1 flex space-x-4 p-0.5">
        {({ open, close }) => (
          <>
            <Popover.Button
              type="button"
              className={`text-left flex-1 ${
                hideEdit ? "cursor-default" : ""
              } ${padding} px-5 flex justify-between space-x-5 focus:outline-none`}
            >
              <div className="flex space-x-4">
                <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                <span className="text-md mt-1 font-semibold">
                  <span className="line-clamp-1">
                    {getTicketCategory(selectedPerformances)}
                  </span>
                </span>
              </div>
              {!hideEdit && (
                <>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </>
              )}
            </Popover.Button>
            {!hideEdit && selectedPerformances && (
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
                  <Popover.Panel className="absolute right-0 z-20 w-full sm:min-w-[340px] bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black ring-opacity-5 ">
                    <div className="flex flex-col gap-2">
                      {selectedPerformances?.tickets?.map((ticket) => (
                        <>
                          <div
                            className={`nc-NcInputNumber flex items-center justify-between space-x-5`}
                            data-nc-id="NcInputNumber"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                                {ticket?.ticket?.identifier}
                              </span>
                              <span className="font-small font-light text-neutral-800 dark:text-neutral-200">
                                {ticket?.ticket?.price
                                  ? `AED ${ticket?.ticket?.price}`
                                  : ""}
                              </span>
                            </div>
                            <NcInputNumber2
                              onChange={(value) => {
                                handleCountOnchange(value, ticket?.ticket_id);
                              }}
                              initialValue={ticket?.ticket?.quantity}
                              max={ticket?.ticket?.maximum_salable_quantity}
                              minSalable={
                                ticket?.ticket
                                  ?.minimum_salable_quantity_per_user
                              }
                            />
                          </div>
                        </>
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </>
        )}
      </Popover>
    </>
  );
};

export default SelectedTicketCategory;
