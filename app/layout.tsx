import './globals.css';
import type { Metadata } from 'next';
import Loader from '../components/Loader';
import SmoothScroll from '../components/SmoothScroll';
import Reveals from '../components/Reveals';
import { SITE_URL, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Aziz Studio — Brand & Digital Design Agency', template: '%s · Aziz Studio' },
  description: 'Design agency blending creative design, strategy, and data-driven craft — branding, UI/UX, motion, and web development.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: '/',
    title: 'Aziz Studio — Brand & Digital Design Agency',
    description: 'Creative design, smart strategy & data-driven craft.',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Aziz Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aziz Studio',
    description: 'Brand & digital design agency.',
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  icons: { icon: '/studio.ico', apple: '/apple-touch-icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              description: 'Brand & digital design agency.',
            }),
          }}
        />
      </head>
      <body>
        <Loader />
        <SmoothScroll />
        {children}
        <Reveals />
      </body>
    </html>
  );
}
