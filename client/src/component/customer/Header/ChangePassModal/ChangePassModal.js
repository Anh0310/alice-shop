import React from 'react'
import {
  Button,
  Box,
  TextField,
  InputAdornment,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { BiLockAlt } from 'react-icons/bi'
import { yupResolver } from '@hookform/resolvers/yup'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 2),
  },
  textField: {
    display: 'block',
    marginTop: '16px',
  },
  action: {
    marginTop: '16px',
    display: 'flex',
  },
  submit: {
    marginLeft: '8px',
  },
  error: {
    color: '#c74a47',
    fontSize: 14,
    textAlign: 'left',
    marginTop: 10,
  },
}))

const schema = yup.object().shape({
  password: yup.string().required('Password is a required field').min(8, 'Password is 8 characters long'),
  confirmPassword: yup
    .string()
    .required('Confirm password is a required field')
    .oneOf([yup.ref('password'), null], 'Confirm password is not correct'),
})

export default function ChangePassModal(props) {
  const { handleClose, handleSubmit, open } = props
  const classes = useStyles()
  const {
    register,
    reset,
    handleSubmit: handleSubmitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const closeModal = () => {
    handleClose()
    reset({})
  }

  const submitModal = async ({ password }) => {
    await handleSubmit(password)
    reset({})
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h3 id="transition-modal-title">Change password</h3>
          <form onSubmit={handleSubmitForm(submitModal)}>
            <TextField
              className={classes.textField}
              placeholder="Enter password"
              type="password"
              {...register('password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BiLockAlt className={classes.inputIcon} />
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && (
              <Typography component="p" className={classes.error}>
                {errors.password.message}
              </Typography>
            )}
            <TextField
              className={classes.textField}
              placeholder="Confirm password"
              type="password"
              {...register('confirmPassword')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BiLockAlt className={classes.inputIcon} />
                  </InputAdornment>
                ),
              }}
            />
            {errors.confirmPassword && (
              <Typography component="p" className={classes.error}>
                {errors.confirmPassword.message}
              </Typography>
            )}
            <Box className={classes.action}>
              <Button onClick={closeModal}>Cancel</Button>
              <Button type="submit" className={classes.submit}>
                Submit
              </Button>
            </Box>
          </form>
        </div>
      </Fade>
    </Modal>
  )
}
