import React, { useEffect } from "react";
import { BsPlusLg } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinnner from "../components/LoadingSpinner";
import Message from "../components/Message";
import { listProducts , createProduct , deleteProduct} from "../actions/productActions";
import { MdModeEditOutline, MdDelete } from "react-icons/all";
import { Link } from "react-router-dom";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Paginate from "../components/Paginate";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <div className="lg:px-28">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">PRODUCTS</h1>
          <button className="bg-black text-white px-4 py-3 flex items-center " onClick={createProductHandler}>
            <span className="text-xs mr-2 font-bold">
              <BsPlusLg />
            </span>{" "}
            <p className="text-sm font-semibold">CREATE PRODUCT</p>
          </button>
        </div>
        <div className="overflow-auto mt-10">
          {loadingCreate && <LoadingSpinnner />}
          {errorCreate && <Message variant='bg-red-200'>{errorCreate}</Message>}
          {loadingDelete && <LoadingSpinnner />}
          {errorDelete && <Message variant='bg-red-200'>{errorDelete}</Message>}
          {loading ? (
            <LoadingSpinnner />
          ) : error ? (
            <Message variant="bg-red-200">{error}</Message>
          ) : (
            <>
            {products.length === 0 ? <Message variant='bg-green-200'>No products found !</Message> : (
              <table>
              <thead>
                <tr className="">
                  <th className="px-28 py-2 font-semibold border">ID</th>
                  <th className="px-24 py-2 font-semibold border">Name</th>
                  <th className="px-24 py-2 font-semibold border">PRICE</th>
                  <th className="px-12 py-2 font-semibold border">CATEGORY</th>
                  <th className="px-16 py-2 border">BRAND</th>
                  <th className="px-16 py-2 border"></th>
                </tr>
              </thead>
              <tbody className="bg-gray-100">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-2 py-2 font-semibold border">
                      {product._id}
                    </td>
                    <td className="text-center py-2 font-semibold border">
                      {product.name}
                    </td>
                    <td className="text-center py-2 font-semibold border">
                      {product.price}
                    </td>
                    <td className=" py-2 font-semibold border text-center">
                      {product.category}
                    </td>
                    <td className=" py-2 font-semibold border text-center">
                      {product.brand}
                    </td>
                    <td>
                      <div className="flex justify-center">
                        <span className="my-1 text-xl text-black p-2 bg-white ">
                          <Link to={`/admin/product/${product._id}/edit`}>
                            <MdModeEditOutline />
                          </Link>
                        </span>
                        <span className="my-1 text-xl text-white  p-2 bg-red-400 cursor-pointer" onClick={() => {deleteHandler(product._id)}}>
                          <MdDelete />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
            </>
          )}
        </div>
          <div className="mt-8"><Paginate pages={pages} page={page} isAdmin={true} /></div>
      </div>
    </>
  );
};

export default ProductListScreen;
