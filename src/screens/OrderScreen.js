import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/cofig/paypal`);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order, history, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  console.log(order);

  return loading ? (
    <>
      <LoadingSpinner />
    </>
  ) : error ? (
    <Message variant="bg-red-200">{error}</Message>
  ) : (
    <>
        <p className="text-center xl:text-2xl">ORDER ID: {order._id}</p>
      <div className="grid grid-cols-1 lg:grid-col-3 xl:grid-cols-4 px-8 xl:px-36 mt-2 lg:mt-10">
        <div className="col-start-1 lg:col-end-3 xl:col-end-4 xl:px-10">
          <div>
            <h1 className="text-3xl mb-4">SHIPPING</h1>
            <p>
              <strong className="font-normal">Name: </strong> {order.user.name}
            </p>
            <p>
              <strong className="font-normal">Email: </strong>{" "}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p className="mb-5">
              <span className="font-normal">Address:</span>
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            <p>
              {order.isDelivered ? (
                <Message>Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant="bg-red-200">Not Delivered</Message>
              )}
            </p>
            <br />
            <hr />
          </div>
          <div className="mt-6">
            <h1 className="text-3xl mb-4">PAYMENT METHOD</h1>
            <p className="mb-4">
              <strong className="font-normal">Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message>Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="bg-red-200">Not Paid</Message>
            )}
            <br />
            <hr />
          </div>
          <div className="mt-6">
            <h1 className="mb-6 text-xl font-semibold">ORDER ITEMS</h1>
            {order.orderItems.length === 0 ? (
              <Message variant="bg-red-200">Order is empty</Message>
            ) : (
              <>
                {order.orderItems.map((item, index) => (
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
                <th colSpan={2} className="py-6 text-lg  font-normal">
                  ORDER SUMMARY
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <td className="px-4 py-2">Items</td>
                <td className="px-4 py-2">${order.itemsPrice}</td>
              </tr>
              <tr className="border">
                <td className="px-4 py-2">Shipping</td>
                <td className="px-4 py-2">${order.shippingPrice}</td>
              </tr>
              <tr className="border">
                <td className="px-4 py-2">Tax</td>
                <td className="px-4 py-2">${order.taxPrice}</td>
              </tr>
              <tr className="border">
                <td className="px-4 py-2">Total</td>
                <td className="px-4 py-2">${order.totalPrice}</td>
              </tr>
              {error && (
                <>
                  <tr className="border">
                    <td className="px-4 py-2" colSpan={2}>
                      {<Message variant="bg-red-200">{error}</Message>}
                    </td>
                  </tr>
                </>
              )}
              <tr className="border">
                {!order.isPaid && (
                  <td className="px-4 py-2" colSpan={2}>
                    {loadingPay && <LoadingSpinner />}
                    {!sdkReady ? (
                      <LoadingSpinner />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </td>
                )}
              </tr>
              {loadingDeliver && (
                <tr className="border">
                  <td className="px-4 py-2" colSpan={2}>
                    <LoadingSpinner />
                  </td>
                </tr>
              )}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <tr className="border">
                    <td className="px-4 py-2" colSpan={2}>
                      <button
                        className="w-full px-4 py-2 bg-black text-white"
                        onClick={deliverHandler}
                      >
                        Mark As Delivered
                      </button>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
