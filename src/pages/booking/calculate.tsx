import { GetServerSideProps } from 'next'
import { NavTranslations } from '@/types/translations'
import { getTranslations } from '@/utils/translations'
import Navbar from '@/components/Navbar'
import CalculateBooking from '@/components/CalculateBooking'

interface CalculatePageProps {
  translations: NavTranslations
}

export default function Calculate({ translations }: CalculatePageProps) {
  return (
    <main className="min-h-screen">
      <Navbar translations={translations} />
      <CalculateBooking translations={translations} />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = getTranslations(locale || 'nl')
  
  return {
    props: {
      translations,
    },
  }
}