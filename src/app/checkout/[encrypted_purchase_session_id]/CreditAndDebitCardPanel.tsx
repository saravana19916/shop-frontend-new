import React, { Dispatch, FC, SetStateAction, useState } from "react";
import Input from "@/shared/Input";
import Label from "@/components/Label";
import { Tab } from "@headlessui/react";
import moment from "moment";
import "react-phone-input-2/lib/style.css";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "@/services/auth.service";
import ButtonSecondary from "@/shared/ButtonSecondary";
import ReceiveFutureUpdates from "./ReceiveFutureUpdates";
import AcceptRulesAndRegulations from "./AcceptRulesAndRegulations";

interface ICreditAndDebitCardPanel {
  handelConfirmPay: () => void;
  userEmail: string | undefined | null;
  setEmailOPTModelStatus: (status: boolean) => void;
  setNumberOPTModelStatus: (status: boolean) => void;
  userPhone: any;
  setPhone: (phone: any) => void;
  setUserEmail: (e: string | null) => void;
  receiveFutureUpdated: boolean;
  acceptRulesAndRegulations: boolean;
  setReceiveFutureUpdates: Dispatch<SetStateAction<boolean>>;
  setAcceptRulesAndRegulations: Dispatch<SetStateAction<boolean>>;
  disablePay: boolean;
  values;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  touched: any;
  errors: any;
}
const CreditAndDebitCardPanel: FC<ICreditAndDebitCardPanel> = ({
  handelConfirmPay,
  receiveFutureUpdated,
  acceptRulesAndRegulations,
  setReceiveFutureUpdates,
  setAcceptRulesAndRegulations,
  disablePay,
  values,
  setFieldValue,
  touched,
  errors,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };

  const { t } = useTranslation();

  return (
    <>
      <ToastContainer />
      <Tab.Panel className="mt-8 lg:w-11/12 w-full">
        <div className="space-y-1 mb-8">
          <Label className="ms-4 block text-gray-450 mb-2">
            {t("cardNumber")}
          </Label>
          <IMaskInput
            mask="0000 0000 0000 0000"
            value={values.paymentDetails.cardNumber}
            onAccept={(value, mask) =>
              setFieldValue("paymentDetails.cardNumber", value)
            }
            name="cardNumber"
            className="block py-6 px-6 w-full border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-full text-sm font-normal h-11"
          />
          {touched &&
            touched.paymentDetails?.cardNumber &&
            errors &&
            errors.paymentDetails?.cardNumber && (
              <span className="text-xs font-normal ms-3 block text-red-500 mt-2">
                {errors.paymentDetails?.cardNumber}
              </span>
            )}
        </div>
        <div className="space-y-1 mb-8">
          <Label className="ms-4 block text-gray-450 mb-2">
            {" "}
            {t("cardHolder")}
          </Label>
          <Input
            type="text"
            name="paymentDetails.cardHolder"
            value={values.paymentDetails.cardHolder}
            onChange={handleChange}
            rounded="rounded-full py-6 px-6 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-50 placeholder:text-gray-450 placeholder:opacity-80"
          />
          {touched &&
            touched.paymentDetails?.cardHolder &&
            errors &&
            errors.paymentDetails?.cardHolder && (
              <span className="text-xs font-normal ms-3 block text-red-500 mt-2">
                {errors.paymentDetails?.cardHolder}
              </span>
            )}
        </div>
        <div className="space-y-1 mb-8 flex space-x-5  ">
          <div className="space-y-1 md:w-1/2 w-full">
            <Label className="ms-4 block text-gray-450 mb-2">
              {t("expirationDate")}{" "}
            </Label>
            <div>
              <IMaskInput
                mask="00 / 00"
                value={values.paymentDetails.expirationDate}
                onAccept={(value) =>
                  setFieldValue("paymentDetails.expirationDate", value)
                }
                placeholder="MM / YY"
                name="paymentDetails.expirationDate"
                className="block w-full border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-full text-sm font-normal h-11 px-6 py-6"
              />
            </div>
            {touched &&
              touched.paymentDetails?.expirationDate &&
              errors &&
              errors.paymentDetails?.expirationDate && (
                <span className="text-xs font-normal ms-3 block text-red-500 mt-2">
                  {errors.paymentDetails?.expirationDate}
                </span>
              )}
          </div>
          <div className="space-y-1  md:w-1/2 w-full">
            <Label className="ms-4 block text-gray-450 mb-2">{t("cvv")} </Label>
            <IMaskInput
              mask="000"
              value={values.paymentDetails.cvv}
              onAccept={(value, mask) =>
                setFieldValue("paymentDetails.cvv", value)
              }
              placeholder="•••"
              name="cvv"
              type="password"
              className="px-6 py-6 block w-full border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-full text-sm font-normal h-11"
            />
            {touched &&
              touched.paymentDetails?.cvv &&
              errors &&
              errors.paymentDetails?.cvv && (
                <span className="text-xs font-normal ms-3 block text-red-500 mt-2">
                  {errors.paymentDetails?.cvv}
                </span>
              )}
          </div>
        </div>

        <div className="sm:py-3 xl:py-4">
          <ReceiveFutureUpdates
            receiveFutureUpdated={receiveFutureUpdated}
            setReceiveFutureUpdates={setReceiveFutureUpdates}
          />
          <AcceptRulesAndRegulations
            acceptRulesAndRegulations={acceptRulesAndRegulations}
            setAcceptRulesAndRegulations={setAcceptRulesAndRegulations}
          />

          <div className="pt-8">
            <ButtonSecondary
              onClick={handelConfirmPay}
              disabled={!acceptRulesAndRegulations || disablePay}
              type="submit"
              sizeClass="py-3 !px-16 text-base"
              borderColor="border-0"
              fontSize="text-md"
              textColor="text-white"
              bgColor="bg-reddish-600 hover:bg-primary-6000"
              className="ms-4 py-3 rounded-full rounded-l-full  rounded-r-full !px-16"
            >
              {"Confirm & Pay"}
            </ButtonSecondary>
          </div>
        </div>
      </Tab.Panel>
    </>
  );
};

export default CreditAndDebitCardPanel;
