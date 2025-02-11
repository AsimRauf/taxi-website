import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { getTranslations } from '@/utils/translations'

export default function Document() {
  const translations = getTranslations('nl')
  return (
    <Html>
      <Head>
        <Script
          strategy="beforeInteractive"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,geometry&language=${translations.locale}`}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}