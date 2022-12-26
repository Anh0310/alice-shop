import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Box, List, ListItem, ListItemText } from '@material-ui/core'
import logo from '../../assets/images/logo.svg'
import { clearUser } from '../../redux/slices/authSlice'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  BiBox,
  BiCategory,
  BiDetail,
  BiDoughnutChart,
  BiHomeAlt,
  BiLogOut,
  BiUser,
} from 'react-icons/bi'

const useStyles = makeStyles((theme) => ({
  topbar: {
    width: '100%',
    height: 80,
    backgroundColor: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 999,
    borderBottom: '1px solid #ebeef2',
  },
  topbarWrapper: {
    height: '100%',
    padding: '0px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'darkblue',
    cursor: 'pointer',
  },
  topRight: {
    display: 'flex',
    alignItems: 'center',
  },
  topbarIconContainer: {
    position: 'relative',
    cursor: 'pointer',
    marginRight: 10,
    color: '#555',
  },
  topIconBadge: {
    width: 15,
    height: 15,
    position: 'absolute',
    top: -5,
    right: 0,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
  },
  topAvatar: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    cursor: 'pointer',
  },
  sidebar: {
    flex: 1,
    height: 'calc(100vh - 50px)',
    borderRight: '1px solid #ebeef2',
    position: 'fixed',
    top: 80,
    maxWidth: 300,
    width: 300,
    background: '#ffffff',
  },
  sidebarWrapper: {
    padding: '20px 0`',
    color: '#555',
  },
  sidebarMenu: {
    marginBottom: 10,
  },
  sidebarTitle: {
    fontSize: 20,
    paddingLeft: 10,
    color: 'rgb(187, 186, 186)',
  },
  sidebardIcon: {
    marginRight: 20,
  },
  link: {
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: '0.3s',
    color: theme.palette.text.primary,
    borderRadius: 6,

    '&.active > li': {
      backgroundColor: 'rgb(240, 240, 255)',
    },

    '& .MuiListItem-root': {
      transition: '0.3s',
      borderRadius: 6,
      padding: '10px 20px',

      '&:hover': {
        textDecoration: 'none',
        backgroundColor: 'rgb(240, 240, 255)',
        borderRadius: 6,
      },
    },
  },
  sidebarList: {
    padding: 10,
  },
  sidebarListItem: {
    padding: 5,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
  },
  sidebarIcon: {
    marginRight: 5,
    fontSize: '20px !important',
  },
}))

const AdminLayout = ({ children }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    localStorage.clear()
    history.push('/login')
    const action = clearUser()
    dispatch(action)
  }

  return (
    <>
      <Box className={classes.topbar}>
        <Box className={classes.topbarWrapper}>
          <Box className={classes.topLeft}>
            <img src={logo} alt="logo" className={classes.logo} />
          </Box>
        </Box>
      </Box>
      <main style={{ height: '100vh' }}>{children}</main>
      <Box className={classes.sidebar}>
        <Box className={classes.sidebarWrapper}>
          <Box className={classes.sidebarMenu}>
            <List className={classes.sidebarList}>
              <NavLink className={classes.link} to="/admin/home">
                <ListItem disableGutters>
                  <BiHomeAlt className={classes.sidebardIcon} />
                  <ListItemText disableTypography primary={`Home`} />
                </ListItem>
              </NavLink>
              <NavLink className={classes.link} to="/admin/user">
                <ListItem disableGutters>
                  <BiUser className={classes.sidebardIcon} />
                  <ListItemText disableTypography primary={`User`} />
                </ListItem>
              </NavLink>
              <NavLink className={classes.link} to="/admin/product">
                <ListItem disableGutters>
                  <BiBox className={classes.sidebardIcon} />
                  <ListItemText disableTypography primary={`Product`} />
                </ListItem>
              </NavLink>
              <NavLink className={classes.link} to="/admin/order">
                <ListItem disableGutters>
                  <BiDetail className={classes.sidebardIcon} />
                  <ListItemText disableTypography primary={`Order`} />
                </ListItem>
              </NavLink>
              <NavLink className={classes.link} to="/admin/category">
                <ListItem disableGutters>
                  <BiCategory className={classes.sidebardIcon} />
                  <ListItemText disableTypography primary={`Category`} />
                </ListItem>
              </NavLink>
              <NavLink className={classes.link} to="/admin/size">
                <ListItem disableGutters>
                  <BiDoughnutChart className={classes.sidebardIcon} />
                  <ListItemText disableTypography primary={`Size`} />
                </ListItem>
              </NavLink>
              <Box className={classes.link} onClick={handleLogout}>
                <ListItem disableGutters>
                  <BiLogOut className={classes.sidebardIcon} />
                  <ListItemText disableTypography primary={`Log out`} />
                </ListItem>
              </Box>
            </List>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AdminLayout
