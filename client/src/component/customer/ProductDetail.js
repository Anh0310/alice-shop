import { css } from '@emotion/react'
import { Box, Divider, Typography } from '@material-ui/core'
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { useParams } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { updateUser } from '../../redux/slices/authSlice'
import { getProduct } from '../../redux/slices/productSlice'
import CustomerLayout from './CustomerLayout'
import Button from './Button'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  detail: {
    position: 'relative',
    width: '100%',
    zIndex: 999,
    overflow: 'hidden',
    display: 'flex',
    gap: 60,
    padding: 40,

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  imgContainer: {
    flex: 1,

    '& .carousel .slide img': {
      height: 'auto',
      objectFit: 'cover',
    },

    '& .carousel .thumb': {
      border: '3px solid transparent',
    },

    '& .carousel .thumb.selected': {
      border: '3px solid red',
    },

    '& .carousel .thumbs-wrapper': {
      marginTop: 20,
      marginLeft: 0
    },
  },
  content: {
    flex: 1,
  },
  heading: {
    fontSize: 36,
  },
  price: {
    fontSize: 36,
    fontWeight: 700,
    display: 'block',
    marginBottom: 10,
  },
  desc: {
    lineHeight: 1.6,
    marginBottom: 20,
  },
  sizeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  size: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    border: '1px solid #e1e1e1',
    marginRight: 10,
    cursor: 'pointer',
    transition: '0.3s',

    '&:hover': {
      border: '1px solid #F8B9D4',
      backgroundColor: '#F8B9D4',
      color: '#fff',
    },
  },
  sizeDisabled: {
    padding: 10,
    borderRadius: '50%',
    border: '1px solid #e1e1e1',
    marginRight: 10,
    transition: '0.3s',
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  activeSize: {
    backgroundColor: '#F8B9D4',
    color: '#fff',
    border: '1px solid #F8B9D4',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  quantity: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    border: '1px solid #ddd',
    width: 100,
  },
  add: {
    marginLeft: 20,
    padding: '10px 30px',
    minWidth: 155,
    borderRadius: 10,
    backgroundColor: '#BD1877',
    color: '#fff',

    '&:hover': {
      backgroundColor: '#a8136a',
      color: '#fff',
    },
  },
  addDisabled: {
    marginLeft: 20,
    padding: '10px 30px',
    minWidth: 155,
    borderRadius: 10,
    backgroundColor: '#BD1877',
    color: '#fff',
    opacity: 0.5,
    cursor: 'not-allowed',
    '&:hover': {
      backgroundColor: '#a8136a',
      color: '#fff',
    },
  },
  loadingContainer: {
    height: 'calc(100vh - 140px)',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: theme.palette.text.secondary,
    borderRadius: 15,
    fontSize: 40,
  },
}))

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const override = css`
  display: block;
  margin: 0 auto;
`

const ProductDetail = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { id } = useParams()
  const user = useSelector((state) => state.auth.user)
  const product = useSelector((state) => state.product.product)
  const productLoading = useSelector((state) => state.product.productLoading)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!id) return
    const fetchProduct = () => {
      const action = getProduct(id.toString())
      dispatch(action)
    }
    fetchProduct()
  }, [dispatch, id])

  const [quantity, setQuantity] = useState(1)
  const handleIncreaseQuantity = () => {
    if (!product.inStock) return

    if (quantity > product.quantity) return
    else setQuantity(quantity + 1)
  }

  const handleDecreaseQuantity = () => {
    if (!product.inStock) return

    if (quantity <= 1) return
    else setQuantity(quantity - 1)
  }

  const [indexSize, setIndexSize] = useState()
  const [size, setSize] = useState()
  const handleChangeSize = (index, size) => {
    if (!product.inStock) return
    setIndexSize(index)
    setSize(size)
  }

  const handleAddToCart = () => {
    // Sold out
    if (!product.inStock) return

    // Empty size
    if (indexSize === undefined) {
      toast('Please choose your size', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: 'error',
      })
      return
    }

    // Unauthenticated
    if (!user || Object.keys(user).length === 0) {
      toast('Please login to continue', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: 'error',
      })
      return
    }

    const existedProduct = user?.cart.find((productInCart) => {
      return (
        productInCart.product._id === product._id &&
        productInCart.chooseSize._id === size._id
      )
    })

    if (existedProduct) {
      const newProduct = {
        ...existedProduct,
        quantity: existedProduct.quantity + quantity,
      }

      const newProducts = user.cart.filter((product) => {
        return (
          product.product._id !== existedProduct.product._id ||
          (product?.product?._id === existedProduct?.product?._id &&
            product?.chooseSize?._id !== size?._id)
        )
      })

      const action = updateUser({
        _id: user._id,
        cart: [...newProducts, newProduct],
      })
      dispatch(action)
        .then(unwrapResult)
        .then((res) => {
          toast('Add to cart successfully!', {
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
        .catch((error) => console.log(error))
    } else {
      const productData = { product, quantity, chooseSize: size }
      const action = updateUser({
        _id: user?._id,
        cart: [...user?.cart, productData],
      })
      dispatch(action)
        .then(unwrapResult)
        .then((res) => {
          toast('Add to cart successfully!', {
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
        .catch((error) => console.log(error))
    }
  }

  return (
    <CustomerLayout>
      <Box className={classes.detail}>
        <>
          {!productLoading ? (
            <>
              <Box className={classes.imgContainer}>
                <Carousel
                  showIndicators={false}
                  showArrows={false}
                  showStatus={false}
                >
                  {product?.images?.map((image) => (
                    <Box style={{ position: 'relative' }}>
                      <img src={image.preview} style={{ objectFit: 'contain' }} alt="product" />
                      {!product.inStock && (
                        <Typography component="p" className={classes.watermark}>
                          Sold out
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Carousel>
              </Box>
              <Box className={classes.content}>
                <Typography component="h3" className={classes.heading}>
                  {product.name}
                </Typography>
                <Typography component="subtitle1" className={classes.price}>
                  {formatter.format(+product.price)}
                </Typography>
                <Divider style={{ margin: '16px 0' }} />
                <Typography component="p" className={classes.desc}>
                  {product.desc}
                </Typography>
                <Box className={classes.sizeContainer}>
                  <Typography component="p" style={{ marginRight: 20 }}>
                    Size
                  </Typography>
                  {product?.size?.map((size, index) => (
                    <Box
                      className={`${
                        product.inStock ? classes.size : classes.sizeDisabled
                      }
												${indexSize === index && classes.activeSize}
												`}
                      onClick={() => handleChangeSize(index, size)}
                    >
                      {size.name}
                    </Box>
                  ))}
                </Box>
                <Box className={classes.actions}>
                  <Typography component="p" style={{ marginRight: 20 }}>
                    Quantity
                  </Typography>
                  <Box className={classes.quantity}>
                    <BiMinus
                      style={{ cursor: 'pointer' }}
                      onClick={handleDecreaseQuantity}
                    />
                    <Typography
                      component="p"
                      style={{
                        userSelect: 'none',
                      }}
                    >
                      {quantity}
                    </Typography>
                    <BiPlus
                      style={{ cursor: 'pointer' }}
                      onClick={handleIncreaseQuantity}
                    />
                  </Box>
                  <Button
                    style={{ marginLeft: 20 }}
                    disableRipple={!product.inStock && true}
                    disabled={!product.inStock}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <Box className={classes.loadingContainer}>
              <RingLoader css={override} size={140} />
            </Box>
          )}
        </>
      </Box>
    </CustomerLayout>
  )
}

export default ProductDetail
