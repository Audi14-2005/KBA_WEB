"use client"

import { Mail, Instagram, Linkedin, Heart, MapPin } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export function Footer() {
  const quickLinks = [
    { name: "Home", href: "/", hash: "home" },
    { name: "About", href: "/", hash: "about" },
    { name: "Partners", href: "/", hash: "partners" },
    { name: "Team", href: "/", hash: "team" },
    { name: "Events", href: "/events", hash: "" },
    { name: "Contact", href: "/", hash: "contact" },
  ]

  const location = useLocation()
  
  const handleNavigation = (e: React.MouseEvent, link: { href: string, hash: string }) => {
    // If we're already on the homepage, just scroll to the section
    if (location.pathname === "/" && link.hash) {
      e.preventDefault()
      const element = document.getElementById(link.hash)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    // Otherwise, navigation will happen through the Link component
  }

  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6 text-center lg:text-left">
              <img src="/images/kba-logo.png" alt="KBA Logo" className="w-12 h-12" />
              <div>
                <h3 className="font-bold text-2xl text-white">KBA Club</h3>
                <p className="text-base text-blue-200">Rajalakshmi Engineering College</p>
              </div>
            </div>
            <p className="text-blue-100 text-base sm:text-lg mb-6 max-w-lg leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
              Empowering the next generation of blockchain innovators through hands-on education, research, and industry
              collaboration at Rajalakshmi Engineering College.
            </p>
            <div className="space-y-2">
              <div className="flex items-start space-x-2 justify-center lg:justify-start">
                <MapPin className="h-6 w-6 text-blue-300 mt-0.5 flex-shrink-0" />
                <div className="text-blue-100 text-base text-center lg:text-left">
                  <p>Rajalakshmi Engineering College</p>
                  <p>Rajalakshmi Nagar, Thandalam</p>
                  <p>Chennai, Tamil Nadu 602105</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-white mb-6 text-xl">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                  to={link.hash ? `${link.href}#${link.hash}` : link.href}
                  onClick={(e) => handleNavigation(e, link)}
                  className="text-blue-200 hover:text-white transition-colors duration-200 text-base text-center md:text-left hover:translate-x-1 transform transition-transform w-full block"
                >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-white mb-6 text-xl">Connect With Us</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="h-6 w-6 text-blue-300" />
                <a
                  href="mailto:kbaclub@rajalakshmi.edu.in"
                  className="text-blue-200 hover:text-white transition-colors duration-200 text-base"
                >
                  kbaclub@rajalakshmi.edu.in
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Instagram className="h-6 w-6 text-blue-300" />
                <a
                  href="https://instagram.com/kba.rec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors duration-200 text-base"
                >
                  @kba.rec
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Linkedin className="h-6 w-6 text-blue-300" />
                <a
                  href="https://linkedin.com/kbarec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors duration-200 text-base"
                >
                  KBA Club REC
                </a>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-blue-700">
              <p className="text-blue-200 text-base mb-3 text-center md:text-left">Ready to innovate with blockchain?</p>
              <Link
                to="/#contact"
                onClick={(e) => {
                  if (location.pathname === "/") {
                    e.preventDefault()
                    const element = document.getElementById("contact")
                    if (element) element.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="bg-white text-blue-900 px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-50 transition-colors duration-200 w-full md:w-auto inline-block text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-blue-300 text-base">
              © 2025 KBA Club Rajalakshmi Engineering College. All Rights Reserved.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-center">
              <div className="flex items-center space-x-4">
                <a href="#" className="text-blue-300 hover:text-white text-base transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="text-blue-300 hover:text-white text-base transition-colors duration-200">
                  Terms of Service
                </a>
              </div>
              <div className="flex items-center space-x-2 text-blue-300 text-base">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-400 fill-current" />
                <span>for blockchain education</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
