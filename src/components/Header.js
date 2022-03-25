import React, { useState } from "react";
import { AiOutlineShoppingCart, MdAccountCircle } from "react-icons/all";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import { Route } from "react-router-dom";

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const [showAdminDropDown, setShowAdminDropDown] = useState(false);
  const [mobileNavigationIsOpen, setMobileNavigationIsOpen] = useState(false);

  const profileDropDownClickHandler = () => {
    if (showProfileDropDown) {
      setShowProfileDropDown(false);
    } else {
      setShowProfileDropDown(true);
    }
  };

  const adminDropDownClickHandler = () => {
    if (showAdminDropDown) {
      setShowAdminDropDown(false);
    } else {
      setShowAdminDropDown(true);
    }
  };

  const buttonClickHandler = () => {
    if (window.innerWidth < 1000) {
      if (mobileNavigationIsOpen) {
        document.getElementById("nav-content").classList.toggle("hidden");
        setMobileNavigationIsOpen(false);
      } else {
        setMobileNavigationIsOpen(true);
        document.getElementById("nav-content").classList.toggle("hidden");
      }
    }
  };
  const spanClickHandler = () => {
    if (window.innerWidth < 1000) {
      buttonClickHandler();
    }
  };

  const profileSpanClickHandler = () => {
    profileDropDownClickHandler();
    spanClickHandler();
  };

  const logoutHandler = () => {
    profileDropDownClickHandler();
    spanClickHandler();
    dispatch(logout());
  };

  const usersSpanClickHandler = () => {
    adminDropDownClickHandler();
    spanClickHandler();
  };
  const productsSpanClickHandler = () => {
    adminDropDownClickHandler();
    spanClickHandler();
  };
  const ordersSpanClickHandler = () => {
    adminDropDownClickHandler();
    spanClickHandler();
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-black p-6 lg:p-6 ">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/">
            <h1 className="ml-4 lg:ml-10 xl:ml-16  text-3xl text-white hover:text-gray-400 font-semibold">
              KSHOP
            </h1>
          </Link>
        </div>
        <div className="block lg:hidden text-white">
          <span
            className="text-4xl  md:mr-10 text-white block lg:hidden cursor-pointer"
            onClick={buttonClickHandler}
          >
            ☰
          </span>
        </div>
        <div
          className="w-full flex-grow lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0  xl:mr-40 "
          id="nav-content"
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="lg:mr-10 2xl:mr-60">
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </li>
            <Link to="/cart">
              <li
                className="text-gray-300  hover:text-white m-2 lg:mx-2  flex items-center"
                onClick={buttonClickHandler}
              >
                <span className="text-xl">
                  <AiOutlineShoppingCart />
                </span>
                <h5 className="ml-2 font-semibold text-sm">CART</h5>
              </li>
            </Link>
            (
            {userInfo ? (
              <li className="mx-2 lg:mx-4">
                <div className="relative inline-block text-left">
                  <div
                    className="inline-flex justify-center w-full rounded-md  shadow-sm px-4 py-2 bg-black text-gray-300 hover:text-white text-sm font-medium   focus:outline-none cursor-pointer"
                    onClick={profileDropDownClickHandler}
                  >
                    {userInfo.name}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                  {showProfileDropDown && (
                    <div className="origin-top-right block lg:absolute right-0 mt-2 w-36  shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1" role="none">
                        <Link to="/profile">
                          <span
                            className="text-black block px-4 p-0.5 my-1 text-center text-sm hover:bg-black hover:text-white"
                            onClick={profileSpanClickHandler}
                          >
                            Profile
                          </span>
                        </Link>
                        <span
                          className="text-black block px-4 p-0.5 my-1 text-center text-sm hover:bg-black hover:text-white cursor-pointer"
                          onClick={logoutHandler}
                        >
                          Logout
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ) : (
              <Link to="/login">
                <li
                  className="text-gray-300  hover:text-white m-2 lg:m-6  flex items-center"
                  onClick={buttonClickHandler}
                >
                  <span className="text-xl">
                    <MdAccountCircle />
                  </span>
                  <h5 className="ml-2 font-semibold text-sm">SIGN IN</h5>
                </li>
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <li className="m-4 lg:mx-4 ">
                <div className="relative inline-block text-left">
                  <div
                    className="inline-flex justify-center w-full rounded-md  shadow-sm px-4 py-2 bg-black text-gray-300 hover:text-white text-sm font-medium   focus:outline-none cursor-pointer"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={adminDropDownClickHandler}
                  >
                    ADMIN
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>

                  {showAdminDropDown && (
                    <div className="origin-top-right block lg:absolute right-0 mt-2 w-36  shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1" role="none">
                        <Link to="/admin/userlist">
                          <span
                            onClick={usersSpanClickHandler}
                            className="text-black block px-4 p-0.5 my-1 text-center text-sm hover:bg-black hover:text-white "
                          >
                            Users
                          </span>
                        </Link>
                        <Link to="/admin/productlist">
                          <span
                            onClick={productsSpanClickHandler}
                            className="text-black block px-4 p-0.5 my-1 text-center text-sm hover:bg-black hover:text-white "
                          >
                            Products
                          </span>
                        </Link>
                        <Link to="/admin/orderlist">
                          <span
                            className="text-black block px-4 p-0.5 my-1 text-center text-sm hover:bg-black hover:text-white "
                            role="menuitem"
                            id="menu-item-2"
                            onClick={ordersSpanClickHandler}
                          >
                            Orders
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
