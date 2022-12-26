import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrder } from '../../../redux/slices/orderSlice'
import CustomerLayout from '../CustomerLayout/CustomerLayout'
import Title from '../Title/Title'
import { useStyles } from './styles'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const Order = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!user?._id) return

    const fetchOrder = () => {
      const action = getAllOrder({ userId: user._id })
      dispatch(action)
        .then(unwrapResult)
        .then((res) => {
          setOrders(res.orders)
        })
    }
    fetchOrder()
  }, [dispatch, user?._id])

  return (
    <CustomerLayout>
      <Box className={classes.profile}>
        <Title>Order details</Title>
        <TableContainer
          component={Paper}
          elevation="0"
          style={{ marginBottom: 25 }}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.tableHead}>
                  Order ID
                </TableCell>
                <TableCell align="center" className={classes.tableHead}>
                  Created Date
                </TableCell>
                <TableCell align="center" className={classes.tableHead}>
                  Delivery Price
                </TableCell>
                <TableCell align="center" className={classes.tableHead}>
                  Delivery Status
                </TableCell>
                <TableCell align="center" className={classes.tableHead}>
                  Payment method
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 &&
                orders.map((order) => (
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.cellProduct}
                      align="center"
                    >
                      <Typography component="body2">{order._id}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      {new Date(order.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      {formatter.format(+order.totalPrice)}
                    </TableCell>
                    <TableCell align="center">{order.status}</TableCell>
                    <TableCell align="center">
                      {order.paymentMethod.toString()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </CustomerLayout>
  )
}

export default Order
