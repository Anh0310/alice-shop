import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: 'white',
    height: '95px',
    display: 'flex',
    color: theme.palette.text.primary,
    paddingRight: '0 !important',
  },
  toolbar: {
    minHeight: 50,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 24 * 1.25,
    paddingBottom: 24 * 1.25,
    paddingLeft: 24,
    paddingRight: 24,
  },
  logo: {
    width: '20%',
    minWidth: 180,
    '& > img': {
      width: 100,
      height: 48,
    },
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    [theme.breakpoints.down('md')]: {
      flex: 1,
      marginLeft: 0,
    },
  },
  secondaryActions: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 8,
    paddingTop: 8,
    borderBottom: '1px solid black',
  },
  categories: {
    display: 'flex',
  },
  user: {
    display: 'flex',
  },
  input: {
    width: 240,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 6,
    [theme.breakpoints.down('md')]: {
      flex: 1,
    },
  },
  typo: {
    cursor: 'pointer',
    '& + &': {
      marginLeft: 16,
    },
  },
  signIn: {
    textTransform: 'capitalize',
    borderStyle: 'solid',
    color: '#f1f1f1',
    backgroundColor: theme.palette.primary.main,
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ebebeb',
      color: theme.palette.text.primary,
      boxShadow: '0 5px 5px -2px rgb(0 0 0 / 50%)',
    },
  },
}))

export { useStyles }
