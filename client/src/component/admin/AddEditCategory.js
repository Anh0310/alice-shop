import { Button, TextField, Typography } from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Modal from '@material-ui/core/Modal'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {
  addCategory,
  updateCategory,
} from '../../redux/slices/categorySlice'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 8, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    marginBottom: 30,
    '& .MuiInputLabel-outlined': {
      color: theme.palette.text.primary,
    },
  },
  save: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    borderRadius: 0,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.secondary,
    },
  },
  error: {
    width: 350,
    color: '#c74a47',
    backgroundColor: '#fbe2e2',
    fontSize: '16px',
    textAlign: 'left',
    padding: '10px 15px',
    marginBottom: 20,
  },
}))

const AddEditCategory = ({ open, handleClose, category }) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const { register, handleSubmit, reset } = useForm()
  const [error, setError] = useState('')

  const handleAddCategory = (data) => {
    const action = addCategory(data)
    dispatch(action)
      .unwrap()
      .then((res) => {
        handleClose()
        setError('')
        reset()
        toast('Add category successfully!', {
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
      .catch((error) => {
        setError('Name has already been taken')
      })
  }

  const handleEditCategory = (data) => {
    const action = updateCategory(data)
    dispatch(action)
      .unwrap()
      .then((res) => {
        handleClose()
        setError('')
        reset()
        toast('Update category successfully!', {
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
      .catch((error) => {
        setError('Name has already been taken')
      })
  }

  useEffect(() => {
    reset(category)
  }, [category, reset])

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
        timeout: 300,
      }}
    >
      <Fade in={open}>
        <form
          className={classes.paper}
          onSubmit={handleSubmit(
            category ? handleEditCategory : handleAddCategory,
          )}
        >
          <TextField
            label="Category name"
            variant="outlined"
            required
            className={classes.input}
            {...register('name')}
          />
          {error !== '' && (
            <Typography component="p" className={classes.error}>
              {error}
            </Typography>
          )}
          <Button className={classes.save} type="submit">
            Save
          </Button>
        </form>
      </Fade>
    </Modal>
  )
}

export default AddEditCategory
