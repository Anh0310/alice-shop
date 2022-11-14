import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginLeft: 300,
    padding: 40,
    backgroundColor: '#f5f6fa',
  },
  content: {
    display: 'flex',
    gap: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 600,
    marginBottom: 30,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: 350,
  },
  uploadContainer: {
    marginBottom: 20,
  },
  uploadBtn: {
    backgroundColor: '#ddd',
    marginLeft: 20,
  },
  inputGroup: {
    marginBottom: 30,
    color: theme.palette.text.primary,

    '& .MuiInputLabel-outlined': {
      color: theme.palette.text.primary,
    },
  },
  carousel: {
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
  saveBtn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    borderRadius: 0,

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.secondary,
    },
  },
  error: {
    width: 350,
    color: '#c74a47',
    backgroundColor: '#fbe2e2',
    fontSize: '16px',
    textAlign: 'left',
    padding: '10px 15px',
    marginBottom: 20,
  },
  inStock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
}))

export { useStyles }
