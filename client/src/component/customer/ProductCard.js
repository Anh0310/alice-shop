import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import CartIconImg from '../../assets/images/cart.png'
import HeartIconImg from '../../assets/images/heart.png'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    boxShadow: 'none',
    borderRight: '1px solid black',
    borderBottom: '1px solid black',
    borderRadius: 0,
    padding: 20,
  },
  media: {
    height: 457,
  },
  content: {
    padding: 0,
    paddingTop: 16,
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
  },
  topTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icons: {
    display: 'flex',
    flexShrink: 0,
    alignItems: 'start',
  },
  name: {
    fontSize: 13,
    fontWeight: 400,
    color: '#000',
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    fontWeight: 400,
    fontSize: 14,
  },
}))

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const ProductCard = ({ product }) => {
  const classes = useStyles()
  const history = useHistory()

  const handleNavigate = (id) => {
    history.push(`/product/${id}`)
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.images[0].preview}
        title={product.name}
        onClick={() => handleNavigate(product._id)}
      />
      <CardContent className={classes.content} style={{ paddingBottom: 16 }}>
        <Box
          className={classes.topTitle}
          onClick={() => handleNavigate(product._id)}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.name}
          >
            {product.name}
          </Typography>
          <Box className={classes.icons}>
            <img src={HeartIconImg} alt="heart" width="20px" />
            <img src={CartIconImg} alt="cart" width="20px" style={{ marginLeft: 4 }} />
          </Box>
        </Box>
        <Box
          className={classes.price}
          onClick={() => handleNavigate(product._id)}
        >
          {formatter.format(+product.price)} USD
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductCard
