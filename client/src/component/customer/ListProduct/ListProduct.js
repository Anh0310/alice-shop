import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Button from '../Button/Button'
import ProductCard from '../ProductCard/ProductCard'
import Title from '../Title/Title'
import { useStyles } from './styles'

const LatestProducts = ({ products, hiddenShowMore, title }) => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.list}
      >
        {title && <Title>{title}</Title>}
        <Grid item container className={classes.grid}>
          {products?.map((product) => (
            <Grid
              key={product._id}
              item
              xl={3}
              lg={4}
              md={6}
              sm={12}
              className={classes.gridItem}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      {!hiddenShowMore && (
        <Box className={classes.viewMore}>
          <Button onClick={() => history.push('/shop')}>View more</Button>
        </Box>
      )}
    </>
  )
}

export default LatestProducts
