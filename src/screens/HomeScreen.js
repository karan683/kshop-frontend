import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingSpinnner from "../components/LoadingSpinner";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';

const HomeScreen = ({match}) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
    <div>
      <Meta />
      <h1 className="text-4xl px-3 mt-6 mb-4">LATEST PRODUCTS</h1>
      {loading ? (
        <LoadingSpinnner />
      ) : error ? (
        <Message variant='bg-red-200'>{error}</Message>
      ) : (
        <>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 ">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
        <div className="px-2 mt-4 flex justify-center">
        <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </div>
        </>
      )}
      </div>
    </>
  );
};

export default HomeScreen;
