import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinnner from "../components/LoadingSpinner";
import Message from "../components/Message";
import { listOrders } from "../actions/orderActions";
import {BsCheckLg , ImCross } from 'react-icons/all'
import { Link } from "react-router-dom";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);
  return (
    <>
      <div className="overflow-auto lg:px-28">
        <h1 className="text-3xl font-semibold mb-8">ORDERS</h1>
        {loading ? (
          <LoadingSpinnner />
        ) : error ? (
          <Message variant="bg-red-200">{error}</Message>
        ) : (
          <>
          {orders.length === 0 ? <Message variant='bg-blue-200'>No orders found</Message> : (<div className="overflow-auto">
              <table>
            <thead>
              <tr className="">
                <th className="px-28 py-2 font-semibold border">ID</th>
                <th className="px-16 py-2 font-semibold border">USER</th>
                <th className="px-16 py-2 font-semibold border">DATE</th>
                <th className="px-12 py-2 font-semibold border">TOTAL</th>
                <th className="px-12 py-2 font-semibold border">PAID</th>
                <th className="px-10 py-2 font-semibold border">DELIVERED</th>
                <th className="px-12 py-2 font-semibold border"></th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-2 py-4 font-semibold border">{order._id}</td>
                  <td className="text-center py-4 font-semibold border">{order.user && order.user.name}</td>
                  <td className="text-center py-4 font-semibold border">{order.createdAt.substring(0, 10)}</td>
                  <td className="text-center py-4 font-semibold border">${order.totalPrice}</td>
                  <td className=" py-4 font-semibold border">{
                      order.isPaid ? <span className="flex justify-center text-green-500 text-xl"><BsCheckLg /></span> : <span className="flex justify-center text-red-500"><ImCross /></span>
                  }</td>
                  <td className=" py-2 font-semibold border">{
                      order.isDelivered ? <span className="flex justify-center text-green-500 text-xl"><BsCheckLg /></span> : <span className="flex justify-center text-red-500"><ImCross /></span>
                  }</td>
                  <td className="border px-4 py-2">
                          <Link to={`/order/${order._id}`}>
                            <span className="px-6 py-2 bg-white text-xs hover:bg-gray-200 ">
                              DETAILS
                            </span>
                          </Link>
                        </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>)}


          
          </>
        )}
      </div>
    </>
  );
};

export default OrderListScreen;
