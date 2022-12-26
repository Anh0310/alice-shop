import { ThemeProvider } from '@material-ui/styles'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { persistor, store } from './redux/store'
import RoutesApp from './routes/Routes'
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

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Router>
              <RoutesApp />
            </Router>
          </div>
        </ThemeProvider>
      </PersistGate>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        type="default"
      />
    </Provider>
  )
}

export default App
