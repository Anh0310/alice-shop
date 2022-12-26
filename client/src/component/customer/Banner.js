import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Button from './Button'
import { makeStyles } from '@material-ui/styles'
import bgBanner from '../../assets/images/hero-1.jpg'

const useStyles = makeStyles((theme) => ({
  banner: {
    position: 'relative',
    width: '100%',
    height: `calc(100vh - 90px)`,
    zIndex: 999,
    overflow: 'hidden',

    '& .react-multi-carousel-track': {
      height: `calc(100vh - 90px)`,
    },
  },
  slide: {
    position: 'absolute',
    content: "''",
    width: '100%',
    height: `calc(100vh - 90px)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 999,
    backgroundImage: `url(${bgBanner})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    padding: '0 120px',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
    },
  },
  heading: {
    fontSize: 70,
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {
      fontSize: 38,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 26,
    },
  },
  subHeading: {
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 50,
    [theme.breakpoints.down('md')]: {
      fontSize: 26,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  action: {
    width: 190,
  },
}))

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
