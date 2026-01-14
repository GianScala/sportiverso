import type { Metadata } from 'next'
import './globals.css'
import ScrollToTop from './components/utils/ScrollToTop'
import CookieBanner from './components/utils/CookieBanner' 

export const metadata: Metadata = {
  title: 'Homepage | Sportiverso',
  description: 'Crescere, giocare e scoprire il mondo dello sport con Sportiverso ASD',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link   href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ScrollToTop />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}