import { Button as MButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles(() => ({
  button: {
    border: '1px solid black',
    padding: '10px 30px',
    minWidth: 155,
    borderRadius: 4,
    backgroundColor: 'black',
    color: '#fff',

    '&:hover': {
      backgroundColor: 'black',
      border: '1px solid black',
      color: '#fff',
    },
  },
  buttonDisabled: {
    border: '1px solid black',
    padding: '10px 30px',
    minWidth: 155,
    borderRadius: 4,
    backgroundColor: 'black',
    color: '#fff',
    opacity: 0.5,
    cursor: 'not-allowed',
    '&:hover': {
      backgroundColor: 'black',
      border: '1px solid black',
      color: '#fff',
    },
  },
}))

const Button = ({ children, className, disabled, onClick, ...props }) => {
  const classes = useStyles()

  const handleClick = () => {
    if (!disabled) {
      onClick && onClick()
    }
  }

  return (
    <MButton
      {...props}
      onClick={handleClick}
      className={`${className} ${
        disabled ? classes.buttonDisabled : classes.button
      }`}
    >
      {children}
    </MButton>
  )
}

export default Button
