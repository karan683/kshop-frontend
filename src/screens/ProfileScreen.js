import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSpinnner from "../components/LoadingSpinner";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { ImCross } from "react-icons/all";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
  
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords have to match !");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:px-32">
        <div className="max-w-4xl  lg:max-w-xs">
          <h1 className="text-2xl px-4 mb-4">USER PROFILE</h1>
          <form className="w-full px-4 rounded-md" onSubmit={submitHandler}>
            {loading && <LoadingSpinnner />}{" "}
            {error && <Message variant="bg-red-200">{error}</Message>}
            {message && <Message variant="bg-red-200">{message}</Message>}
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="p-1.5 rounded-md my-2 border-2 "
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="p-1.5 rounded-md my-2 border-2 "
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="p-1.5 rounded-md my-2 border-2 "
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                type="password"
                id="confirmpassword"
                className="p-1.5 rounded-md my-2 border-2 "
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <div className="mt-6 mb-16">
              <button
                type="submit"
                className="bg-black py-2 px-3 rounded-md text-white"
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>
        <div className="w-full overflow-auto">
          <h1 className="text-2xl mb-6">MY ORDERS</h1>
          {loadingOrders ? (
            <LoadingSpinnner />
          ) : errorOrders ? (
            <Message variant='bg-red-200'>{errorOrders}</Message>
          ) : (
            <>
              {orders.length === 0 ? (
                <Message variant="bg-blue-200">
                  No orders found Please buy something !
                </Message>
              ) : (
                
                  <table>
                  <thead>
                    <tr className="">
                      <th className="px-8 py-2 font-semibold border">ID</th>
                      <th className="px-12 py-2 font-semibold border">DATE</th>
                      <th className="px-8 py-2 font-semibold border">TOTAL</th>
                      <th className="px-6 py-2 font-semibold border">PAID</th>
                      <th className="px-6 py-2  font-semibold border">
                        DELIVERED
                      </th>
                      <th className="border"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100">
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="px-12 py-4 border  ">{order._id}</td>
                        <td className="px-8 py-4 border  ">
                          {order.createdAt.substring(0, 10)}
                        </td>
                        <td className="px-8 py-4 border  ">
                          {order.totalPrice}
                        </td>
                        <td className="px-6 py-4 border  ">
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <span className="text-red-600 text-sm flex justify-center">
                              <ImCross />
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 border  ">
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <span className="text-red-600 text-sm flex justify-center" >
                              <ImCross />
                            </span>
                          )}
                        </td>
                        <td className="border px-4 py-4">
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
                
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
