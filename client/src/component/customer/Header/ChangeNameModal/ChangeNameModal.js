import React, { useState } from 'react'
import { Button, Box, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

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
    marginTop: '16px',
  },
  action: {
    marginTop: '16px',
    display: 'flex',
  },
  submit: {
    marginLeft: '8px',
  },
}))

export default function ChangeNameModal(props) {
  const { name, handleClose, handleSubmit, open } = props
  const classes = useStyles()
  const [newName, setNewName] = useState(name)

  const closeModal = () => {
    handleClose()
    setNewName(name)
  }

  const submitModal = () => {
    if (newName.trim() || newName.trim() !== name) {
      handleSubmit(newName)
    }
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
          <h3 id="transition-modal-title">Change name</h3>
          <TextField
            className={classes.textField}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Box className={classes.action}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button
              onClick={submitModal}
              className={classes.submit}
              disabled={!newName.trim() || newName.trim() === name}
            >
              Submit
            </Button>
          </Box>
        </div>
      </Fade>
    </Modal>
  )
}
