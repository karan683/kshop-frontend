import React, { useState } from 'react'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    setKeyword('')
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <form onSubmit={submitHandler} className='my-10 lg:my-0'>
        <input value={keyword} placeholder='Search Product' type="text" onChange={(e)=>{setKeyword(e.target.value)}} className='px-4 py-1  focus:outline-none mr-2'/>
        <button className='texxt-white px-4 py-1 bg-white border rounded-sm'>Search</button>
    </form>
  )
}

export default SearchBox

