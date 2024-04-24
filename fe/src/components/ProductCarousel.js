import React, {useEffect} from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import {listTopProducts} from '../actions/productActions'
import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'
import Loading from './Loading'
import Message from './Message'


function ProductCarousel() {
    // const dispatch = useDispatch()
    // const productTopRated = useSelector(state => state.productTopRated)
    // const {loading, error, products} = productTopRated

    // useEffect(() => {
    //     dispatch(listTopProducts())
    // }
    // , [dispatch])

  return (
    // loading ? <Loading /> : error ? <Message variant='danger'>{error}</Message> : (
      <Carousel pause='hover' className='bg-dark'>
        <Carousel.Item>
          <Link to='/product/1'>
            <Image src='https://res.cloudinary.com/dk2ot4z6d/image/upload/v1633663664/petpals/2021-10-08_14.00.00' alt='First slide' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>First slide label</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        
      {/* //   {products.map(product => ( */}
      {/* //     <Carousel.Item key={product._id}>
      //       <Link to={`/product/${product._id}`}>
      //         <Image src={product.image} alt={product.name} fluid />
      //         <Carousel.Caption className='carousel-caption'>
      //           <h4>{product.name} ({product.price})</h4>
      //         </Carousel.Caption>
      //       </Link>
      //     </Carousel.Item>
      //   ))} */}
      </Carousel>

  )
// )
}

export default ProductCarousel
