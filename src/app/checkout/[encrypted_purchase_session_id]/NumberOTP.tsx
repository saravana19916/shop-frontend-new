"use client";
import Input from "@/shared/Input";
import SingleDigitInput from "@/shared/SingleDigitInput";
import { Dialog } from "@headlessui/react";
import { Tab, Transition } from "@headlessui/react";
import React, { Fragment, FC, useState, useEffect } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export interface NumberOTPProps {
  openOTP?: boolean;
  onChangeStatus?: any;
  userPhone: string;
}

const NumberOTP: FC<NumberOTPProps> = ({
  openOTP,
  onChangeStatus,
  userPhone,
}) => {
  let [isOpen, setIsOpen] = useState(openOTP);
  const [phone, setPhone] = useState("");
  const [changeSection, setChangeSection] = useState(false);
  function closeModal() {
    setIsOpen(false);
    onChangeStatus(false);
    console.log(openOTP);
  }

  function openModal() {
    setIsOpen(true);
    onChangeStatus(true);
  }

  useEffect(() => {
    console.log(openOTP);
    setIsOpen(openOTP);
  }, [openOTP]);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
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
            <div className="fixed inset-0 bg-black/25 dark:bg-black/50" />
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
                    className="text-2xl font-semibold"
                  ></Dialog.Title>
                  <div className="relative flex flex-col justify-center">
                    <div className="relative  pt-10 pb-9 mx-auto w-full max-w-lg">
                      <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                          <div className="font-semibold text-3xl">
                            <p>Verify your number</p>
                          </div>
                          <div className="flex flex-col text-sm font-medium text-gray-400">
                            <p>please enter the 4 digit code send to </p>
                            <p className="text-primary-6000">
                              {userPhone ? `${userPhone}` : ""}
                            </p>
                          </div>
                        </div>

                        <div>
                          <form action="" method="post">
                            <div className="flex flex-col space-y-16">
                              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs gap-4">
                                <div className="w-16 h-16 ">
                                  <SingleDigitInput />
                                </div>
                                <div className="w-16 h-16 ">
                                  <SingleDigitInput />
                                </div>
                                <div className="w-16 h-16 ">
                                  <SingleDigitInput />
                                </div>
                                <div className="w-16 h-16 ">
                                  <SingleDigitInput />
                                </div>
                              </div>

                              <div className="flex flex-col space-y-5">
                                <div>
                                  <button
                                    className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-primary-6000 border-none text-white text-sm shadow-sm"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      closeModal();
                                    }}
                                  >
                                    Confirm
                                  </button>
                                </div>

                                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                  <p>Didn't receive code?</p>{" "}
                                  <a
                                    className="flex flex-row items-center text-primary-6000"
                                    href="#"
                                    rel="noopener noreferrer"
                                  >
                                    Resend Code
                                  </a>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
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
export default NumberOTP;
