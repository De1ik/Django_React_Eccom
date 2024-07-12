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
import ProfilePage from './pages/ProfilePage'
import ResetPass from './pages/ResetPass'
import ResetPassConf from './pages/ResetPassConf'
import EmailActivate from './pages/EmailActivate'
import LoginRoute from './components/LoginRoute'
import NoAuthRoute from './components/NoAuthRoute'
import ShippingPage from './pages/ShippingPage'
import PayMethodPage from './pages/PayMethodPage'
import CheckoutPage from './pages/CheckoutPage'
import AllOrders from './pages/AllOrders'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Header/>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomePage/>} exact />
            <Route path="/product/:id" element={<ProductPage/>} />
            <Route path="/cart/:id?" element={<CartPage/>} />

            <Route path="/shipping" element={<ShippingPage/>} />
            <Route path="/pay-method" element={<PayMethodPage/>} />
            <Route path="/checkout" element={<CheckoutPage/>} />

            <Route path="/login" element={<LoginPage/>} />
            <Route path="/registrate" element={<RegistratePage/>} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* <Route element={<NoAuthRoute />}>
              <Route path="/login" element={<LoginPage/>} />
            </Route>


            <Route element={<NoAuthRoute />}>
              <Route path="/registrate" element={<RegistratePage/>} />
            </Route>

            <Route element={<LoginRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route> */}

            <Route path="/orders" element={<AllOrders />} />

            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPassConf/>} />
            <Route path="/password/reset" element={<ResetPass/>} exact />
            <Route path="/activate/:uid/:token" element={<EmailActivate/>} />
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
    </>
  )
}

export default App
