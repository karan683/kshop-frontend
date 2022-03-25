import React from "react";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <>
      <div className="max-w-64 mb-6 lg:mb-0 border-2 md:m-4 rounded-md shadow-md p-4">
        <div>
          <Link to={`/product/${product._id}`}>
            <div>
              <img
                src={`${process.env.REACT_APP_BACKEND_API}${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </Link>
        </div>
        <div className="p-4">
          <Link to={`/product/${product._id}`}>
            <h4 className="hover:underline">{product.name}</h4>
          </Link>
        </div>
        <div className="px-4">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>
        <div className="p-6">
          <h1 className="text-2xl">${product.price}</h1>
        </div>
      </div>
    </>
  );
};

export default Product;
