import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import Footer from './components/mainComponents/Footer'
import Header from './components/mainComponents/Header'




// Main Pages
import HomePage from './pages/MainPages/HomePage';
import CartPage from './pages/MainPages/CartPage';
import ProductPage from './pages/MainPages/ProductPage';
import ProfilePage from './pages/MainPages/ProfilePage';

// Auth
import EmailActivate from './pages/Auth/EmailActivate';
import LoginPage from './pages/Auth/LoginPage';
import RegistratePage from './pages/Auth/RegistratePage';
import ResetPass from './pages/Auth/ResetPass';
import ResetPassConf from './pages/Auth/ResetPassConf';

// Shipping
import CheckoutPage from './pages/Shipping/CheckoutPage';
import PayMethodPage from './pages/Shipping/PayMethodPage';
import ShippingPage from './pages/Shipping/ShippingPage';

// Orders
import AllOrders from './pages/Orders/AllOrders';
import OrderDetails from './pages/Orders/OrderDetails';

// Admin
import AdminAllProducts from './pages/Admin/Products/AdminAllProducts';
import AdminCreateProduct from './pages/Admin/Products/AdminCreateProduct';
import AdminEditProduct from './pages/Admin/Products/AdminEditProduct';
import AllUsers from './pages/Admin/Users/AllUsers';
import AdminUserEdit from './pages/Admin/Users/AdminUserEdit';
import AdminAllOrders from './pages/Admin/Orders/AdminAllOrders';
import AdminOrderEdit from './pages/Admin/Orders/AdminOrderEdit';


function App() {

  return (
    <>
    <Router>
      <Header/>
      <main>
        <Container style={{maxWidth: "80%"}}>
          <Routes>
            <Route path="/" element={<HomePage/>} exact />
            <Route path="/products" element={<HomePage/>} />
            <Route path="/product/:id" element={<ProductPage/>} />
            <Route path="/cart/:id?" element={<CartPage/>} />

            <Route path="/shipping" element={<ShippingPage/>} />
            <Route path="/pay-method" element={<PayMethodPage/>} />
            <Route path="/checkout" element={<CheckoutPage/>} />


            <Route path="/login" element={<LoginPage/>} />
            <Route path="/login/redirect-auth-required" element={<LoginPage/>} />
            <Route path="/registrate" element={<RegistratePage/>} />
            <Route path="/profile" element={<ProfilePage />} />


            <Route path="/admin/users" element={<AllUsers />} />
            <Route path="/admin/user/:id/edit" element={<AdminUserEdit />} />
            <Route path="/admin/orders" element={<AdminAllOrders />} />
            <Route path="/admin/order/:id/edit" element={<AdminOrderEdit />} />
            <Route path="/admin/products" element={<AdminAllProducts />} />
            <Route path="/admin/create-product" element={<AdminCreateProduct />} />
            <Route path="/admin/product/:id/edit" element={<AdminEditProduct />} />

            {/* <Route element={<NoAuthRoute />}>
              <Route path="/login" element={<LoginPage/>} />
            </Route>


            <Route element={<NoAuthRoute />}>
              <Route path="/registrate" element={<RegistratePage/>} />
            </Route>

            <Route element={<LoginRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route> */}

            <Route path="/all-orders" element={<AllOrders />} />
            <Route path="/order/:id" element={<OrderDetails/>} />

            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPassConf/>} />
            <Route path="/password/reset" element={<ResetPass/>} exact />
            <Route path="/activate/:uid/:token" element={<EmailActivate/>} />
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
    <ToastContainer />
    </>
  )
}

export default App
