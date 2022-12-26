import { Box, Hidden, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import imgNotFound from '../assets/images/not-found.png'
import CustomerLayout from './customer/CustomerLayout'
import Button from './customer/Button'
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
  imgContainer: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    objectFit: 'cover',
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
  heading: {
    fontSize: 60,
    fontWeight: 600,
    marginBottom: 10,
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
    padding: '11px 30px',
    textTransform: 'capitalize',
    color: 'white',
  },
}))

const NotFound = () => {
  const classes = useStyles()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <CustomerLayout>
      <Box className={classes.notFound}>
        <Hidden mdDown implementation="js">
          <Box className={classes.imgContainer}>
            <img src={imgNotFound} alt="not-found" className={classes.img} />
          </Box>
        </Hidden>
        <Box className={classes.content}>
          <Typography className={classes.heading} component="h2">
            Oh No! Error 404
          </Typography>
          <Typography component="h2" className={classes.link}>
            Maybe Bigfoot has broken this page.
          </Typography>
          <Typography component="h2" className={classes.link}>
            Come back to the homepage
          </Typography>
          <Button component={Link} to="/" className={classes.action}>
            Back to Homepage
          </Button>
        </Box>
      </Box>
    </CustomerLayout>
  )
}

export default NotFound
