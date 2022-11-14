import { Button as MButton } from '@material-ui/core'
import { useStyles } from './styles'

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
