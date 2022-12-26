import {
  Box,
  Button,
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
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { BiPencil, BiSearchAlt2, BiX } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminLayout from '../AdminLayout'
import {
  deleteProduct,
  getAllProduct,
  setPage,
} from '../../redux/slices/productSlice'
import useModal from '../../hooks/useModal'
import DeleteModal from '../DeleteModal/DeleteModal'
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
    marginBottom: 40,
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
  productDesc: {
    maxWidth: 200,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  emptyImg: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 24,
  },
  emptyContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const Product = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const products = useSelector((state) => state.product.products)
  const limit = useSelector((state) => state.product.limit)
  const currentPage = useSelector((state) => state.product.currentPage)
  const totalItems = useSelector((state) => state.product.totalItems)

  const { open, handleClose, handleOpen } = useModal()
  const [deletedProductId, setDeletedProductId] = useState('')

  useEffect(() => {
    const fetchProducts = () => {
      const action = getAllProduct({ currentPage: 0 })
      dispatch(action)
    }
    fetchProducts()
  }, [dispatch])

  const [keyword, setKeyword] = useState('')
  const handleChangeSearch = () => {
    dispatch(getAllProduct({ currentPage: 0, limit, keyword }))
  }

  const handleEditProduct = (product) => {
    history.push('/admin/product/' + product._id)
  }

  const handleDeleteProduct = (id) => {
    const action = deleteProduct(id)
    dispatch(action)
      .then(unwrapResult)
      .then(() => {
        handleClose()
        toast('Delete product successfully!', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: 'success',
        })
      })
  }

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage))
    dispatch(getAllProduct({ currentPage: newPage, limit }))
  }

  return (
    <AdminLayout>
      <Box className={classes.home}>
        <Box className={classes.searchBar}>
          <TextField
            placeholder="Search for name"
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
          <Button
            component={Link}
            to="/admin/product/new"
            className={classes.add}
          >
            Add
          </Button>
        </Box>
        {products?.length > 0 ? (
          <>
            <TableContainer
              component={Paper}
              elevation="0"
              style={{ marginBottom: 25 }}
            >
              <Table
                className={classes.table}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.tableHead}>
                      Name
                    </TableCell>
                    <TableCell align="center" className={classes.tableHead}>
                      Description
                    </TableCell>
                    <TableCell align="center" className={classes.tableHead}>
                      Category
                    </TableCell>
                    <TableCell align="center" className={classes.tableHead}>
                      Price
                    </TableCell>
                    <TableCell align="center" className={classes.tableHead}>
                      In stock
                    </TableCell>
                    <TableCell align="center" className={classes.tableHead}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => {
                    return (
                      <TableRow key={product._id}>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.productDesc}
                          align="center"
                        >
                          {product.name}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.productDesc}
                        >
                          {product.desc}
                        </TableCell>
                        <TableCell align="center">
                          {product.category.name}
                        </TableCell>
                        <TableCell align="center">${product.price}</TableCell>
                        <TableCell align="center">
                          {product.inStock.toString() === 'true' ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell align="center">
                          <BiPencil
                            style={{
                              cursor: 'pointer',
                              fontSize: 20,
                              marginRight: 20,
                            }}
                            onClick={() => {
                              handleEditProduct(product)
                            }}
                          />
                          <BiX
                            style={{ cursor: 'pointer', fontSize: 20 }}
                            onClick={() => {
                              setDeletedProductId(product._id)
                              handleOpen()
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={totalItems}
              rowsPerPageOptions={[5]}
              page={currentPage}
              onPageChange={handleChangePage}
              rowsPerPage={5}
            />
          </>
        ) : (
          <Box className={classes.emptyContainer}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
              alt=""
              className={classes.emptyImg}
            />
            <Typography component="p" className={classes.emptyTitle}>
              It's empty in here
            </Typography>
          </Box>
        )}
      </Box>
      <DeleteModal
        open={open}
        handleClose={handleClose}
        handleSubmit={() => handleDeleteProduct(deletedProductId)}
      />
    </AdminLayout>
  )
}

export default Product
