import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

//redux
import { useStore } from '../store/store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

//loader import's
import BigLoader from '../components/Loader/BigLoader'

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  });

  return (
    <Provider store={store}>
      <PersistGate loading={<BigLoader />} persistor={persistor}>
          <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,500;0,600;0,800;1,200;1,500;1,600;1,700&display=swap" rel="stylesheet" />
          </Head>
         
          <GlobalStyle />
          <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
