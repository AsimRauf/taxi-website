import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'
import { NavTranslations } from '@/types/translations'

interface NavbarProps {
  translations: NavTranslations
}

export default function Navbar({ translations }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { locale, asPath } = router

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'nl' : 'en'
    router.push(asPath, asPath, { locale: newLocale })
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'top-0' : 'top-2'
      }`}>
      <div className={`mx-auto max-w-6xl px-3 sm:px-4 pr-[calc(0.5rem+var(--removed-body-scroll-bar-size,0px))] ${isScrolled
        ? 'bg-secondary/95 backdrop-blur-sm rounded-lg shadow-md'
        : 'bg-white/95 backdrop-blur-sm rounded-lg shadow-md'
        }`}>

        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Taxi Service Logo"
              width={100}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-1 text-sm font-medium text-primary hover:text-primary-light transition-colors">
                <span>{translations.nav.services}</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Menu.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute left-1/2 -translate-x-1/2 mt-1 w-48 bg-white rounded-lg shadow-lg py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/services/taxi"
                        className={`block px-3 py-2 text-sm ${active ? 'bg-primary/5 text-primary' : 'text-gray-700'
                          }`}
                      >
                        {translations.nav.service1}
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/services/business"
                        className={`block px-3 py-2 text-sm ${active ? 'bg-primary/5 text-primary' : 'text-gray-700'
                          }`}
                      >
                        {translations.nav.service2}
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>

            <Link
              href="/contact"
              className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              {translations.nav.contact}
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              {translations.nav.aboutUs}
            </Link>

            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 border border-primary text-primary text-sm font-medium rounded-md hover:bg-primary hover:text-white transition-all"
            >
              {locale === 'en' ? 'NL' : 'EN'}
            </button>

            <Link
              href="/login"
              className="px-4 py-1.5 bg-secondary text-primary text-sm font-medium rounded-md hover:bg-secondary-light transition-colors shadow-sm hover:shadow-md"
            >
              {translations.nav.login}
            </Link>
          </div>

          <button
            className="md:hidden rounded-md p-1.5 text-primary hover:bg-primary/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="space-y-1">
              <button
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-primary hover:bg-primary/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {translations.nav.services}
              </button>
              <Link
                href="/services/taxi"
                className="block px-3 py-2 rounded-md text-sm text-primary/80 hover:bg-primary/5 pl-6"
              >
                {translations.nav.service1}
              </Link>
              <Link
                href="/services/business"
                className="block px-3 py-2 rounded-md text-sm text-primary/80 hover:bg-primary/5 pl-6"
              >
                {translations.nav.service2}
              </Link>
            </div>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-sm text-primary hover:bg-primary/5"
            >
              {translations.nav.contact}
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-sm text-primary hover:bg-primary/5"
            >
              {translations.nav.aboutUs}
            </Link>
            <Link
              href="/login"
              className="block px-3 py-2 rounded-md text-sm bg-secondary text-primary font-medium hover:bg-secondary-light"
            >
              {translations.nav.login}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
