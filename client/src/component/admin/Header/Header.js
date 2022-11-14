import { Box } from '@material-ui/core'
import React from 'react'
import { useStyles } from './styles'
import logo from '../../../assets/images/logo.svg'

const Header = () => {
  const classes = useStyles()
  return (
    <Box className={classes.topbar}>
      <Box className={classes.topbarWrapper}>
        <Box className={classes.topLeft}>
          <img src={logo} alt="logo" className={classes.logo} />
        </Box>
      </Box>
    </Box>
  )
}

export default Header
