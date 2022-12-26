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
import { getAllOrder } from '../../redux/slices/orderSlice'
import CustomerLayout from './CustomerLayout'
import Title from './Title'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  profile: {
    position: 'relative',
    width: '100%',
    zIndex: 999,
    overflow: 'hidden',
    padding: 40,
    marginTop: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    marginRight: 20,
    border: '1px solid #e1e1e1',
  },
  email: {
    color: theme.palette.text.disabled,
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 700,
    padding: 30,
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 40,
    marginBottom: 40,
    width: '100%',
  },
  input: {
    flex: 1,

    '&::placeholder': {},

    '& .MuiFormLabel-root': {
      color: theme.palette.text.primary,
    },
  },
  sex: {
    flex: 1,
    '& .MuiFormGroup-root': {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  tableHead: {
    fontSize: 15,
    fontWeight: 500,
    backgroundColor: '#f7f7f7',
  },
  cellProduct: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    marginBottom: 20,
  },
  searchBar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchField: {
    flex: 1,

    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderRadius: '0',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderRadius: '0',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderRadius: '0',
    },
  },
  searchBtn: {
    height: 56,
    width: 100,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    borderRadius: 0,

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.secondary,
    },
  },
}))

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
