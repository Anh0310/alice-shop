import { Box } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { makeStyles } from '@material-ui/styles'
import bgBanner1 from '../../assets/images/hero-1.jpg'
import bgBanner2 from '../../assets/images/hero-2.jpg'
import bgBanner3 from '../../assets/images/hero-3.jpg'

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
    backgroundImage: `url(${bgBanner1})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    padding: '0 120px',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
    },
  },
  slide2: {
    backgroundImage: `url(${bgBanner2})`,
  },
  slide3: {
    backgroundImage: `url(${bgBanner3})`,
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
      <Box className={`${classes.slide}`}></Box>
      <Box className={`${classes.slide} ${classes.slide2}`}></Box>
      <Box className={`${classes.slide} ${classes.slide3}`}></Box>
    </Carousel>
  )
}

export default Banner
