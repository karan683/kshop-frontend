import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import LoadingSpinnner from "../components/LoadingSpinner";
import Message from "../components/Message";

const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history ,redirect]);
  return (
    <div>
      <form 
        className="max-w-md mx-auto border shadow-xl px-4 rounded-md"
        onSubmit={submitHandler}
      >
        <div className="mt-6 mb-8">
          <h1 className="text-2xl font-semibold">SIGN IN</h1>
        </div>
        {loading && <LoadingSpinnner />}{" "}
        {error && <Message variant="bg-red-200">{error}</Message>}
        <div className="flex flex-col">
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
          <label htmlFor="password">Password</label>
          <input
          required
            type="password"
            id="password"
            className="p-1.5 rounded-md my-2 border-2 "
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="mt-6 mb-16">
          <button className="bg-black py-2 px-3 rounded-md text-white">
            SIGN IN
          </button>
          <p className="mt-10">
            New Customer?{" "}
            <span className="hover:underline">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
