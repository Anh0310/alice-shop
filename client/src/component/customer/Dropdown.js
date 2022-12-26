import {
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import React from 'react'
import { BiChevronLeft } from 'react-icons/bi'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    marginBottom: 6,
  },
  list: {
    width: '40%',
    justifyContent: 'space-around',
  },
  listDropdownLink: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    marginBottom: 20,
  },
  listDropdown: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}))

const Dropdown = ({ open, onDrawerClose }) => {
  const classes = useStyles()

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Box className={classes.drawerHeader}>
        <IconButton onClick={onDrawerClose}>
          <BiChevronLeft />
        </IconButton>
      </Box>
      <Divider />
      <ListItem className={classes.listDropdown}>
        <ListItemText
          disableTypography
          primary="Home"
          className={classes.listDropdownLink}
        />

        <ListItemText
          disableTypography
          primary="Shop"
          className={classes.listDropdownLink}
        />

        <ListItemText
          disableTypography
          primary="Contact us"
          className={classes.listDropdownLink}
        />
        <ListItemText
          disableTypography
          primary="About us"
          className={classes.listDropdownLink}
        />
        <ListItemText
          disableTypography
          primary="Login"
          className={classes.listDropdownLink}
        />
      </ListItem>
    </Drawer>
  )
}

export default Dropdown
