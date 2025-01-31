import React, { FC, useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

interface IPaypalProps {
  disabled: boolean;
}

const PaypalCheckout: FC<IPaypalProps> = ({ 
  disabled,
}) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    
  const onCreateOrder = (data,actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
              value: "0.10",
          },
        },
      ],
    });
  }

  const onApproveOrder = (data,actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
    });
  }

  return (
    <div className="checkout">
      {isPending ? <p>LOADING...</p> : (
        <>
          <PayPalButtons 
            style={{ layout: "vertical" }}
            disabled={disabled}
            createOrder={(data, actions) => onCreateOrder(data, actions)}
            onApprove={(data, actions) => onApproveOrder(data, actions)}
          />
        </>
      )}
    </div>
  );
}
export default PaypalCheckout;
