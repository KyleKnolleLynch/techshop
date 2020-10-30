import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, shipOrder } from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_SHIPPED_RESET,
} from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderShipped = useSelector((state) => state.orderShipped)
  const { loading: loadingShipped, success: successShipped } = orderShipped

  if (!loading) {
    //  Calculate items prices
    const showTwoDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = showTwoDecimals(
      order.orderItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
    )
    order.shippingPrice = showTwoDecimals(order.itemsPrice > 200 ? 0 : 10)
    order.taxPrice = showTwoDecimals(
      Number((0.08 * order.itemsPrice).toFixed(2))
    )
    order.totalPrice = (
      Number(order.itemsPrice) +
      Number(order.shippingPrice) +
      Number(order.taxPrice)
    ).toFixed(2)
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onLoad = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || order._id !== orderId || successPay || successShipped) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_SHIPPED_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, order, orderId, successPay, successShipped])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const shipHandler = () => {
    dispatch(shipOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.curState},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isShipped ? (
                <Message variant='success'>
                  Shipped on {order.shippedAt}
                </Message>
              ) : (
                <Message variant='warning'>Not Shipped</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='warning'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {!order.orderItems ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.title}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total</strong>
                  </Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingShipped && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isShipped && (
                <ListGroup.Item>
                  <Button type='button' variant='light' block onClick={shipHandler}>
                    Mark as shipped
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
