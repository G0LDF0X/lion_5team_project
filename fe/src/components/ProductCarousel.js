import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
// import {listTopProducts} from '../actions/productActions'
import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'
import Loading from './Loading'
import Message from './Message'
import { listProducts } from '../actions/productActions'


function ProductCarousel() {
    const dispatch = useDispatch()
    // const productTopRated = useSelector(state => state.productTopRated)
    // const {loading, error, products} = productTopRated

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(listProducts())
    }
    , [dispatch])

  return (
    loading ? <Loading /> : error ? <Message variant='danger'>{error}</Message> : (
      <Carousel pause='hover' className='bg-dark'>
              <Carousel.Caption className='carousel-caption'>
                <h4>오늘의 특가</h4>
              </Carousel.Caption>
        {products.map(product => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>

  ))
}

export default ProductCarousel
