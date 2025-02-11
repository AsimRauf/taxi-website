import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { getTranslations } from '@/utils/translations'

function MyApp({ Component, pageProps }: AppProps) {
  const translations = getTranslations('nl')
  return <Component {...pageProps} />
}

export default MyApp