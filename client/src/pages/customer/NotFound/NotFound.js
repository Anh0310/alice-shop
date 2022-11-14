import { Box, Hidden, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import imgNotFound from '../../../assets/images/not-found.png'
import CustomerLayout from '../../../component/customer/CustomerLayout/CustomerLayout'
import { useStyles } from './styles'
import Button from '../../../component/customer/Button/Button'

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
