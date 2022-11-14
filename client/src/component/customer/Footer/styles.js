import { makeStyles } from '@material-ui/styles'
import { GUTTER } from '../../../constants/common'

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: '1px solid black',
    backgroundColor: 'white',
    padding: 4,
    paddingTop: GUTTER,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  heading: {
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 20,
    color: theme.palette.text.primary,
    textTransform: 'uppercase',
  },
  listLink: {
    fontSize: 14,
    marginBottom: 25,
    color: theme.palette.text.primary,
  },
  listImg: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 'auto',
  },
  img: {
    width: 50,
    height: 30,
    borderRadius: 0,
  },
  email: {
    fontSize: 14,
    color: theme.palette.text.primary,
    minWidth: '200px',
    '& .MuiOutlinedInput-input': {
      padding: '12.5px 14px',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderBottomColor: theme.palette.common.white,
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderBottomColor: theme.palette.common.white,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderBottomColor: theme.palette.common.white,
    },
    '&::placeholder': {
      color: theme.palette.text.primary,
      fontSize: 14,
    },
  },
  action: {
    marginTop: 20,
    padding: '11px 30px',
    fontSize: 16,
    fontWeight: 600,
    backgroundColor: '#BD1877',
    color: theme.palette.text.primary,
    borderRadius: 30,
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#a8136a',
    },
  },
}))

export { useStyles }
