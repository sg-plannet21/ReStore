import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe(
  "pk_test_51KgBQ1IoRhYVjvPMs83qV2VLgy1FTSuCv43nEDjNp5gW1XUqMZPIVzqTj2uDcy1oTf5Od6ie5RqurSfTOlmbjlke009LKzPvAl"
);

export default function CheckoutWrapper() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <LoadingComponent message="Loading Checkout..." />;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}
