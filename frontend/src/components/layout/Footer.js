import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  const [date, setDate] = useState('')

  useEffect(() => {
    const now = new Date().getFullYear()
    setDate(now)
  }, [date])

  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>Copyright &copy; {date} Tech Shop -Project by Kyle Lynch</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
