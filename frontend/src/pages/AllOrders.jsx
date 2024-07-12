import React from 'react'
import { Row, Col, Button, Card, ListGroup, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createOrder } from '../slices/orderSlice'
import Message from '../components/Message'
import { useState } from 'react'

function AllOrders() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allOrders = useSelector((state) => state.orderRed.allOrders)
    // const name = 



  return (
    <div>
        All orders
    </div>
  )
}

export default AllOrders
