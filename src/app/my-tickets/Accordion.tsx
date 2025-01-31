import {
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AccordionWithOrderDetails = ({ data }: { data: any }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {data?.map((ticket, ticketIndex) => (
        <div
          key={ticket.id}
          className="w-full mx-auto mt-10 border border-gray-300 rounded-lg overflow-hidden shadow-sm"
        >
          <div className="w-full overflow-x-auto scrollbar-hidden">
            <div className="overflow-x-auto lg:scrollbar-hidden">
              <table className="min-w-full border-collapse shadow-sm">
                {/* Table Header */}
                <thead>
                  <tr className="bg-gray-200 text-gray-800 font-semibold grid grid-cols-10 min-w-max">
                    <th className="border lg:px-2 px-1 lg:py-4 md:py-3 py-2 text-left col-span-1">
                      S. No
                    </th>
                    <th className="border lg:px-2 px-1 lg:py-4 md:py-3 py-2 text-left col-span-2">
                      Order Number
                    </th>
                    <th className="border lg:px-2 px-1 lg:py-4 md:py-3 py-2 text-left col-span-2">
                      Event Identifier
                    </th>
                    <th className="border lg:px-2 px-1 lg:py-4 md:py-3 py-2 text-left col-span-2">
                      Purchase Date
                    </th>
                    <th className="border lg:px-2 px-1 lg:py-4 md:py-3 py-2 text-left col-span-1">
                      Quantity
                    </th>
                    <th className="border lg:px-2 px-1 lg:py-4 md:py-3 py-2 text-left col-span-1">
                      Amount
                    </th>
                    <th className="border lg:px-2 px-1 lg:py-4 md:py-3 py-2 text-center col-span-1">
                      View
                    </th>
                    {/* <th className="border lg:px-2 px-1 lg:py-4 md:py-3 py-2 text-center col-span-1">
                      PDF
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr className="dark:bg-gray-100 text-gray-700 font-medium grid grid-cols-10 min-w-max">
                    <td className="lg:px-2 px-1 lg:py-4 md:py-3 py-2 col-span-1">
                      {ticketIndex + 1}
                    </td>
                    <td className="lg:px-2 px-1 lg:py-4 md:py-3 py-2 col-span-2">
                      {ticket?.number}
                    </td>
                    <td className="lg:px-2 px-1 lg:py-4 md:py-3 py-2 col-span-2">
                      {ticket?.event.identifier}
                    </td>
                    <td className="lg:px-2 px-1 lg:py-4 md:py-3 py-2 col-span-2">
                      {ticket?.purchase_date
                        ? moment(ticket?.purchase_date).format(
                            "DD MMM YYYY HH:mm"
                          )
                        : ""}
                    </td>
                    <td className="lg:px-2 px-1 lg:py-4 md:py-3 py-2 col-span-1">
                      {ticket?.orderdetails.length}
                    </td>
                    <td className="lg:px-2 px-1 lg:py-4 md:py-3 py-2 col-span-1">
                      {ticket?.orderdetails?.[0]?.ticket?.currency}{" "}
                      {ticket?.total_price}
                    </td>
                    <td className="lg:px-2 px-1 lg:py-4 md:py-3 py-2 text-center col-span-1">
                      <button
                        onClick={() => toggleAccordion(ticketIndex)}
                        className="focus:outline-none"
                      >
                        {openIndex === ticketIndex ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </td>
                    {/* <td className="lg:px-2 px-1 lg:py-4 md:py-3 py-2 text-center col-span-1">
                      <button
                        onClick={() => toggleAccordion(ticketIndex)}
                        className="focus:outline-none"
                      >
                        {openIndex === ticketIndex ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <AnimatePresence>
            {openIndex === ticketIndex && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="px-6 bg-white border-t border-gray-200"
              >
                <h2 className="text-lg font-semibold mb-4 mt-4">
                  Order Details
                </h2>
                <div className="overflow-x-auto max-h-96 mb-4">
                  <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700">
                        <th className="border px-4 py-2 text-left">S. No</th>
                        <th className="border px-4 py-2 text-left">
                          Ticket Type
                        </th>
                        <th className="border px-4 py-2 text-left">Date</th>
                        <th className="border px-4 py-2 text-left">Timing</th>
                        <th className="border px-4 py-2 text-left">
                          Unit Price
                        </th>
                        <th className="border px-4 py-2 text-left">
                          Service Fee
                        </th>
                        <th className="border px-4 py-2 text-left">
                          Paid Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {console.log(ticket, "ticket")}
                      {ticket.orderdetails.map((detail: any, index: number) => (
                        <tr key={detail.id} className="hover:bg-gray-50">
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">
                            {detail?.ticket?.identifier}
                          </td>
                          <td className="border px-4 py-2 text-left">
                            {detail?.performance?.start_date
                              ? moment(detail?.performance?.start_date)?.format(
                                  "DD MMM YYYY"
                                )
                              : ""}
                          </td>
                          <td className="border px-4 py-2 text-left">
                            {detail?.performance?.start_date
                              ? moment(detail?.performance?.start_date)?.format(
                                  "HH:mm"
                                )
                              : ""}{" "}
                            to{" "}
                            {detail?.performance?.start_date
                              ? moment(detail?.performance?.end_date)?.format(
                                  "HH:mm"
                                )
                              : ""}
                          </td>

                          <td className="border px-4 py-2">
                            {detail?.ticket?.currency} {detail.unit_price}
                          </td>
                          <td className="border px-4 py-2">
                            {detail?.ticket?.currency}{" "}
                            {detail.service_fee || "0.00"}
                          </td>
                          <td className="border px-4 py-2">
                            {detail?.ticket?.currency} {detail.paid_price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
};

export default AccordionWithOrderDetails;
