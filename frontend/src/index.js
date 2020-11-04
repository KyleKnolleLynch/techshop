import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import './css/bootstrap.min.css'
import './css/style.css'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
