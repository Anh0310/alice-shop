import {
  Box,
  Hidden,
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
import { nanoid } from 'nanoid'
import React, { useEffect } from 'react'
import { BiMinus, BiPlus, BiRightArrowAlt, BiX } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import bgCart from '../../assets/images/cart.svg'
import { payment, updateUser } from '../../redux/slices/authSlice'
import { addOrder } from '../../redux/slices/orderSlice'
import CustomerLayout from './CustomerLayout'
import Title from './Title'
import Button from './Button'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  notFound: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    zIndex: 999,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  listEmpty: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    zIndex: 999,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 80,
    padding: '100px 90px',

    [theme.breakpoints.down('md')]: {
      padding: '100px 60px',
    },

    [theme.breakpoints.down('sm')]: {
      padding: '100px 40px',
    },
  },
  list: {
    position: 'relative',
    width: '100%',
    zIndex: 999,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 80,
    padding: '100px 90px',

    [theme.breakpoints.down('md')]: {
      padding: '100px 60px',
    },

    [theme.breakpoints.down('sm')]: {
      padding: '100px 40px',
    },
  },
  headingCart: {
    fontSize: 32,
    fontWeight: 600,
    marginBottom: 80,
  },
  tableHead: {
    fontSize: 15,
    fontWeight: 500,
    backgroundColor: '#f7f7f7',
  },
  imgContainer: {
    width: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '70%',
    objectFit: 'cover',
  },
  cellProduct: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgProduct: {
    width: 100,
    height: 100,
    marginRight: 20,

    [theme.breakpoints.down('md')]: {
      width: 80,
      height: 80,
    },
  },
  content: {
    width: '50%',

    [theme.breakpoints.down('md')]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  link: {
    fontSize: 30,
    color: theme.palette.text.disabled,
    display: 'flex',
    alignItems: 'center',

    '&:last-of-type': {
      marginBottom: 20,
    },
  },
  action: {
    marginTop: '12px',
  },
  redirectIcon: {
    fontSize: 22,
    marginLeft: 5,
  },
  quantity: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    border: '1px solid #ddd',
  },
  proceed: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  continue: {
    border: `1px solid ${theme.palette.text.primary}`,
    color: theme.palette.text.primary,
    background: 'transparent',
  },
  checkout: {
    display: 'flex',
    alignItems: 'center',
  },
  inStock: {
    fontSize: 14,
    position: 'absolute',
    bottom: 15,
    left: '50%',
    transform: 'translateX(-50%)',
    // paddingTop: 10,
  },
  tableRow: {
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    color: theme.palette.text.primary,
  },
}))

