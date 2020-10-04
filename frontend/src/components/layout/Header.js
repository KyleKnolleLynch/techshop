import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>Tech Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='/cart'>
                <i className='las la-shopping-cart la-lg mr-1'></i>Cart
              </Nav.Link>
              <Nav.Link href='/login'>
                <i className='las la-user-circle la-lg mr-1'></i>Log In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
export default Header
