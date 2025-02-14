import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'
import { NavTranslations } from '@/types/translations'
import { useAuth } from '@/context/AuthContext'
import { User, LogOut } from 'lucide-react'

interface NavbarProps {
  translations: NavTranslations
}

export default function Navbar({ translations }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { locale, asPath } = router
  const { user, logout } = useAuth()

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'top-0' : 'top-2'
    }`}>
      <div className={`mx-auto w-[90%] md:max-w-6xl ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm rounded-lg shadow-lg'
          : 'bg-white/95 backdrop-blur-sm rounded-lg shadow-md'
      }`}>
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Taxi Service Logo"
              width={90}
              height={35}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Menu as="div" className="relative">
              <Menu.Button className="group flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                <span>{translations.nav.services}</span>
                <svg className="w-4 h-4 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Menu.Button>
              <Transition
                enter="transition duration-150 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 ring-1 ring-black ring-opacity-5">
                  {/* Services menu items */}
                </Menu.Items>
              </Transition>
            </Menu>

            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              {translations.nav.contact}
            </Link>

            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              {translations.nav.aboutUs}
            </Link>

            <button onClick={toggleLanguage} className="px-3 py-1.5 border-2 border-primary text-primary text-sm font-medium rounded-lg hover:bg-primary hover:text-white transition-all">
              {locale === 'en' ? 'NL' : 'EN'}
            </button>

            {user ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </Menu.Button>
                <Transition
                  enter="transition duration-150 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-100 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 ring-1 ring-black ring-opacity-5">
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/profile" className={`block px-4 py-2 text-sm ${active ? 'bg-primary/5 text-primary' : 'text-gray-700'}`}>
                          {translations.nav.profile}
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-primary/5 text-primary' : 'text-gray-700'}`}
                        >
                          <div className="flex items-center space-x-2">
                            <LogOut className="h-4 w-4" />
                            <span>{translations.nav.signOut}</span>
                          </div>
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>              </Menu>
            ) : (
              <Link
                href="/auth/signin"
                className="px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md"
              >
                {translations.nav.login}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-3 md:hidden">
            <button onClick={toggleLanguage} className="px-2 py-1 border-2 border-primary text-primary text-sm font-medium rounded-lg hover:bg-primary hover:text-white transition-all">
              {locale === 'en' ? 'NL' : 'EN'}
            </button>
            
            <button
              className="rounded-lg p-2 text-gray-700 hover:bg-primary/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-4 pt-2 pb-6 space-y-2">
            {user ? (
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center space-x-2 px-4 py-2.5">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <Link href="/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 rounded-lg">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </div>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="block w-full px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark text-center"
              >
                {translations.nav.login}
              </Link>
            )}
            
            {/* Rest of mobile menu items */}
          </div>
        </div>
      </div>
    </nav>
  )
}