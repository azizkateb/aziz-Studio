import './globals.css';
import type { Metadata } from 'next';
import Loader from '../components/Loader';
import SmoothScroll from '../components/SmoothScroll';
import Reveals from '../components/Reveals';

export const metadata: Metadata = {
  title: 'Adox Studio\u00ae \u2014 The studio',
  description: 'A multidisciplinary design studio in Los Angeles. Brand, experience, and technology.',
  icons: { icon: '/studio.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Loader />
        <SmoothScroll />
        {children}
        <Reveals />
      </body>
    </html>
  );
}
