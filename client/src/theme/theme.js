import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    common: {
      white: '#fff',
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    primary: {
      light: '#1e1e2c ',
      main: '#1a202c',
      dark: '#252525',
      contrastText: '#fff',
    },
    secondary: {
      light: '#a8a9ad',
      main: '#a8a9ad',
      contrastText: '#fff',
    },
    text: {
      primary: '#000',
      secondary: '#a8a9ad',
      disabled: '#999',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 600,
      lg: 900,
      xl: 1200,
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    body1: {
      fontSize: '13px',
      fontWeight: 400
    }
  },
})

console.log(theme)

export default theme
