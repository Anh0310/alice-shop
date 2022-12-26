import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useStyles } from './styles'
import CartIconImg from '../../../assets/images/cart.png'
import HeartIconImg from '../../../assets/images/heart.png'

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
