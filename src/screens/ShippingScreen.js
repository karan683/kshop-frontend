import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from "../actions/cartActions";


const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <>
      <div>
        <CheckoutSteps step1 step2 />
        <form
          className="max-w-md mx-auto border shadow-xl px-4 rounded-md"
          onSubmit={submitHandler}
          required
        >
          <div className="mt-6 mb-8">
            <h1 className="text-2xl font-semibold">Shipping</h1>
          </div>
          <div className="flex flex-col">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              className="p-1.5 rounded-md my-2 border-2 "
              value={address}
              required
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <label htmlFor="city">City</label>
            <input
            required
              type="text"
              id="city"
              className="p-1.5 rounded-md my-2 border-2 "
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <label htmlFor="code">Postal Code</label>
            <input
            required
              type="text"
              id="code"
              className="p-1.5 rounded-md my-2 border-2 "
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
            />
            <label htmlFor="city">Country</label>
            <input
            required
              type="text"
              id="country"
              className="p-1.5 rounded-md my-2 border-2 "
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            />
          </div>
          <div className="mt-6 mb-16">
            <button className="bg-black py-2 px-3 rounded-md text-white">
              Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
