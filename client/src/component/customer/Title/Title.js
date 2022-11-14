import { Typography } from '@material-ui/core'
import { useStyles } from './styles'

const Title = ({ children, style }) => {
  const classes = useStyles()

  return (
    <Typography component="h3" className={classes.heading} style={style}>
      {children}
    </Typography>
  )
}

export default Title
