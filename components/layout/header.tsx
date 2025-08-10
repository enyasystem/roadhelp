"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { RouteIcon as Road, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll() // check on initial load
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Track", href: "/track" },
  ]

  const headerClass = cn("header", { scrolled: scrolled })

  return (
    <header className={headerClass} id="header">
      <div className="nav-container">
        <Link href="/" className="logo" aria-label="RoadHelp Home">
          <div className="logo-icon">
            <Road size={20} />
          </div>
          RoadHelp
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex" aria-label="Main">
          <ul className="nav-menu">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn("nav-link", { active: pathname === item.href })}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/request-help" className="cta-button hidden md:flex">
            Get Help Now
          </Link>
          {/* Mobile menu button */}
          <button
            className="mobile-menu-toggle md:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu md:hidden">
          <nav>
            <ul className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn("nav-link", { active: pathname === item.href })}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/request-help" className="cta-button mt-4 w-full" onClick={() => setMobileMenuOpen(false)}>
              Get Help Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
