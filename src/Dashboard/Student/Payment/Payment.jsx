import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";
import { Elements } from "@stripe/react-stripe-js";
import useSelectedClass from "../../../hooks/useSelectedClass";
const stripePromise = loadStripe(import.meta.env.VITE_payment_getway_pk);

const Payment = () => {
  const [, selectedClass] = useSelectedClass();
  const total = selectedClass.reduce((sum, item) => sum + item.price, 0);
  const price = parseFloat(total.toFixed(2));
  return (
    <div className="w-2/3">
      <h2 className="text-3xl font-bold text-center mb-10">
        Make Your payment Done !
      </h2>
      <Elements stripe={stripePromise}>
        <CheckOut price={price}></CheckOut>
      </Elements>
    </div>
  );
};

export default Payment;
