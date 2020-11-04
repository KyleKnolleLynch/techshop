import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import Meta from '../components/Meta'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  //  verify shipping address exists
  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeOrder')
  }

  return (
    <>
      <Meta title='Tech Shop | Payment' />
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Choose Payment Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='PayPal'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked={paymentMethod === 'PayPal' ? true : false}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
            <Col>
              <Form.Check
                type='radio'
                label='Credit Card'
                id='CreditCart'
                name='paymentMethod'
                value='CreditCard'
                checked={paymentMethod === 'CreditCard' ? true : false}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type='submit' variant='light'>
            <strong>Continue</strong>
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen
