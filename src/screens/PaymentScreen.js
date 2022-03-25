import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <>
      <div>
        <CheckoutSteps step1 step2 step3 />
        <form
          className="max-w-md mx-auto border shadow-xl px-4 rounded-md"
          onSubmit={submitHandler}
        >
          <div className="mt-6 mb-8">
            <h1 className="text-2xl font-semibold">PAYMENT METHOD</h1>
          </div>
          <div className="flex flex-col">
            <label htmlFor="PayPal" className="mb-2">PayPal</label>
            <input
              type='radio'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mt-6 mb-4">
            <button className="bg-black py-2 px-3 rounded-md text-white">
              Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
