import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import UserContextProvider from '@/Context/AuthContext'

export default function App({ Component, pageProps }) {
  return <UserContextProvider>
    <NextUIProvider >
      <Component {...pageProps} />
    </NextUIProvider>
  </UserContextProvider>
}
