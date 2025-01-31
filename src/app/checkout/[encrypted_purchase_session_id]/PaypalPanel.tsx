import React, { Dispatch, FC, SetStateAction, useState } from "react";
import PaypalCheckout from "./PaypalCheckout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Tab } from "@headlessui/react";

import AcceptRulesAndRegulations from "./AcceptRulesAndRegulations";
import ReceiveFutureUpdates from "./ReceiveFutureUpdates";

interface IPaypalProps {
  receiveFutureUpdated: boolean;
  acceptRulesAndRegulations: boolean;
  setReceiveFutureUpdates: Dispatch<SetStateAction<boolean>>;
  setAcceptRulesAndRegulations: Dispatch<SetStateAction<boolean>>;
  disablePay: boolean;
}

const initialOptions = {
  clientId:
    "AXON8KhX7CWS_9aBWPTJJ-LRyALMKjoZG0U6SnLm2RRUqLMHWZr3A-pMgm3ukpYOgCGsZcLRzEdR1cVy",
  currency: "AED",
  intent: "capture",
};

const PaypalPanel: FC<IPaypalProps> = ({
  receiveFutureUpdated,
  acceptRulesAndRegulations,
  setReceiveFutureUpdates,
  disablePay,
  setAcceptRulesAndRegulations,
}) => {
  return (
    <Tab.Panel className="mt-8 lg:w-11/12 w-full">
      <div className="sm:py-6 xl:py-8">
        <ReceiveFutureUpdates
          receiveFutureUpdated={receiveFutureUpdated}
          setReceiveFutureUpdates={setReceiveFutureUpdates}
        />
        <AcceptRulesAndRegulations
          acceptRulesAndRegulations={acceptRulesAndRegulations}
          setAcceptRulesAndRegulations={setAcceptRulesAndRegulations}
        />

        <div className="pt-8">
          <PayPalScriptProvider options={initialOptions}>
            <PaypalCheckout
              disabled={!acceptRulesAndRegulations || disablePay}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </Tab.Panel>
  );
};

export default PaypalPanel;
