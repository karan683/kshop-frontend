import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import LoadingSpinnner from '../components/LoadingSpinner'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { Link } from 'react-router-dom'

const ProductEditScreen = ({location , history ,match}) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/upload`, formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }
  return (
    <div>
      <form className="max-w-md mx-auto border shadow-xl px-4 rounded-md" onSubmit={submitHandler}>
        <div className="mt-6 mb-8">
          <h1 className="text-2xl font-semibold">EDIT PRODUCT</h1>
        </div>
        {loading && <LoadingSpinnner />}
        {error && <Message variant="bg-red-200">{error}</Message>}
        {loadingUpdate && <LoadingSpinnner />}
        {errorUpdate && <Message variant="bg-red-200">{errorUpdate}</Message>}
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
          <label htmlFor="price">Price</label>
          <input
          required
            type="number"
            id="price"
            className="p-1.5 rounded-md my-2 border-2 "
            onChange={(e)=>{setPrice(e.target.value)}}
            value={price}
          />
          <label htmlFor="image">Image</label>
          <input
          required
            type="text"
            id="image"
            className="p-1.5 rounded-md my-2 border-2 "
            onChange={(e)=>{setImage(e.target.value)}}
            value={image}
          />
          {uploading && <LoadingSpinnner />}
          <input type="file" id="image" className='m-2 mb-4' onChange={uploadFileHandler}/>
          <label htmlFor="brand">Brand</label>
          <input
          required
            type="text"
            id="brand"
            className="p-1.5 rounded-md my-2 border-2 "
            value={brand}
            onChange={(e)=>{setBrand(e.target.value)}}
          />
          <label htmlFor="countinstock">Count In Stock</label>
          <input
          required
            type="number"
            id="countinstock"
            className="p-1.5 rounded-md my-2 border-2 "
            value={countInStock}
            onChange={(e)=>{setCountInStock(e.target.value)}}
          />
          <label htmlFor="category">Category</label>
          <input
          required
            type="text"
            id="category"
            className="p-1.5 rounded-md my-2 border-2 "
            value={category}
            onChange={(e)=>{setCategory(e.target.value)}}
          />
          <label htmlFor="description">Description</label>
          <input
          required
            type="text"
            id="description"
            className="p-1.5 rounded-md my-2 border-2 "
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
          />
        </div>
        <div className="mt-6 mb-16 flex justify-center items-center">
            <button className="bg-black py-2 px-3 rounded-md text-white m-2">
              UPDATE
            </button>
            <Link to="/admin/productlist">
              <span className="bg-black py-2 px-3 rounded-md text-white m-2">GO BACK</span>
            </Link>
          </div>
      </form>
    </div>
  );
};

export default ProductEditScreen;
