import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Lucas Faustino — Páginas profissionais para o seu negócio',
  description:
    'Crio landing pages, cardápios online e interfaces web para pequenos negócios apresentarem serviços, fotos, valores e contato em uma página clara.',
  generator: 'v0.app',
  keywords: [
    'landing page',
    'desenvolvedor web',
    'cardápio online',
    'site para negócio',
    'Lucas Faustino',
  ],
  openGraph: {
    title: 'Lucas Faustino — Páginas profissionais para o seu negócio',
    description:
      'Landing pages, cardápios online e interfaces web para pequenos negócios apresentarem serviços, fotos, valores e contato com clareza.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f1115',
  colorScheme: 'dark',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${sora.variable} bg-bg`}
    >
      <body className="font-sans antialiased bg-bg text-text">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
