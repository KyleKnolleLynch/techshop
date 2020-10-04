import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h2>Welcome to Tech Shop</h2>
        </Container>
      </main>

      <Footer />
    </>
  )
}

export default App
