/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./checkOut.css";
import { useState } from "react";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const CheckOut = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");

  //   handle intent for payment
  useEffect(() => {
	axiosSecure.post('/create-payment-intent', {price})
	.then(res=> {
		
	})
  }, []);

  //   handle payButton
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <div className="border-solid border-5 shadow border-gray-100 p-20 bg-white ml-20">
      <form onSubmit={handleSubmit}>
        <p className="text-red-600 text-center">{cardError}</p>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="text-center">
          <button
            className="btn btn-primary mt-5 w-48"
            type="submit"
            disabled={!stripe}
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
