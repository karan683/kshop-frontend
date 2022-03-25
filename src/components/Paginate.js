import React from 'react'
import { Link} from 'react-router-dom'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <ul className='flex'>
        {[...Array(pages).keys()].map((x) => (
          <li
            key={x + 1}
            className='mx-2'
          >
            <Link to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }><span className={`px-4 py-2 bg-black text-white`}>{x+1}</span></Link>
          </li>
        ))}
      </ul>
    )
  )
}

export default Paginate
