import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegistratePage from './pages/RegistratePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Header/>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/product/:id" element={<ProductPage/>} />
            <Route path="/cart/:id?" element={<CartPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/registrate" element={<RegistratePage/>} />
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
    </>
  )
}

export default App
