import { css } from '@emotion/react'
import { Box, Grid, MenuItem, TextField, Typography } from '@material-ui/core'
import TablePagination from '@material-ui/core/TablePagination'
import { unwrapResult } from '@reduxjs/toolkit'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'
import { getAllCategory } from '../../../redux/slices/categorySlice'
import { getAllProduct, setPage } from '../../../redux/slices/productSlice'
import CustomerLayout from '../CustomerLayout/CustomerLayout'
import { useStyles } from './styles'
import Title from '../Title/Title'
import ListProduct from '../ListProduct/ListProduct'

const override = css`
  display: block;
  margin: 0 auto;
`

const Shop = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const products = useSelector((state) => state.product.products)
  const productsLoading = useSelector((state) => state.product.productsLoading)
  const limit = useSelector((state) => state.product.limit)
  const currentPage = useSelector((state) => state.product.currentPage)
  const totalItems = useSelector((state) => state.product.totalItems)
  const categories = useSelector((state) => state.category.categories)

  const categoryId = searchParams.get('category') || ''
  const selectedCategory = categories?.find((cat) => cat._id === categoryId)

  useEffect(() => {
    const fetchCategories = () => {
      const action = getAllCategory()
      dispatch(action)
    }
    fetchCategories()
  }, [dispatch])

  const searchKeyword = searchParams.get('search')

  // Pagination
  const [filter, setFilter] = useState({
    search: searchKeyword || null,
    count: totalItems,
    order: searchParams.get('order') || null,
    sortBy: searchParams.get('sortBy') || null,
    category: searchParams.get('category') || null,
    page: parseInt(searchParams.get('page')) || 1,
    limit: limit || 12,
  })

  const handleChangePage = (_, newPage) => {
    dispatch(setPage(newPage))
    dispatch(getAllProduct({ currentPage: newPage, limit }))

    const newFilter = {
      ...filter,
      page: newPage + 1,
    }
    setFilter(newFilter)

    delete newFilter.count
    delete newFilter.limit

    if (!newFilter.category) {
      delete newFilter.category
    }
    if (!newFilter.order) {
      delete newFilter.order
    }
    if (!newFilter.page) {
      delete newFilter.page
    }
    if (!newFilter.search) {
      delete newFilter.search
    }
    if (!newFilter.sortBy) {
      delete newFilter.sortBy
    }
    history.push(`/shop?${new URLSearchParams(newFilter)}`)
  }

  const handleChangePrice = (e) => {
    setFilter({
      ...filter,
      order: e.target.value,
      sortBy: 'price',
      page: 1,
    })
    if (filter.category) {
      history.push({
        pathname: '/shop',
        search: `?${queryString.stringify({
          limit: filter.limit,
          page: filter.page,
          category: filter.category,
          order: e.target.value,
          search: searchKeyword,
          sortBy: 'price',
        })}`,
      })
    } else {
      history.push({
        pathname: '/shop',
        search: `?${queryString.stringify({
          limit: filter.limit,
          page: filter.page,
          order: e.target.value,
          search: searchKeyword,
          sortBy: 'price',
        })}`,
      })
    }
  }

  useEffect(() => {
    const fetchProducts = () => {
      const params = queryString.stringify({
        limit: filter.limit,
        currentPage: filter.page - 1,
        category: filter.category,
        order: filter.order,
        sortBy: filter.sortBy,
        keyword: searchKeyword || null,
      })
      const action = getAllProduct(params)
      dispatch(action)
        .then(unwrapResult)
        .then((res) => {
          setFilter((prev) => ({
            ...prev,
            count: res.totalItems,
            page: res.currentPage + 1,
          }))
        })
    }

    fetchProducts()
  }, [
    filter.page,
    dispatch,
    filter.limit,
    filter.category,
    filter.order,
    filter.sortBy,
    searchKeyword,
  ])

  useEffect(() => {
    if (searchKeyword) {
      if (searchKeyword !== filter.search) {
        setFilter((prev) => ({
          ...prev,
          category: null,
          order: null,
          sortBy: null,
          search: searchKeyword,
        }))
      }
    }
  }, [searchKeyword, filter.search])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [filter.page])

  return (
    <CustomerLayout>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.shop}
      >
        {products.length > 0 && (
          <Box className={classes.filter}>
            <Title style={{ marginBottom: 0 }}>
              {selectedCategory?.name ? selectedCategory?.name : 'All Products'}
            </Title>
            <Box className={classes.select}>
              <Typography component="p" className={classes.selectHeading}>
                Sort by:
              </Typography>
              <TextField
                id="select"
                select
                variant="outlined"
                className={classes.textField}
                onChange={handleChangePrice}
                InputLabelProps={{ shrink: false }}
                value={filter.order}
              >
                <MenuItem value="desc">Price: High to Low</MenuItem>
                <MenuItem value="asc">Price: Low to High</MenuItem>
              </TextField>
            </Box>
          </Box>
        )}

        {!productsLoading ? (
          <>
            {products.length > 0 ? (
              <ListProduct products={products} hiddenShowMore />
            ) : (
              <Typography component="p" className={classes.empty}>
                No products found
              </Typography>
            )}
            {filter.count > 1 && (
              <TablePagination
                component="div"
                className={classes.pagition}
                count={totalItems}
                rowsPerPageOptions={[limit]}
                rowsPerPage={limit}
                page={currentPage}
                onPageChange={handleChangePage}
              />
            )}
          </>
        ) : (
          <Box className={classes.loadingContainer}>
            <RingLoader css={override} size={140} />
          </Box>
        )}
      </Grid>
    </CustomerLayout>
  )
}

export default Shop
