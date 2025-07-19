"use client";
import { Dialog } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import React, { Fragment, FC } from "react";
import "react-international-phone/style.css";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";

interface IProps {
    handleClose: () => void;
    show: boolean;
}

const RequestRefundModal: FC<IProps> = ({ handleClose, show }) => {

  function closeModal() {
    handleClose
  }

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all flex items-center flex-col">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold"
                  >Are you sure to request a refund?</Dialog.Title>
                    <div className="relative flex flex-col justify-center">
                        <div className="relative pt-10 pb-5 mx-auto w-full max-w-lg">
                            <div className="mx-auto flex w-full max-w-md flex-row space-x-4">
                                <ButtonSecondary
                                    className="flex-1"
                                    rounded="rounded-full"
                                    sizeClass="py-3 sm:px-4"
                                    borderColor="border-0"
                                    bgColor="bg-neutral-100 dark:bg-neutral-600 dark:bg-opacity-20"
                                    fontWeight="font-semibold"
                                    fontSize="text-sm"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </ButtonSecondary>

                                <ButtonPrimary
                                    className="flex-1"
                                    sizeClass="py-3 sm:px-4 rounded-full"
                                    onClick={handleClose}
                                >
                                    Request
                                </ButtonPrimary>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default RequestRefundModal;
