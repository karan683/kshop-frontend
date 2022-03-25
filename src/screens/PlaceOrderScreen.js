import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="grid grid-cols-1 lg:grid-col-3 xl:grid-cols-4 px-8 xl:px-36 mt-16 lg:mt-10">
        <div className="col-start-1 lg:col-end-3 xl:col-end-4 xl:px-10">
          <div>
            <h1 className="text-3xl mb-4">SHIPPING</h1>
            <p>
              <span className="font-semibold">Address:</span>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
            <br />
            <hr />
          </div>
          <div className="mt-6">
            <h1 className="text-3xl mb-4">PAYMENT METHOD</h1>
            <p>
              <strong className="font-semibold">Method: </strong>
              {cart.paymentMethod}
            </p>
            <br />
            <hr />
          </div>
          <div className="mt-6">
            <h1 className="mb-6 text-xl font-semibold">ORDER ITEMS</h1>
            {cart.cartItems.length === 0 ? (
              <Message variant='bg-blue-200'>Your cart is empty</Message>
            ) : (
              <>
                {cart.cartItems.map((item, index) => (
                  <ul key={index} className="flex flex-col lg:flex-row mb-4">
                    <li className="w-full mb-6 xl:mb-0 lg:w-10 lg:h-10 xl:mx-6">
                      <img
                        src={`${process.env.REACT_APP_BACKEND_API}${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-contain object-center"
                      />
                    </li>
                    <li className="lg:mx-4 xl:mx-6 hover:underline mb-6 xl:mb-0 xl:px-10">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </li>
                    <li className="xl:px-6 mb-6 xl:mb-0">
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </li>
                  </ul>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="lg:col-start-3 lg:col-end-4 xl:col-start-4 xl:col-end-5">
          <table className="w-full">
            <thead>
              <tr className="border">
                <th colSpan={2} className="py-6 text-lg  font-normal">ORDER SUMMARY</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <td className="px-4 py-2">Items</td>
                <td className="px-4 py-2">${cart.itemsPrice}</td>
              </tr>
              <tr className="border">
                <td className="px-4 py-2">Shipping</td>
                <td className="px-4 py-2">${cart.shippingPrice}</td>
              </tr>
              <tr className="border">
                <td className="px-4 py-2">Tax</td>
                <td className="px-4 py-2">${cart.taxPrice}</td>
              </tr>
              <tr className="border">
                <td className="px-4 py-2">Total</td>
                <td className="px-4 py-2">${cart.totalPrice}</td>
              </tr>
              {error && (
                <>
                  <tr className="border">
                    <td className="" colSpan={2}>
                      {<Message variant="bg-red-200">{error}</Message>}
                    </td>
                  </tr>
                </>
              )}
              <tr className="border">
                <td className="px-6 py-4" colSpan={2}>
                  <button
                    className="w-full px-4 py-2 bg-black text-white"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    PLACE ORDER
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
