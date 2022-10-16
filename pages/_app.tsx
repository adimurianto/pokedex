import '../styles/globals.css'
import type { AppProps } from 'next/app'
import i18n from '../i18n'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()
  if (router.locale) {
    i18n.changeLanguage(router.locale)
  }
  
  return <Component {...pageProps} />
}

export default MyApp
