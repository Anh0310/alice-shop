import CustomerLayout from './customer/CustomerLayout'
import {
  Box,
  Hidden,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { BiLockAlt } from 'react-icons/bi'
import { useParams, useHistory } from 'react-router-dom'
import bgForgotPasword from '../assets/images/forgot-password.png'
import { useForm } from 'react-hook-form'
import { resetPassword } from '../redux/slices/userSlice'
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
  subHeading: {
    fontSize: 16,
    fontWeight: 400,
    marginBottom: 20,
    color: theme.palette.text.disabled,
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
}))

const ResetPassword = () => {
  const classes = useStyles()
  const params = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const { register, handleSubmit } = useForm()

  const handleReset = (data) => {
    const body = {
      id: params.id,
      token: params.token,
      password: data.password,
    }
    const action = resetPassword(body)
    dispatch(action)
      .then(unwrapResult)
      .then(() => {
        history.push('/login')
      })
      .catch((error) => {
        if (error.status === 400) setError('Invalid link or expired')
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
            <Box className={classes.imgContainer}>
              <img
                src={bgForgotPasword}
                alt="not-found"
                className={classes.img}
              />
            </Box>
          </Hidden>
          <form className={classes.form} onSubmit={handleSubmit(handleReset)}>
            <Typography component="h2" className={classes.heading}>
              Create new password
            </Typography>

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
            {error !== '' && (
              <Typography component="p" className={classes.error}>
                {error}
              </Typography>
            )}
            <TextField
              className={classes.input}
              placeholder="Confirm password"
              type="password"
              {...register('confirmPassword')}
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
              Reset password
            </Button>
          </form>
        </Box>
      </Box>
    </CustomerLayout>
  )
}

export default ResetPassword
