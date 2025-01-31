"use client";
import Input from "@/shared/Input";
import { Dialog } from "@headlessui/react";
import { Tab, Transition } from "@headlessui/react";
import React, { Fragment, FC, useState, useEffect } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export interface OTPValidationProps {
  openOTP?: boolean;
  onChangeStatus?: any;
}

const OTPValidation: FC<OTPValidationProps> = ({ openOTP, onChangeStatus }) => {
  let [isOpen, setIsOpen] = useState(openOTP);
  const [phone, setPhone] = useState("");
  const [modelHeading, setModelHeading] = useState("Enter your phone number");
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

  const sendCode = () => {
    setModelHeading("Please Enter the OTP");
    setChangeSection(true);
  };

  const editPhoneNumber = () => {
    setModelHeading("Enter your phone number");
    setChangeSection(false);
  };
  const phoneNumberSection = () => {
    return (
      <>
        <div className="mt-6">
          <PhoneInput
            className=""
            defaultCountry="ua"
            value={phone}
            onChange={(phone) => setPhone(phone)}
          />
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={sendCode}
          >
            Send Verfication code
          </button>
        </div>
      </>
    );
  };

  const otpSection = () => {
    return (
      <>
        <div className="mt-6">
          <p className="text-neutral-6000 dark:text-neutral-300 text-xs">
            A OTP (one time password) has been send to 9876543210{" "}
            <span
              className="text-blue-900 cursor-pointer"
              onClick={editPhoneNumber}
            >
              Edit
            </span>
          </p>
          <Input type="number" name="profile[phone_number]" className="mt-4" />
          <div className="mt-4 flex gap-4 flex-col">
            <button type="button" className="font-medium text-blue-900 text-sm">
              Resend OTP
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Send Verfication code
            </button>
          </div>
        </div>
      </>
    );
  };
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
                <Dialog.Panel className="w-full h-[45vh] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex items-center flex-col">
                  <Dialog.Title as="h3" className="text-2xl font-semibold">
                    {modelHeading}
                  </Dialog.Title>
                  {changeSection ? otpSection() : phoneNumberSection()}
                  {/* {phoneNumberSection()} */}
                  {/* {otpSection()} */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default OTPValidation;
