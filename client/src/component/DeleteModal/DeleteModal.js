import React from 'react'
import { Button, Box } from '@material-ui/core'
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
  action: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "flex-end"
  },
  submit: {
    marginLeft: '8px',
    color: 'red'
  }
}))

export default function DeleteModal(props) {
  const { handleClose, handleSubmit, open } = props
  const classes = useStyles()

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
          <h3 id="transition-modal-title">Are you sure that you want delete that item?</h3>
          <Box className={classes.action}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} className={classes.submit}>Submit</Button>
          </Box>
        </div>
      </Fade>
    </Modal>
  )
}
