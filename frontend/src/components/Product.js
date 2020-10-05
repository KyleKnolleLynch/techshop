import React from 'react'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.img} variant='top' />
      </a>
      <Card.Body>
      <a href={`/product/${product._id}`}>
        <Card.Title as='div'><strong>{product.title}</strong></Card.Title>
      </a>
      <Card.Text as='div'>
        <div className='my-2'>
          <p>{product.category}</p>
          <p>Manufacturer: {product.manufacturer}</p>
          <p>Details: {product.info}</p>
          <p>{product.coolingSolution}</p>
        </div>
      </Card.Text>
      <Card.Text as='div'>
        <div className='my-3'>
          {product.rating} from {product.reviews} reviews
        </div>
      </Card.Text>
      <Card.Text as='h3'>${product.price}</Card.Text>
      
      </Card.Body>
    </Card>
  )
}

export default Product
