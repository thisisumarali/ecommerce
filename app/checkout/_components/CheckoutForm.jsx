import GlobalApi from "@/app/_utlis/GlobalApi";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { CartContext } from "@/app/_context/CartContext";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    createOrder();
    sendEmail()
    const res = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
      }),
    });
    const clientSecret = await res.json();
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret: clientSecret,
      elements,
      confirmParams: {
        return_url: "https://localhost:3000/payment-confirm",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  const createOrder = () => {
    let productsIds = [];
    cart.forEach((element) => {
      productsIds.push(element?.products?.id);
    });
    const data = {
      data: {
        email: user.primaryEmailAddress.emailAddress,
        userName: user.fullName,
        amount: amount,
        products: productsIds,
      },
    };
    GlobalApi.createOrder(data).then((resp) => {
      if (resp) {
        cart.forEach((element) => {
          GlobalApi.deleteCartItems(element.id).then(result=>{

          })
        });
      }
    });
  };
  const sendEmail=async()=>{
    const res = await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
      }),
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="px-32 mt-12 md:mx-[200px]">
        <PaymentElement />
        <button className="bg-primary text-white rounded-md p-2 w-full mt-6 hover:bg-primary/80">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
