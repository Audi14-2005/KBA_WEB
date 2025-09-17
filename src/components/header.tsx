import { useState } from "react"
import { Button } from "../components/ui/button"
import { Link, useLocation } from "react-router-dom"

// Simple SVG icon components to replace lucide-react
const Menu = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const X = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: "Home", href: "/", hash: "home" },
    { name: "About", href: "/", hash: "about" },
    { name: "Partners", href: "/", hash: "partners" },
    { name: "Team", href: "/", hash: "team" },
    { name: "Events", href: "/events", hash: "" },
    { name: "Contact", href: "/", hash: "contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <div className="flex items-center justify-between h-16">
          {/* Left Logo + Name */}
          <div className="flex items-center space-x-3">
            <img
              src="/images/kba-logo.png"
              alt="KBA Logo"
              className="w-12 h-12 md:w-14 md:h-14"
            />
            <div>
              <h1 className="font-bold text-lg md:text-xl text-blue-900">KBA REC</h1>
              <p className="text-xs md:text-sm text-blue-600">Blockchain Innovation</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.hash ? `${item.href}#${item.hash}` : item.href}
                className="text-blue-800 hover:text-blue-600 px-2 py-1 text-sm font-medium transition-colors"
                onClick={(e) => {
                  // If we're already on the homepage and clicking a hash link
                  if (location.pathname === "/" && item.hash) {
                    e.preventDefault()
                    const element = document.getElementById(item.hash)
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                    }
                  }
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* REC Logo */}
          <div className="hidden md:flex items-center">
            <img
              src="/images/rec-logo.png"
              alt="REC Logo"
              className="h-12 w-auto"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-blue-100 py-2">
          <div className="container mx-auto px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.hash ? `${item.href}#${item.hash}` : item.href}
                className="block px-3 py-2 text-blue-800 hover:bg-blue-50 rounded-md"
                onClick={(e) => {
                  // If we're already on the homepage and clicking a hash link
                  if (location.pathname === "/" && item.hash) {
                    e.preventDefault()
                    const element = document.getElementById(item.hash)
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                    }
                  }
                  setIsMenuOpen(false)
                }}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 pb-1 px-3 flex justify-center">
              <img
                src="/images/rec-logo.png"
                alt="REC Logo"
                className="h-10 w-auto"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
