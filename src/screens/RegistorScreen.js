import React, { useState  , useEffect} from "react";
import { useDispatch ,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import Message from "../components/Message";
import LoadingSpinnner from "../components/LoadingSpinner";

const RegistorScreen = ({location , history}) => {
    const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null)

  const userLogin = useSelector((state) => state.userLogin)
  const {  userInfo } = userLogin
  
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
      if(password !== confirmPassword) {
          setMessage('password have to match !')
      }else {
          dispatch(register(name,email,password))
      }
      e.preventDefault();
  }
  return (
    <div>
      <form className="max-w-md mx-auto border shadow-xl px-4 rounded-md" onSubmit={submitHandler}>
        <div className="mt-6 mb-8">
          <h1 className="text-2xl font-semibold">SIGN UP</h1>
        </div>
        {loading && <LoadingSpinnner />}{" "}
        {error && <Message variant="bg-red-200">{error}</Message>}
        {message && <Message variant='bg-red-200'>{message}</Message>}
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
          required
            type="text"
            id="name"
            className="p-1.5 rounded-md my-2 border-2 "
            onChange={(e)=>{setName(e.target.value)}}
            value={name}
          />
          <label htmlFor="email">Email Address</label>
          <input
          required
            type="email"
            id="email"
            className="p-1.5 rounded-md my-2 border-2 "
            onChange={(e)=>{setEmail(e.target.value)}}
            value={email}
          />
          <label htmlFor="password">Password</label>
          <input
          required
            type="password"
            id="password"
            className="p-1.5 rounded-md my-2 border-2 "
            onChange={(e)=>{setPassword(e.target.value)}}
            value={password}
          />
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
          required
            type="password"
            id="confirmpassword"
            className="p-1.5 rounded-md my-2 border-2 "
            value={confirmPassword}
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
          />
        </div>
        <div className="mt-6 mb-16">
          <button className="bg-black py-2 px-3 rounded-md text-white">
            REGISTOR
          </button>
          <p className="mt-10">
            Have an Account?{" "}
            <span className="hover:underline">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistorScreen;
