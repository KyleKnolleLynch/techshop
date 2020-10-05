import React from 'react'
import { Col, Row } from 'react-bootstrap'
import productsData from '../productsData'
import Product from '../components/Product'

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {productsData.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
