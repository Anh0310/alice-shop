import {
  Box,
  Hidden,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import { BiMailSend } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import bgForgotPasword from '../../../assets/images/forgot-password.png'
import bgWave from '../../../assets/images/login-2.png'
import { useStyles } from './styles'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotPassword } from '../../../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

const schema = yup.object().shape({
  email: yup.string().required().email(),
})

const ForgotPasswordForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  })
  const [submitted, setSubmitted] = useState(false)

  const handleReset = (data) => {
    const action = forgotPassword(data.email)
    dispatch(action)
      .then(unwrapResult)
      .then(() => {
        setSubmitted(true)
      })
  }

  return (
    <Box className={classes.login}>
      <Hidden mdDown implementation="js">
        <img src={bgWave} alt="login" className={classes.img1} />
      </Hidden>
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
            Forgot password?
          </Typography>
          {submitted && (
            <div>
              <p>Password reset link sent to your email account</p> <br />
            </div>
          )}
          {!submitted && (
            <>
              <Typography component="h2" className={classes.subHeading}>
                Enter the email address associated with your account
              </Typography>
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

              <Button className={classes.action} type="submit">
                Submit
              </Button>
            </>
          )}
          <Link to="/login" className={classes.redirect}>
            Back to login
          </Link>
        </form>
      </Box>
    </Box>
  )
}

export default ForgotPasswordForm
