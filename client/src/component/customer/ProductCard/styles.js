import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    boxShadow: 'none',
    borderRight: '1px solid black',
    borderBottom: '1px solid black',
    borderRadius: 0,
    padding: 20,
  },
  media: {
    height: 457,
  },
  content: {
    padding: 0,
    paddingTop: 16,
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
  },
  topTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icons: {
    display: 'flex',
    flexShrink: 0,
    alignItems: 'start',
  },
  name: {
    fontSize: 13,
    fontWeight: 400,
    color: '#000',
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    fontWeight: 400,
    fontSize: 14,
  },
}))

export { useStyles }
