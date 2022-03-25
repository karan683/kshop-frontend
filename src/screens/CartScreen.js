import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { AiFillDelete } from "react-icons/all";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      <div className="px-8 xl:px-16">
        <h1 className="mb-4 text-2xl xl:text-4xl">SHOPPING CART</h1>
        {cartItems.length === 0 ? (
          <Message variant="bg-blue-200">Your cart is empty</Message>
        ) : (
          <div className="flex flex-col lg:flex-row lg:justify-around">
            <div className="w-full lg:max-w-xl">
              {cartItems.map((item) => (
                <div className="flex flex-col lg:flex-row mt-8">
                  <div className="w-full lg:w-20 mr-6">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_API}${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-contain object-center"
                    />
                  </div>
                  <div className="mr-6 mt-4 lg:mt-0">
                    <p className="hover:underline text-md w-60"><Link to={`/product/${item.product}`}>{item.name}</Link></p>
                  </div>
                  <div className="mr-6 mt-4 lg:mt-0">${item.price}</div>
                  <div className="mr-8 mt-4 lg:mt-0 w-full lg:w-auto">
                    <select
                      className="px-4 py-2 bg-gray-200 w-full focus:outline-none"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-4 lg:mt-0 pt-2">
                    <span
                      className="text-lg cursor-pointer"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <AiFillDelete />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16 lg:mt-0 flex justify-center h-40">
              <table className="border h-full">
                <thead>
                  <tr>
                    <th className="py-4">
                      <p className="text-xl lg:text-3xl font-normal px-6">
                        SUBTOTAL (
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                        ITEMS
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <p className="text-left px-6 font-normal mb-2">
                        $
                        {cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody className="border">
                  <tr>
                    <td className="flex justify-center py-6">
                      <button className="px-6 py-2 bg-black text-white" onClick={checkoutHandler}>
                        PROCEED TO CHECKOUT
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartScreen;

