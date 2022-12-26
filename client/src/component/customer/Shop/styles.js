import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  shop: {
    marginBottom: 24,
    marginTop: 24,
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  filter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'no-wrap',
    paddingLeft: 24,
    paddingRight: 24,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  textField: {
    width: 200,
    marginLeft: 12,

    '& .MuiInputLabel-outlined': {
      color: theme.palette.text.primary,
    },

    '& .MuiSelect-outlined': {
      color: theme.palette.text.primary,
      paddingTop: 12,
      paddingBottom: 12,
    },

    [theme.breakpoints.down('md')]: {
      width: 140,
    },

    [theme.breakpoints.down('sm')]: {
      width: 200,
    },
  },
  selectHeading: {
    fontSize: 16,
    fontWeight: 500,
    marginTop: 8,
  },
  select: {
    display: 'flex',
  },
  loadingContainer: {
    margin: '130px 0',
  },
  empty: {
    fontSize: 20,
    fontWeight: 500,
    width: '100%',
    textAlign: 'center',
    padding: '100px 0',
  },
}))

export { useStyles }
