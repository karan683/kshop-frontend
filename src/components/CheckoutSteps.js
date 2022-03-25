import React from "react";
import {Link} from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="max-w-md mb-8 shadow-md mx-auto px-6 py-4 border">
      <ul className="flex">
        <li className="lg:px-2 py-2  mx-1 lg:mx-2">
          {step1 ? (
            <Link to="/login">
              <span>Sign In</span>
            </Link>
          ) : (
            <span className="line-through">Sign In</span>
          )}
        </li>
        <li className="lg:px-2 py-2 mx-1 lg:mx-2">
        {step2 ? (
            <Link to="/shipping">
              <span>Shipping</span>
            </Link>
          ) : (
            <span className="line-through">Shipping</span>
          )}
        </li>
        <li className="lg:px-2 py-2 mx-1 lg:mx-2">
        {step3 ? (
            <Link to="/payment">
              <span>Payment</span>
            </Link>
          ) : (
            <span className="line-through">Payment</span>
          )}
        </li>
        <li className="lg:px-2 py-2 mx-1 lg:mx-2">
        {step4 ? (
            <Link to="/placeorder">
              <span>Place order</span>
            </Link>
          ) : (
            <span className="line-through">Place order</span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default CheckoutSteps;
