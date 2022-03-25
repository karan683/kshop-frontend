import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import Message from "../components/Message";
import LoadingSpinnner from "../components/LoadingSpinner";
import Meta from '../components/Meta';
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <div className="px-4 xl:px-12">
        <div className="mb-8">
          <Link to="/">
            <span className="py-16 hover:underline">Go Back</span>
          </Link>
        </div>
        {loading ? (
          <LoadingSpinnner />
        ) : error ? (
          <Message variant="bg-red-200">{error}</Message>
        ) : (
          <>
          <Meta title={product.name} />
            <div className="flex flex-col lg:flex-row">
              <div className="max-w-xl mx-auto">
                <div className="w-full h-full object-cover object-center">
                  <img src={`${process.env.REACT_APP_BACKEND_API}${product.image}`} alt={product.name} />
                </div>
              </div>
              <div>
                <div className="max-w-sm mx-auto p-4">
                  <h1 className="p-8 text-2xl">{product.name}</h1>
                  <hr />
                  <p className="px-8 py-4">
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </p>
                  <hr />
                  <p className="px-8 py-4">Price: ${product.price}</p>
                  <hr />
                  <p className="p-8">{product.description}</p>
                </div>
              </div>
              <div className="max-w-sm mx-auto">
                <table>
                  <thead className="border">
                    <tr className="p-8">
                      <th className="px-12 py-4 font-normal">Price</th>
                      <th className="px-12 py-4 font-normal">
                        ${product.price}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border">
                    <tr className="border">
                      <td className="px-12 py-2 font-normal">Status</td>
                      <td className="px-12 py-2 font-normal text-sm">
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </td>
                    </tr>
                    {product.countInStock > 0 && (
                      <tr className="border">
                        <td className="px-12 py-2 font-normal">Qty</td>
                        <td className="px-12 py-2 font-normal">
                          <select
                            className="px-4 py-2 focus:outline-none bg-gray-200 "
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </td>
                      </tr>
                    )}
                    <tr className="border">
                      <td className="px-12 py-4" colSpan={2}>
                        <button
                          className="w-full px-4 py-2 bg-black text-white"
                          onClick={addToCartHandler}
                          disabled={product.countInStock === 0}
                        >
                          ADD TO CART
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="max-w-xl mx-auto my-10  lg:mx-0">
              <h2 className="mb-2 text-2xl">Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant="bg-blue-200">No Reviews</Message>
              )}
              <ul>
                {product.reviews.map((review) => (
                  <li key={review._id} className="p-4 mb-2">
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                    <br />
                    <hr />
                  </li>
                ))}
              </ul>
              <form
                className="w-full   px-4 rounded-md"
                onSubmit={submitHandler}
              >
                <div className="mt-6 mb-8">
                  <h1 className="text-2xl font-semibold">
                    WRITE A CUSTOMER REVIEW
                  </h1>
                </div>
                {loadingProductReview && <LoadingSpinnner />}{" "}
                {errorProductReview && (
                  <Message variant="bg-red-200">{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <div className="flex flex-col">
                    <label htmlFor="rating" className="mb-4">
                      Rating
                    </label>
                    <select
                      id="rating"
                      className="p-3 focus:outline-none bg-gray-100"
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                    <label htmlFor="comment" className="my-4">
                      Comment
                    </label>
                    <textarea
                      id="commnet"
                      cols="10"
                      rows="3"
                      className="bg-gray-100 focus:outline-none p-2"
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    ></textarea>
                    <div className="mt-6">
                      <button className="bg-black py-2 px-3 rounded-md text-white">
                        SUBMIT
                      </button>
                    </div>
                  </div>
                ) : (
                  <Message variant="bg-blue-200">
                    Please{" "}
                    <Link to="/login">
                      <span className="underline">sign</span>
                    </Link>{" "}
                    in to write a review
                  </Message>
                )}
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductScreen;
