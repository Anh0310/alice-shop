import CustomerLayout from './customer/CustomerLayout'
import {
  Box,
  Hidden,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import bgLogin from '../assets/images/login.jpg'
import { BiMailSend, BiLockAlt, BiRightArrowAlt } from 'react-icons/bi'
import { Link, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { login } from '../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import Button from './customer/Button'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  login: {
    position: 'relative',
    width: '100%',
    height: 700,
    zIndex: 999,
    overflow: 'hidden',
  },
  img1: {
    position: 'absolute',
    content: "''",
    top: 0,
    left: 0,
    zIndex: -1,
    height: '100%',
    width: '65%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '0 40px',
  },
  img2Container: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img2: {
    width: 500,
  },
  form: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  input: {
    fontSize: 20,
    color: theme.palette.text.disabled,
    padding: 10,
    width: 350,
    '& .MuiInput-root': {
      padding: '10px 0',
    },
    '& .MuiInput-underline:before': {
      borderBottom: '2px solid #e2e8f0',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid #e2e8f0',
    },
  },
  inputIcon: {
    color: theme.palette.text.disabled,
    fontSize: 26,
    marginRight: -10,
  },
  action: {
    width: 350,
    height: 50,
    borderRadius: 25,
    color: 'white',
    transition: '0.5s',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
  },
  redirect: {
    color: theme.palette.text.primary,
    '&:first-of-type': {
      marginBottom: 40,
    },
    '&:last-of-type': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  redirectIcon: {
    fontSize: 22,
    marginLeft: 5,
  },
  error: {
    width: 350,
    color: '#c74a47',
    backgroundColor: '#fbe2e2',
    fontSize: '16px',
    textAlign: 'left',
    padding: '10px 15px',
  },
}))

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
})

const Login = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  })
  const [error, setError] = useState('')

  const handleLogin = (data) => {
    const action = login(data)
    dispatch(action)
      .then(unwrapResult)
      .then((res) => {
        localStorage.setItem('token', res.token)
        if (res.user.isAdmin) history.push('/admin/home')
        else history.push('/')
      })
      .catch((error) => {
        if (error.status === 400) setError(error.data.message)
      })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <CustomerLayout>
      <Box className={classes.login}>
 
        <Box className={classes.container}>
          <Hidden mdDown implementation="js">
            <Box className={classes.img2Container}>
              <img src={bgLogin} alt="login1" className={classes.img2} />
            </Box>
          </Hidden>
          <form className={classes.form} onSubmit={handleSubmit(handleLogin)}>
            <Typography component="h2" className={classes.heading}>
              Member login
            </Typography>
            {error !== '' && (
              <Typography component="p" className={classes.error}>
                {error}
              </Typography>
            )}
            <TextField
              className={classes.input}
              placeholder="Email"
              type="email"
              {...register('email')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BiMailSend className={classes.inputIcon} />
                  </InputAdornment>
                ),
                classes: {
                  input: classes.input,
                },
              }}
            />
            <TextField
              className={classes.input}
              placeholder="Password"
              type="password"
              {...register('password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BiLockAlt className={classes.inputIcon} />
                  </InputAdornment>
                ),
                classes: {
                  input: classes.input,
                },
              }}
            />
            <Button className={classes.action} type="submit">
              Login
            </Button>
            <Link to="/forgot-password" className={classes.redirect}>
              Forgot Password?
            </Link>
            <Link to="/register" className={classes.redirect}>
              Create your Account
              <BiRightArrowAlt className={classes.redirectIcon} />
            </Link>
          </form>
        </Box>
      </Box>
    </CustomerLayout>
  )
}

export default Login
