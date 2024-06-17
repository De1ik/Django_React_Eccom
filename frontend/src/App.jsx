import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <main>
      <Container>
        <h1 className='text-center py-5'>Hello</h1>
      </Container>
    </main>
    <Footer/>
    </>
  )
}

export default App
