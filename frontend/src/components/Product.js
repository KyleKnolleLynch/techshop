import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.img} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.title}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <div className='my-2'>
            <p>{product.category}</p>
            <p>Manufacturer: {product.manufacturer}</p>
            <p>Details: {product.info}</p>
            <p>{product.coolingSolution}</p>
          </div>
        </Card.Text>
        <Card.Text as='div'>
          <Rating value={product.rating} text={`${product.reviews} reviews`} />
        </Card.Text>
        <Card.Text as='h3' className='py-3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
