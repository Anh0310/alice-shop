import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useStyles } from './styles'
import Button from '../Button/Button'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

const Banner = () => {
  const classes = useStyles()
  const history = useHistory()

  const goShop = () => {
    history.push('/shop')
  }

  return (
    <Carousel
      className={classes.banner}
      responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={2000}
      infinite={true}
    >
      <Box className={`${classes.slide} ${classes.slide1}`}>
        <Typography component="h1" className={classes.heading}>
          Live For Fashion
        </Typography>
        <Typography component="h3" className={classes.subHeading}>
          Quality Matters
        </Typography>
        <Button onClick={goShop} className={classes.action}>
          Shop now
        </Button>
      </Box>

      <Box className={`${classes.slide} ${classes.slide2}`}>
        <Typography component="h1" className={classes.heading}>
          Find The Best Outfit
        </Typography>
        <Typography component="h3" className={classes.subHeading}>
          With 30% Off
        </Typography>
        <Button onClick={goShop} className={classes.action}>
          Shop now
        </Button>
      </Box>

      <Box className={`${classes.slide} ${classes.slide3}`}>
        <Typography component="h1" className={classes.heading}>
          Get Your Style
        </Typography>
        <Typography component="h3" className={classes.subHeading}>
          Comfort For Your Long Day
        </Typography>
        <Button onClick={goShop} className={classes.action}>
          Shop now
        </Button>
      </Box>
    </Carousel>
  )
}

export default Banner
