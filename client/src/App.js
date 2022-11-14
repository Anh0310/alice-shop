import { ThemeProvider } from '@material-ui/styles'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
// Redux
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { persistor, store } from './redux/store'
import RoutesApp from './routes/Routes'
import theme from './theme/theme'

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
