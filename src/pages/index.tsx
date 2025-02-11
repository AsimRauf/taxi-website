import { GetServerSideProps } from 'next'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import { getTranslations } from '@/utils/translations'
import { NavTranslations } from '@/types/translations'

interface HomeProps {
  translations: NavTranslations
}

export default function Home({ translations }: HomeProps) {
  return (
    <main className="min-h-screen">
      <Navbar translations={translations} />
      <HeroSection translations={translations} />
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