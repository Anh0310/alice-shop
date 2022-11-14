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

export { useStyles }
