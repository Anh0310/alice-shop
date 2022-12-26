import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: 30,
    fontWeight: 700,
    textTransform: 'capitalize',
    marginBottom: 32,
    borderBottom: '3px solid black',
    color: 'black',
  },
}))

const Title = ({ children, style }) => {
  const classes = useStyles()

  return (
    <Typography component="h3" className={classes.heading} style={style}>
      {children}
    </Typography>
  )
}

export default Title