const KEY = process.env.REACT_APP_STRIPE_KEY

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const Cart = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleIncreaseQuantity = (product) => {
    const thisProductInCart = user.cart.find((productInCart) => {
      return productInCart.product.id === product._id
    })
    const newProduct = {
      ...thisProductInCart,
      quantity: thisProductInCart.quantity + 1,
    }

    const filteredProducts = user.cart.filter((productInCart) => {
      return (
        productInCart.product.id !== product._id ||
        (productInCart.product.id === product._id &&
          productInCart.chooseSize !== product.chooseSize)
      )
    })

    const action = updateUser({
      _id: user._id,
      cart: [...filteredProducts, newProduct],
    })
    dispatch(action)
  }

  const handleDecreaseQuantity = (product) => {
    if (product.quantity - 1 === 0) {
      const filteredProducts = user.cart.filter((productInCart) => {
        return (
          productInCart.product.id !== product._id ||
          (productInCart.product.id === product._id &&
            productInCart.chooseSize !== product.chooseSize)
        )
      })

      const action = updateUser({
        _id: user._id,
        cart: filteredProducts,
      })
      dispatch(action)
    } else {
      const thisProductInCart = user.cart.find((productInCart) => {
        return productInCart.product.id === product._id
      })

      const newProduct = {
        ...thisProductInCart,
        quantity: thisProductInCart.quantity - 1,
      }

      const filteredProducts = user.cart.filter((productInCart) => {
        return (
          productInCart.product.id !== product._id ||
          (productInCart.product.id === product._id &&
            productInCart.chooseSize !== product.chooseSize)
        )
      })

      const action = updateUser({
        _id: user._id,
        cart: [...filteredProducts, newProduct],
      })
      dispatch(action)
    }
  }

  const handleDeleteProduct = (product) => {
    const filteredProducts = user.cart.filter((productInCart) => {
      return (
        productInCart.product._id !== product.product._id ||
        (productInCart.chooseSize._id !== product.chooseSize._id &&
          productInCart.product._id === product.product._id)
      )
    })

    const action = updateUser({
      _id: user._id,
      cart: filteredProducts,
    })
    dispatch(action)
  }

  const total = user?.cart?.reduce((sum, price) => {
    return sum + price.product.price * price.quantity
  }, 0)

  const onToken = (token) => {
    const action = payment({
      tokenId: token.id,
      amount: total,
    })
    dispatch(action)
      .then(unwrapResult)
      .then((res) => {
        const action = addOrder({
          userId: user._id,
          orderItems: user.cart,
          paymentMethod: 'Card',
          totalPrice: total,
          address: token.card.name,
        })
        dispatch(action)
        const action2 = updateUser({
          _id: user._id,
          cart: [],
        })
        dispatch(action2)
          .then(unwrapResult)
          .then((res) => {
            history.push('/order')
          })
      })
      .catch((error) => console.log(error))
  }

  return (
    <CustomerLayout>
      {user?.cart?.length > 0 ? (
        <Box className={classes.list}>
          <Title>Shopping Cart</Title>
          <TableContainer
            component={Paper}
            elevation={0}
            style={{ marginBottom: 25 }}
          >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>Product</TableCell>
                  <TableCell align="center" className={classes.tableHead}>
                    Size
                  </TableCell>
                  <TableCell align="center" className={classes.tableHead}>
                    Price
                  </TableCell>
                  <TableCell align="center" className={classes.tableHead}>
                    Quantity
                  </TableCell>
                  <TableCell align="center" className={classes.tableHead}>
                    Total
                  </TableCell>
                  <TableCell align="center" className={classes.tableHead}>
                    Remove
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.cart.map((product) => (
                  <TableRow key={nanoid()} className={classes.tableROw}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.cellProduct}
                      style={{ justifyContent: 'flex-start' }}
                    >
                      <img
                        src={product.product.images[0].preview}
                        alt="product"
                        className={classes.imgProduct}
                      />
                      <Typography component="span">
                        {product.product.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {product.chooseSize.name}
                    </TableCell>
                    <TableCell align="center">
                      {formatter.format(+product.product.price)}
                    </TableCell>
                    <TableCell align="center">
                      <Box className={classes.quantity}>
                        <BiMinus
                          onClick={() => handleDecreaseQuantity(product)}
                          style={{ cursor: 'pointer' }}
                        />
                        <Typography component="span">
                          {product.quantity}
                        </Typography>
                        <BiPlus
                          onClick={() => handleIncreaseQuantity(product)}
                          style={{
                            cursor: 'pointer',
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {formatter.format(
                        +product.quantity * +product.product.price,
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <BiX
                        onClick={() => handleDeleteProduct(product)}
                        style={{ cursor: 'pointer', fontSize: 20 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className={classes.proceed}>
            <Button component={Link} to="/" className={classes.continue}>
              Continue shopping
            </Button>
            <Box className={classes.checkout}>
              <Typography variant="h5" style={{ marginRight: 16 }}>
                Total: {formatter.format(+total)}
              </Typography>

              <StripeCheckout
                token={onToken}
                stripeKey={KEY}
                name="Alice shop"
                amount={total * 100} // cents
                currency="USD"
                email={user?.email}
                shippingAddress
                billingAddress
              >
                <Button>Checkout</Button>
              </StripeCheckout>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className={classes.notFound}>
          <Hidden mdDown implementation="js">
            <Box className={classes.imgContainer}>
              <img src={bgCart} alt="not-found" className={classes.img} />
            </Box>
          </Hidden>
          <Box className={classes.content}>
            <Typography className={classes.heading} component="h2">
              You have no products in cart
            </Typography>
            <Button component={Link} to="/shop" className={classes.action}>
              Go shop
              <BiRightArrowAlt className={classes.redirectIcon} />
            </Button>
          </Box>
        </Box>
      )}
    </CustomerLayout>
  )
}

export default Cart
