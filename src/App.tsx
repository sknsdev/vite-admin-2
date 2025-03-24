import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { theme } from './theme'
import { Layout } from '@/components/Layout/Layout'
import { BrowserRouter } from 'react-router-dom'
import appConfig from './configs/app.config'
import { mockServer } from './mock/mock'
import { ModalsProvider } from '@mantine/modals'
import { StoreProvider } from './contexts/StoreContext'
import { rootStore } from './store'
import BaseService, { setUnauthorizedHandler } from './services/BaseService'

export default function App() {
  /**
   * Set enableMock(Default true) to true at configs/app.config.js
   * If you wish to enable mock api
   */
  if (appConfig.enableMock) {
    mockServer()
  }

  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <StoreProvider value={rootStore}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </StoreProvider>
      </ModalsProvider>
    </MantineProvider>
  )
}
