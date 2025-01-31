import React, {
  Dispatch,
  FC,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { Tab } from "@headlessui/react";
import Script from "next/script";
import { useThemeMode } from "@/utils/useThemeMode";

import ReceiveFutureUpdates from "./ReceiveFutureUpdates";
import ApplePayButton from "./ApplePayButton";
import AcceptRulesAndRegulations from "./AcceptRulesAndRegulations";

interface IApplePayProps {
  receiveFutureUpdated: boolean;
  acceptRulesAndRegulations: boolean;
  setReceiveFutureUpdates: Dispatch<SetStateAction<boolean>>;
  setAcceptRulesAndRegulations: Dispatch<SetStateAction<boolean>>;
  disablePay: boolean;
}

/*const totalPrice = 0;
const tixboxLocale = "en-US";
const currency = "AED";
const countryCode = "AE";
const eventId = 234;
const applePayDisplayName = "TixBox - v2";
const orderNumber = Math.random();*/

const ApplePayPanel: FC<IApplePayProps> = ({
  receiveFutureUpdated,
  acceptRulesAndRegulations,
  setReceiveFutureUpdates,
  setAcceptRulesAndRegulations,
  disablePay,
}) => {
  const { isDarkMode } = useThemeMode();
  const [isApplePaySessionAvailable, setIsApplePaySessionAvailable] =
    useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsApplePaySessionAvailable(
        (window as any).ApplePaySession ? true : false
      );
    }
  }, []);

  return (
    <>
      <Tab.Panel className="mt-8 lg:w-11/12 w-full">
        <div data-nc-id="ApplePayPanel">
          {isApplePaySessionAvailable ? (
            <>
              <div className="mt-2 sm:py-6 xl:py-8">
                <ReceiveFutureUpdates
                  receiveFutureUpdated={receiveFutureUpdated}
                  setReceiveFutureUpdates={setReceiveFutureUpdates}
                />
                <AcceptRulesAndRegulations
                  acceptRulesAndRegulations={acceptRulesAndRegulations}
                  setAcceptRulesAndRegulations={setAcceptRulesAndRegulations}
                />

                <div className="pt-8">
                  <ApplePayButton
                    type="pay"
                    buttonStyle={isDarkMode ? "white" : "black"}
                    style={{
                      width: "100%",
                      height: "55px",
                      borderRadius: "8px",
                    }}
                    disabled={!acceptRulesAndRegulations || disablePay}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-2 sm:py-6 xl:py-8 text-sm text-center text-grey-700 dark:text-neutral-300">
                <p>{"Apple Pay is not available for this device."}</p>
                <p>
                  {"For more information, please visit "}
                  <a
                    target="_blank"
                    href={"https://support.apple.com/en-in/102896"}
                    className="text-reddish-600"
                  >
                    {"Apple Pay compatible devices"}
                  </a>
                  {"."}
                </p>
              </div>
            </>
          )}
        </div>
      </Tab.Panel>
    </>
  );
};

export default ApplePayPanel;
