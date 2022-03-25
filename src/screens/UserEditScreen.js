import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import LoadingSpinnner from "../components/LoadingSpinner";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import { Link } from "react-router-dom";

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };
  return (
    <>
      <div>
        <form
          className="max-w-md mx-auto border shadow-xl px-4 rounded-md"
          onSubmit={submitHandler}
        >
          <div className="mt-6 mb-8">
            <h1 className="text-2xl font-semibold">EDIT USER</h1>
          </div>
          {loading && <LoadingSpinnner />}{" "}
          {error && <Message variant="bg-red-200">{error}</Message>}
          {loadingUpdate && <LoadingSpinnner />}{" "}
          {errorUpdate && <Message variant="bg-red-200">{errorUpdate}</Message>}
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              required
              type="text"
              id="name"
              className="p-1.5 rounded-md my-2 border-2 "
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label htmlFor="email">Email Address</label>
            <input
              required
              type="email"
              id="email"
              className="p-1.5 rounded-md my-2 border-2 "
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="flex items-center mt-4 ">
              <input
                type="checkbox"
                id="checkbox"
                className=" mr-2"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <label htmlFor="checkbox">Is Admin</label>
            </div>
          </div>
          <div className="mt-6 mb-16 flex justify-center items-center">
            <button className="bg-black py-2 px-3 rounded-md text-white m-2">
              UPDATE
            </button>
            <Link to="/admin/userlist">
              <span className="bg-black py-2 px-3 rounded-md text-white m-2">
                GO BACK
              </span>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserEditScreen;
