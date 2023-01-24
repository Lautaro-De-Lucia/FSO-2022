import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

// (3) The Application will be defined as a child of a Provider component 
//  provided by the react-redux library. The application's store is given to 
// the Provider as its 'store' attribute.
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
