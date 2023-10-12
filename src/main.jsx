import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Provider } from 'react-redux'
import AuthProvider from './AuthProvider/AuthProvider.jsx'
import { store } from './Redux/store'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
        </AuthProvider>
      </Provider>
  </React.StrictMode>,
)
