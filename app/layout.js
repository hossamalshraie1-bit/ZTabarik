import './globals.css';

export const metadata = {
  title: 'استوديو زفات تباريك للصوتيات | شيلات، زفات، أناشيد',
  description: 'الموقع الرسمي لاستوديو زفات تباريك للصوتيات - شيلات حماسية بالأسماء، زفات أفراح فخمة، تسجيل وتوزيع صوتي احترافي.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  verification: {
    google: 'google4603cba6b6bb4bbc',
  },
  metadataBase: new URL('https://z-tabarik.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'استوديو زفات تباريك للصوتيات',
    description: 'شيلات حماسية بالأسماء، زفات أفراح فخمة، تسجيل وتوزيع صوتي احترافي.',
    url: 'https://z-tabarik.vercel.app',
    siteName: 'استوديو زفات تباريك للصوتيات',
    locale: 'ar_SA',
    type: 'website',
    images: [
      {
        url: '/icon.svg',
        width: 512,
        height: 512,
        alt: 'استوديو زفات تباريك للصوتيات',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'استوديو زفات تباريك للصوتيات',
    'url': 'https://z-tabarik.vercel.app',
  };

  return (
    <html lang="ar" dir="rtl">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}