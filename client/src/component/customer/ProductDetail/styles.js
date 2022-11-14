import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  detail: {
    position: 'relative',
    width: '100%',
    zIndex: 999,
    overflow: 'hidden',
    display: 'flex',
    gap: 60,
    padding: 40,

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  imgContainer: {
    flex: 1,

    '& .carousel .slide img': {
      height: 'auto',
      objectFit: 'cover',
    },

    '& .carousel .thumb': {
      border: '3px solid transparent',
    },

    '& .carousel .thumb.selected': {
      border: '3px solid red',
    },

    '& .carousel .thumbs-wrapper': {
      marginTop: 20,
      marginLeft: 0
    },
  },
  content: {
    flex: 1,
  },
  heading: {
    fontSize: 36,
  },
  price: {
    fontSize: 36,
    fontWeight: 700,
    display: 'block',
    marginBottom: 10,
  },
  desc: {
    lineHeight: 1.6,
    marginBottom: 20,
  },
  sizeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  size: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    border: '1px solid #e1e1e1',
    marginRight: 10,
    cursor: 'pointer',
    transition: '0.3s',

    '&:hover': {
      border: '1px solid #F8B9D4',
      backgroundColor: '#F8B9D4',
      color: '#fff',
    },
  },
  sizeDisabled: {
    padding: 10,
    borderRadius: '50%',
    border: '1px solid #e1e1e1',
    marginRight: 10,
    transition: '0.3s',
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  activeSize: {
    backgroundColor: '#F8B9D4',
    color: '#fff',
    border: '1px solid #F8B9D4',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  quantity: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    border: '1px solid #ddd',
    width: 100,
  },
  add: {
    marginLeft: 20,
    padding: '10px 30px',
    minWidth: 155,
    borderRadius: 10,
    backgroundColor: '#BD1877',
    color: '#fff',

    '&:hover': {
      backgroundColor: '#a8136a',
      color: '#fff',
    },
  },
  addDisabled: {
    marginLeft: 20,
    padding: '10px 30px',
    minWidth: 155,
    borderRadius: 10,
    backgroundColor: '#BD1877',
    color: '#fff',
    opacity: 0.5,
    cursor: 'not-allowed',
    '&:hover': {
      backgroundColor: '#a8136a',
      color: '#fff',
    },
  },
  loadingContainer: {
    height: 'calc(100vh - 140px)',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: theme.palette.text.secondary,
    borderRadius: 15,
    fontSize: 40,
  },
}))

export { useStyles }
