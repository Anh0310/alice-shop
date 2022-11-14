import React, { useEffect } from 'react'
import Banner from '../../../component/customer/Banner/Banner'
import CustomerLayout from '../../../component/customer/CustomerLayout/CustomerLayout'
import ListProduct from '../../../component/customer/ListProduct/ListProduct'
import { getAllProduct } from '../../../redux/slices/productSlice'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.products)

  useEffect(() => {
    const fetchProducts = () => {
      const params = 'limit=8'
      const action = getAllProduct(params)
      dispatch(action)
    }

    fetchProducts()
  }, [dispatch])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <CustomerLayout>
      <Banner />
      <ListProduct title="Latest Products" products={products} />
    </CustomerLayout>
  )
}

export default Home
