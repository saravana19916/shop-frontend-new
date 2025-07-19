import React, { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BellIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

export interface NotificationDetails {
  title: string;
  time: string;
  type: string;
  status: string;
  receivedAt: string;
  message: string;
}

interface NotificationDetailsModalProps {
  show: boolean;
  handleClose: () => void;
  data: NotificationDetails;
}

const NotificationDetailsModal: FC<NotificationDetailsModalProps> = ({
  show,
  handleClose,
  data,
}) => {
  const { title, time, type, status, receivedAt, message } = data;

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 py-6 text-left align-middle shadow-xl transition-all">

                <div className="flex items-start justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="flex gap-3 items-center px-6">
                    <div className="flex items-center justify-center bg-[#6e6e6e] rounded-full p-1.5">
                      <BellIcon className="h-6 w-6 text-white dark:text-gray-300" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <Dialog.Title
                        as="h3"
                        className="text-md font-semibold text-gray-800 dark:text-gray-100"
                      >
                        {title}
                      </Dialog.Title>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 px-6"
                    onClick={handleClose}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mt-10 space-y-6 px-6 mb-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm font-medium">Type</p>
                      <p className="text-gray-800 dark:text-gray-300 text-sm">{type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <p className="text-gray-800 dark:text-gray-300 text-sm">{status}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Received</p>
                      <p className="text-gray-800 dark:text-gray-300 text-sm">{receivedAt}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2 mt-10">
                      <strong className="text-gray-800 dark:text-gray-100 font-medium text-sm">Message</strong>
                      <InformationCircleIcon className="text-gray-400 h-5 w-5" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{message}</p>
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NotificationDetailsModal;
