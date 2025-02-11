import type { AppProps } from 'next/app'
import Script from 'next/script'
import '@/styles/globals.css'
import { getTranslations } from '@/utils/translations'

function MyApp({ Component, pageProps }: AppProps) {
  const translations = getTranslations('nl')
    return (
      <>
        <Script
          strategy="beforeInteractive"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,geometry&language=${translations.locale}`}
          async
        
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
