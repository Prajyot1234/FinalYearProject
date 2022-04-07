import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

//redux
import { useStore } from '../store/store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

//loader import's
import BigLoader from '../components/Loader/BigLoader'

//session provider
import { SessionProvider,getSession  } from "next-auth/react"

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth!important;
  }
`

export default function App({ Component, pageProps: { session, ...pageProps }, }) {
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  });

  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
      <PersistGate loading={<BigLoader />} persistor={persistor}>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,500;0,600;0,800;1,200;1,500;1,600;1,700&display=swap" rel="stylesheet" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Fredoka&family=Poppins:ital,wght@0,100;0,200;0,300;0,500;0,600;0,800;1,200;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
          </Head>
         
          <GlobalStyle />
          <Component {...pageProps} />
      </PersistGate>
      </SessionProvider>
    </Provider>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);
  return {
      props: {
          session,
      }
  }
}