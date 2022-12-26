import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  Divider,
  Menu,
  MenuItem,
} from '@material-ui/core'
import queryString from 'query-string'
import React, { useRef, useState, useEffect } from 'react'
import { BiMenu, BiSearchAlt2 } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import { clearUser } from '../../redux/slices/authSlice'
import { getAllCategory } from '../../redux/slices/categorySlice'
import { getAllProduct } from '../../redux/slices/productSlice'
import Dropdown from './Dropdown'
import useModal from '../../hooks/useModal'
import ChangeNameModal from './ChangeNameModal'
import ChangePassModal from './ChangePassModal'
import { updateUser } from '../../redux/slices/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: 'white',
    height: '95px',
    display: 'flex',
    color: theme.palette.text.primary,
    paddingRight: '0 !important',
  },
  toolbar: {
    minHeight: 50,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 24 * 1.25,
    paddingBottom: 24 * 1.25,
    paddingLeft: 24,
    paddingRight: 24,
  },
  logo: {
    width: '20%',
    minWidth: 180,
    '& > img': {
      width: 100,
      height: 48,
    },
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    [theme.breakpoints.down('md')]: {
      flex: 1,
      marginLeft: 0,
    },
  },
  secondaryActions: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 8,
    paddingTop: 8,
    borderBottom: '1px solid black',
  },
  categories: {
    display: 'flex',
  },
  user: {
    display: 'flex',
  },
  input: {
    width: 240,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 6,
    [theme.breakpoints.down('md')]: {
      flex: 1,
    },
  },
  typo: {
    cursor: 'pointer',
    '& + &': {
      marginLeft: 16,
    },
  },
  signIn: {
    textTransform: 'capitalize',
    borderStyle: 'solid',
    color: '#f1f1f1',
    backgroundColor: theme.palette.primary.main,
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ebebeb',
      color: theme.palette.text.primary,
      boxShadow: '0 5px 5px -2px rgb(0 0 0 / 50%)',
    },
  },
}))

const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const classes = useStyles()
  const user = useSelector((state) => state.auth.user)
  const categories = useSelector((state) => state.category.categories)

  const {
    open: openChangeNameModal,
    handleClose: handleCloseChangeNameModal,
    handleOpen: handleOpenChangeNameModal,
  } = useModal()
  const {
    open: openChangePassModal,
    handleClose: handleCloseChangePassModal,
    handleOpen: handleOpenChangePassModal,
  } = useModal()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleRedirect = () => {
    history.push('/cart')
  }

  const handleLogout = () => {
    localStorage.clear()
    history.push('/login')
    const action = clearUser()
    dispatch(action)
  }

  const handleNavigateOrder = () => {
    history.push('/order')
  }

  const handleLogin = () => {
    history.push('/login')
  }

  const handleGoCategory = (categoryId) => {
    history.push('/shop?category=' + categoryId)
  }

  const searchRef = useRef('')
  const handleChangeSearchTearm = (e) => {
    searchRef.current = e.target.value
  }

  const handleSearch = () => {
    const search = searchRef.current
    if (search === '') return
    const params = queryString.stringify({ search })
    history.push({
      pathname: '/shop',
      search: `${params}`,
    })

    const action = getAllProduct(params)
    dispatch(action)
  }

  const handleUpdateUserName = (name) => {
    const newUser = {
      fullName: name,
      email: user.email,
      isAdmin: user.isAdmin,
      _id: user._id,
    }
    const action = updateUser(newUser)
    dispatch(action)
      .then(unwrapResult)
      .then(() => {
        handleCloseChangeNameModal()
        toast('Update name successfully!', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: 'success',
        })
      })
      .catch((error) => console.log(error))
  }

  const handleUpdateUserPass = (pass) => {
    const newUser = {
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      _id: user._id,
      password: pass,
    }
    const action = updateUser(newUser)
    dispatch(action)
      .then(unwrapResult)
      .then(() => {
        handleCloseChangePassModal()
        toast('Update password successfully!', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: 'success',
        })
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    const fetchCategories = () => {
      const action = getAllCategory()
      dispatch(action)
    }
    fetchCategories()
  }, [dispatch])

  return (
    <>
      <AppBar position="fixed" className={classes.header} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Link to="/" className={classes.logo}>
            <img src={logo} alt="logo" />
          </Link>
          <Box className={classes.actions}>
            <TextField
              className={classes.input}
              variant="standard"
              placeholder="Search here ..."
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ cursor: 'pointer', fontSize: 20 }}
                    onClick={handleSearch}
                  >
                    <BiSearchAlt2 />
                  </InputAdornment>
                ),
              }}
              onChange={handleChangeSearchTearm}
              ref={searchRef}
              defaultValue={searchParams.get('search') || ''}
            />
          </Box>

          <Hidden lgUp>
            <IconButton onClick={handleDrawerOpen}>
              <BiMenu />
            </IconButton>
          </Hidden>
        </Toolbar>
        <Divider style={{ backgroundColor: 'black' }} />
        <Box className={classes.secondaryActions}>
          <Box className={classes.categories}>
            {categories?.map(({ _id, name }) => (
              <Typography
                key={_id}
                onClick={() => handleGoCategory(_id)}
                className={classes.typo}
                color="primary"
              >
                {name}
              </Typography>
            ))}
          </Box>
          <Box className={classes.user}>
            {user && Object.keys(user).length > 0 ? (
              <>
                <Typography
                  onClick={handleRedirect}
                  className={classes.typo}
                  color="secondary"
                >
                  Cart({user?.cart?.length || 0})
                </Typography>

                <Typography
                  onClick={handleClick}
                  className={classes.typo}
                  color="secondary"
                >
                  {user?.fullName}
                </Typography>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleNavigateOrder}>My Order</MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleOpenChangeNameModal()
                      handleClose()
                    }}
                  >
                    Change Name
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleOpenChangePassModal()
                      handleClose()
                    }}
                  >
                    Change Password
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout()
                      handleClose()
                    }}
                  >
                    <Typography color="error">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Hidden mdDown>
                <Typography
                  onClick={handleLogin}
                  className={classes.typo}
                  color="secondary"
                >
                  Login
                </Typography>
              </Hidden>
            )}
          </Box>
        </Box>
      </AppBar>
      <Dropdown open={open} onDrawerClose={handleDrawerClose} />
      <ChangeNameModal
        name={user?.fullName || ''}
        open={openChangeNameModal}
        handleClose={handleCloseChangeNameModal}
        handleSubmit={handleUpdateUserName}
      />
      <ChangePassModal
        open={openChangePassModal}
        handleClose={handleCloseChangePassModal}
        handleSubmit={handleUpdateUserPass}
      />
    </>
  )
}

export default Header
