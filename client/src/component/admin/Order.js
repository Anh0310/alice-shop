import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core'
import TablePagination from '@material-ui/core/TablePagination'
import React, { useEffect, useState } from 'react'
import { BiPencil, BiSearchAlt2 } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from './AdminLayout'
import { getAllOrder, setPage } from '../../redux/slices/orderSlice'
import EditOrder from './EditOrder'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  home: {
    position: 'relative',
    // marginTop: 80,
    marginLeft: 300,
    padding: 40,
    backgroundColor: '#f5f6fa',
  },
  tableHead: {
    fontSize: 15,
    fontWeight: 500,
    backgroundColor: '#b7b7b7',
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
  add: {
    height: 56,
    width: 120,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    borderRadius: 0,
    marginLeft: 40,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.secondary,
    },
  },
}))

const Order = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.order.orders)
  const limit = useSelector((state) => state.order.limit)
  const currentPage = useSelector((state) => state.order.currentPage)
  const totalItems = useSelector((state) => state.order.totalItems)

  useEffect(() => {
    const fetchOrders = () => {
      const action = getAllOrder({ currentPage: 0 })
      dispatch(action)
    }
    fetchOrders()
  }, [dispatch])

  const [keyword, setKeyword] = useState('')
  const handleChangeSearch = () => {
    dispatch(getAllOrder({ currentPage: 0, limit, keyword }))
  }

  const [editedOrder, setEditedOrder] = useState()
  const [openEditModal, setOpenEditModal] = useState(false)
  const handleOpenEditModal = (order) => {
    setEditedOrder(order)
    setOpenEditModal(true)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleChangePage = (_, newPage) => {
    dispatch(setPage(newPage))
    dispatch(getAllOrder({ currentPage: newPage, limit }))
  }

  return (
    <AdminLayout>
      <Box className={classes.home}>
        <Box className={classes.searchBar}>
          <TextField
            placeholder="Search for status"
            variant="outlined"
            className={classes.searchField}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <IconButton
            className={classes.searchBtn}
            onClick={handleChangeSearch}
          >
            <BiSearchAlt2 />
          </IconButton>
        </Box>
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
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow>
                  <TableCell component="th" scope="row" align="center">
                    <Typography component="span">{order._id}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">${order.totalPrice}</TableCell>
                  <TableCell align="center">
                    {order.status.toString()}
                  </TableCell>
                  <TableCell align="center">
                    <BiPencil
                      style={{
                        cursor: 'pointer',
                        fontSize: 20,
                        marginRight: 20,
                      }}
                      onClick={() => handleOpenEditModal(order)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              <EditOrder
                open={openEditModal}
                handleClose={handleCloseEditModal}
                order={editedOrder}
              />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalItems}
          rowsPerPageOptions={[limit]}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={limit}
        />
      </Box>
    </AdminLayout>
  )
}

export default Order
