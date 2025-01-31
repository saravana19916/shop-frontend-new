import React, {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import paymentsLogo from "@/images/logos/paymentMethods.png";

import ApplePayPanel from "./ApplePayPanel";
import GooglePayPanel from "./GooglePayPanel";
import { Tab } from "@headlessui/react";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import CardForSelectedTicket from "@/app/pay-done/CardForSelectedTicket";
import { TrashIcon } from "@heroicons/react/24/outline";
import { IEventDetailResponse } from "@/queries/eventDetail.query";
import placeHolderImg from "@/images/placeholder-small.png";
import { useRouter } from "next/navigation";
import { Route } from "next";
import * as yup from "yup";
import { CartDataResponse, useDeleteFromCart } from "@/queries/cart.query";
import { toast } from "react-toastify";
import OptionalAddons from "./OptionalAddons";
import PromoCode from "./PromoCode";
import { addonOptions, IOptionalAddonsType } from "@/model/IOptionalAddons";
import BuyerInformation from "./BuyerInformation";
import CreditAndDebitCardPanel from "./CreditAndDebitCardPanel";
import PaypalPanel from "./PaypalPanel";

interface IProps {
  hasQuantity: boolean;
  isLogin: boolean;
  selectedPerformances;
  sessionId;
  eventData: IEventDetailResponse;
  eventCartData: CartDataResponse;
  userData: any;
  refetchCartData: () => void;
  setIsNumberOTPModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEmailOTPModalOpen: Dispatch<SetStateAction<boolean>>;
  userPhone: any;
  setUserPhone: Dispatch<SetStateAction<any>>;
  userEmail: string | null;
  setUserEmail: Dispatch<SetStateAction<string | null>>;
  isEmailAddressVerified: boolean;
  isPhoneNumberVerified: boolean;
  setEmailOPTModelStatus: Dispatch<SetStateAction<boolean>>;
  setNumberOPTModelStatus: Dispatch<SetStateAction<boolean>>;
}
const ReviewOrder: FC<IProps> = ({
  hasQuantity,
  selectedPerformances,
  eventData,
  refetchCartData,
  eventCartData,
  sessionId,
  setIsEmailOTPModalOpen,
  setIsNumberOTPModalOpen,
  isLogin,
  userPhone,
  setUserPhone,
  userEmail,
  setUserEmail,
  isEmailAddressVerified,
  isPhoneNumberVerified,
  setEmailOPTModelStatus,
  setNumberOPTModelStatus,
  userData,
}) => {
  const router = useRouter();

  const { t } = useTranslation();
  const thumbnailURL = process.env.AWS_CLOUD_FRONT_URL + "images/events/";
  const [optionalAddons, setOptionalAddons] = useState<IOptionalAddonsType>({
    digitalTicket: true,
    smsTicket: true,
    basicProtection: true,
  });
  const [receiveFutureUpdated, setReceiveFutureUpdates] =
    useState<boolean>(true);
  const [acceptRulesAndRegulations, setAcceptRulesAndRegulations] =
    useState<boolean>(true);
  const [isPromoCodeApplied, setIsPromoCodeApplies] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<string>(
    "Debit Card & Credit Card"
  );
  const [promoCode, setPromoCode] = useState<any>(null);

  const currentImage = eventData?.data?.galleries[0]?.img_name
    ? thumbnailURL + eventData?.data?.galleries[0]?.img_name
    : placeHolderImg;

  const handleEditRedirect = () => {
    router?.push(`/ticket-selection/${sessionId}` as Route);
  };
  const applyPromoCode = () => {
    if (!promoCode) {
      toast.error("Please enter a promo code!");
    } else if (promoCode?.split("")?.length < 4) {
      toast.error("Please enter a valid promo code 4 chars or above!");
    } else {
      toast.dark("Promo code applied successfully!");
      setIsPromoCodeApplies(true);
    }
  };

  const { mutate: deleteFromCart, isPending: isRemovingFromCart } =
    useDeleteFromCart();
  const _handleRemoveFromCart = (ticket) => {
    const performanceId = eventCartData?.data?.id;

    deleteFromCart(
      { purchase_session_id: performanceId, ticket_id: ticket?.ticket_id },
      {
        onError: (errors: any) => {
          console.log(errors);
          toast.error(errors?.error?.message);
        },
        onSuccess: (data) => {
          toast.success(data?.message);
          refetchCartData();
        },
      }
    );
  };
  useEffect(() => {
    const ticketsCount = selectedPerformances?.tickets
      ?.map((item) => item.ticket.quantity || 0)
      ?.reduce((sum, onHold) => sum + onHold, 0);
    const selectedAddonsArray = addonOptions
      .filter((addon) => optionalAddons[addon.value])
      .map((addon) => ({
        ...addon,
        count: ticketsCount,
      }));
  }, [optionalAddons, selectedPerformances]);
  const handelConfirmPay = () => {
    if (selectedPerformances?.id != 0) {
      if (hasQuantity) {
        if (typeof window !== "undefined") {
          if (applyPromoCode) {
            localStorage?.setItem("appliedDiscount", JSON.stringify(200));
          }
          localStorage?.setItem("cart", JSON.stringify(selectedPerformances));
          localStorage?.setItem("paymentType", JSON.stringify(paymentType));
          localStorage?.setItem(
            "optionalAddons",
            JSON.stringify(optionalAddons)
          );
          localStorage?.setItem("event", JSON.stringify(eventData));
          sessionStorage?.setItem("cart", JSON.stringify(selectedPerformances));
          sessionStorage?.setItem("paymentType", JSON.stringify(paymentType));
          sessionStorage?.setItem("event", JSON.stringify(eventData));
          router.push("/pay-done");
        }
      } else {
        toast.error("Please select at least a ticket to continue!");
      }
    }
  };
  const initialValue = {
    userDetails: {
      userEmail: userData?.user?.email || undefined,
      userPhoneNumber: userData?.user?.profile?.phone_number || undefined,
      fullNameOnTicket: undefined,
      nationality: undefined,
      countryOfResidence: undefined,
      gender: undefined,
      occupation: undefined,
    },
    paymentDetails: {
      cardNumber: undefined,
      cardHolder: undefined,
      expirationDate: undefined,
      cvv: undefined,
    },
  };
  const validationSchema = yup.object().shape({
    userDetails: yup.object().shape({
      userEmail: yup.string().required("Required").nullable(),
      userPhoneNumber: yup.string().required("Required").nullable(),
      fullNameOnTicket: yup.string().required("Required").nullable(),
      nationality: userData
        ? yup.string().nullable()
        : yup.string().required("Required").nullable(),
      countryOfResidence: userData
        ? yup.string().nullable()
        : yup.string().required("Required").nullable(),
      occupation: userData
        ? yup.string().nullable()
        : yup.string().required("Required").nullable(),
      gender: userData
        ? yup.string().nullable()
        : yup.string().required("Required").nullable(),
    }),
    paymentDetails: yup.object().shape({
      cardNumber: yup
        .string()
        .required("Required")
        .nullable()
        .test(
          "is-16-digits",
          "Card number must be exactly 16 digits",
          (value) => {
            if (!value) return true;
            const cleanedValue = value.replace(/\s+/g, "");
            return /^\d{16}$/.test(cleanedValue);
          }
        ),
      cardHolder: yup.string().required("Required").nullable(),
      expirationDate: yup
        .string()
        .required("Required")
        .nullable()
        .test(
          "is-valid-date",
          "Expiration date must be in the current or future month and year",
          function (value) {
            if (!value) return true; // Allow nullable
            const [month, year] = value.split(" / ").map(Number); // Assuming MM/YY format
            if (!month || !year || month < 1 || month > 12) return false; // Invalid format

            const today = new Date();
            const currentMonth = today.getMonth() + 1; // Months are 0-based
            const currentYear = today.getFullYear() % 100; // Get last two digits of the year

            return (
              year > currentYear ||
              (year === currentYear && month >= currentMonth)
            );
          }
        ),
      cvv: yup
        .string()
        .required("Required")
        .nullable()
        .matches(/^\d{3}$/, "CVV must be exactly 3 digits"),
    }),
  });
  return (
    <>
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 py-16 sm:py-16 xl:py-8">
        <span className="text-3xl font-semibold lg:text-4xl lg:ps-8">Review Order</span>
        <div className="pt-1 pb-2 lg:ps-8">
          {hasQuantity ? (
            <>
              {selectedPerformances?.tickets?.map((ticket) => (
                <>
                  {ticket?.ticket?.quantity ? (
                    <>
                      <div className="flex">
                        <div className="w-11/12">
                          <CardForSelectedTicket
                            currentImage={currentImage}
                            quantity={ticket?.ticket?.quantity}
                            ticketType={ticket?.ticket?.identifier}
                            eventName={eventData?.data?.detail?.name}
                            date={selectedPerformances?.start_date}
                            handleEditRedirect={handleEditRedirect}
                          />
                        </div>
                        <div className="w-1/12 flex items-center justify-center">
                          <TrashIcon
                            className="h-6 w-6 cursor-pointer text-gray-500"
                            onClick={() =>
                              !isRemovingFromCart &&
                              _handleRemoveFromCart(ticket)
                            }
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </>
          ) : (
            <>
              <div className="flex">
                <div className="w-11/12">
                  <div className="p-10">
                    <p className="text-xl font-semibold text-center">
                      No tickets found. Please select{" "}
                      <a
                        href={`/ticket-selection/${sessionId}`}
                        className="text-reddish-500"
                      >
                        tickets!
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="lg:ps-8">
          <OptionalAddons
            optionalAddons={optionalAddons}
            padding="p-5"
            setOptionalAddons={setOptionalAddons}
            paymentCurrency={
              selectedPerformances?.tickets?.[0]?.ticket?.payment_currency
            }
          />
        </div>
        <div className="lg:ps-8">
          <PromoCode
            isPromoCodeApplied={isPromoCodeApplied}
            onChangePromoCode={setPromoCode}
            promoCode={promoCode}
            applyPromoCode={applyPromoCode}
          />
        </div>
        <Formik
          initialValues={initialValue}
          onSubmit={(values, errors) => {
            handelConfirmPay();
          }}
          validationSchema={validationSchema}
        >
          {({ values, handleSubmit, setFieldValue, errors, touched }) => {
            console.log(errors, "errors");
            console.log(touched, "touched");
            console.log(values, "values");

            return (
              <>
                <Form>
                  <div className="lg:ps-8">
                    <BuyerInformation
                      setIsNumberOTPModalOpen={setIsNumberOTPModalOpen}
                      setIsEmailOTPModalOpen={setIsEmailOTPModalOpen}
                      setUserPhone={setUserPhone}
                      setUserEmail={setUserEmail}
                      isEmailAddressVerified={isEmailAddressVerified}
                      isPhoneNumberVerified={isPhoneNumberVerified}
                      isLogin={isLogin}
                      values={values}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className="lg:ps-8">
                    <h3 className="text-2xl font-semibold">Payment</h3>

                    <div className="mt-8 lg:w-11/12 w-full">
                      <Tab.Group>
                        <Tab.List className="sm:flex my-5 gap-4">
                          <Tab as={Fragment}>
                            {({ selected }) => (
                              <button
                                className={`mb-2 mr-2 px-4 py-3 rounded-full justify-center focus:outline-none text-sm font-semibold ${
                                  selected
                                    ? "bg-neutral-100 dark:text-black dark:text-white-900"
                                    : ""
                                }`}
                                onClick={() =>
                                  setPaymentType("Debit Card & Credit Card")
                                }
                              >
                                <span>{t("debit&CreditCard")}</span>
                              </button>
                            )}
                          </Tab>
                          <Tab as={Fragment}>
                            {({ selected }) => (
                              <button
                                className={`mb-2 mr-2 px-4 py-3 rounded-full justify-center focus:outline-none text-sm font-semibold ${
                                  selected
                                    ? "bg-neutral-100 dark:text-black"
                                    : ""
                                }`}
                                onClick={() => setPaymentType("Paypal")}
                              >
                                <span>{t("paypal")}</span>
                              </button>
                            )}
                          </Tab>
                          <Tab as={Fragment}>
                            {({ selected }) => (
                              <button
                                className={`mb-2 mr-2 px-4 py-3 rounded-full justify-center focus:outline-none text-sm font-semibold ${
                                  selected
                                    ? "bg-neutral-100 dark:text-black dark:text-white-900"
                                    : ""
                                }`}
                                onClick={() => setPaymentType("Apple Pay")}
                              >
                                <span>{t("applePay")}</span>
                              </button>
                            )}
                          </Tab>
                        </Tab.List>

                        <Tab.Panels>
                          <CreditAndDebitCardPanel
                            values={values}
                            handelConfirmPay={handleSubmit}
                            userEmail={userEmail}
                            setEmailOPTModelStatus={setEmailOPTModelStatus}
                            setNumberOPTModelStatus={setNumberOPTModelStatus}
                            userPhone={userPhone}
                            setPhone={setUserPhone}
                            setUserEmail={setUserEmail}
                            setAcceptRulesAndRegulations={
                              setAcceptRulesAndRegulations
                            }
                            setReceiveFutureUpdates={setReceiveFutureUpdates}
                            receiveFutureUpdated={receiveFutureUpdated}
                            acceptRulesAndRegulations={
                              acceptRulesAndRegulations
                            }
                            disablePay={!hasQuantity}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            touched={touched}
                          />
                          <PaypalPanel
                            setAcceptRulesAndRegulations={
                              setAcceptRulesAndRegulations
                            }
                            setReceiveFutureUpdates={setReceiveFutureUpdates}
                            receiveFutureUpdated={receiveFutureUpdated}
                            acceptRulesAndRegulations={
                              acceptRulesAndRegulations
                            }
                            disablePay={!hasQuantity}
                          />
                          <ApplePayPanel
                            setAcceptRulesAndRegulations={
                              setAcceptRulesAndRegulations
                            }
                            setReceiveFutureUpdates={setReceiveFutureUpdates}
                            receiveFutureUpdated={receiveFutureUpdated}
                            acceptRulesAndRegulations={
                              acceptRulesAndRegulations
                            }
                            disablePay={!hasQuantity}
                          />
                          <GooglePayPanel
                            handelConfirmPay={handleSubmit}
                            disablePay={!hasQuantity}
                          />
                        </Tab.Panels>
                      </Tab.Group>
                    </div>
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      </div>
      <div className="mt-8 sm:py-6 xl:py-8">
        <span className="text-sm text-neutral-500 block mt-8">
          {t("acceptedPaymentMethods")}
        </span>
        <div className="mt-4">
          <Image
            className="w-80 dark:invert"
            src={paymentsLogo}
            alt="paymentLogo"
          />
        </div>
      </div>
    </>
  );
};

export default ReviewOrder;
