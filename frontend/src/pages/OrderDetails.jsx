import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Col, Row, Image, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../slices/productByIdSlice';

import { addToCart } from '../slices/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';

function OrderDetails() {
    const { id } = useParams();
  return (
    <div>
      <h1>{id}</h1>
    </div>
  )
}

export default OrderDetails
