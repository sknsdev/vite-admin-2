import React from 'react'
import ReactDOM from 'react-dom/client'
import { rootStore } from './store'
import { StoreProvider } from './contexts/StoreContext'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider value={rootStore}>
      <App />
    </StoreProvider>
  </React.StrictMode>
)
