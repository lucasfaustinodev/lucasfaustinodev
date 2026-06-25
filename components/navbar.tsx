'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, WHATSAPP_URL } from '@/lib/site'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const max = document.body.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false)
    window.addEventListener('hashchange', closeMenu)
    return () => window.removeEventListener('hashchange', closeMenu)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(15,17,21,0.82)] backdrop-blur-xl border-b border-[rgba(245,242,235,0.07)] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-gold/40 via-gold-bright to-gold transition-[width] duration-150"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#inicio"
          className="group flex min-h-11 items-center gap-2.5 text-text transition-colors duration-300"
        >
          <span className="w-9 h-9 rounded-lg bg-[rgba(200,169,107,0.13)] border border-[rgba(200,169,107,0.3)] flex items-center justify-center text-gold-foil font-bold text-sm transition-all duration-300 group-hover:shadow-gold-glow-sm group-hover:border-[rgba(200,169,107,0.55)]">
            LF
          </span>
          <span className="font-display font-semibold tracking-tight group-hover:text-gold transition-colors duration-300">
            Lucas Faustino
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-text-muted hover:text-text transition-colors duration-300 group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold min-h-11 px-5 py-2.5 text-sm font-semibold rounded-lg flex items-center"
          >
            <span className="relative z-10">Falar no WhatsApp</span>
          </a>
        </div>

        <button
          className="lg:hidden flex h-11 w-11 items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-[rgba(245,242,235,0.05)] transition-colors duration-200"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`lg:hidden transition-all duration-400 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-[rgba(15,17,21,0.97)] backdrop-blur-xl border-b border-[rgba(245,242,235,0.07)]`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-text-muted hover:text-text border-b border-[rgba(245,242,235,0.06)] last:border-0 transition-colors duration-200 text-sm"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn-gold mt-3 py-3 text-center text-sm font-semibold rounded-lg"
          >
            <span className="relative z-10">Falar no WhatsApp</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
