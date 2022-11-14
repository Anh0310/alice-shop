import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  list: {
    marginTop: 24,
    marginBottom: 24,
  },
  grid: {
    borderTop: '1px solid black',
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    '&:nth-child(4n) > div': {
      borderRight: '1px solid #fff',
    },
  },
  viewMore: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 24,
  },
}))

export { useStyles }
