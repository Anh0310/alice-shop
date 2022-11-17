import {
  Box,
  Hidden,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import { BiLockAlt } from 'react-icons/bi'
import { useParams, useHistory } from 'react-router-dom'
import bgForgotPasword from '../../../assets/images/forgot-password.png'
import { useStyles } from './styles'
import { useForm } from 'react-hook-form'
import { resetPassword } from '../../../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import Button from '../Button/Button'

const ResetPasswordForm = () => {
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

  return (
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
  )
}

export default ResetPasswordForm
