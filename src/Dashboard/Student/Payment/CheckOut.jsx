/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./checkOut.css";
import { useState } from "react";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
const CheckOut = ({ price, items }) => {
  const {_id , className , image , instructorName  } = items
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [transectionId, setTransectionId] = useState();

  //handle intent for payment
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
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

    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    setProcessing(false);
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      setTransectionId(paymentIntent.id);
      const transectionId = paymentIntent.id;
      const payment = {
        email: user.email,
        transectionId: paymentIntent.id,
        price,
        data : new Date(),
        className: className,
        classId: _id,
        InstructorName: instructorName,
        image: image, 

        
      };
   

      axiosSecure.post("/paymenthistory", payment).then((res) => {
        if (res.data.insertedId) {
          Swal.fire("Good job!", "Your payment is Completed!", "success");
        }
      });
    }

    if (confirmError) {
      setCardError(confirmError);
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
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
