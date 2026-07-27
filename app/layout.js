import './globals.css';

export const metadata = {
  title: 'استوديو زفات تباريك للصوتيات | شيلات، زفات، أناشيد',
  description: 'الموقع الرسمي لاستوديو زفات تباريك للصوتيات - شيلات حماسية بالأسماء، زفات أفراح فخمة، تسجيل وتوزيع صوتي احترافي.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
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
    title: 'استوديو زفات تباريك للصوتيات | شيلات، زفات، أناشيد',
    description: 'الموقع الرسمي لاستوديو زفات تباريك للصوتيات - شيلات حماسية بالأسماء، زفات أفراح فخمة، تسجيل وتوزيع صوتي احترافي.',
    url: 'https://z-tabarik.vercel.app',
    siteName: 'استوديو زفات تباريك للصوتيات',
    locale: 'ar_SA',
    type: 'website',
    images: [
      {
        url: 'https://z-tabarik.vercel.app/logo.png',
        width: 512,
        height: 512,
        alt: 'استوديو زفات تباريك للصوتيات',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'استوديو زفات تباريك للصوتيات',
    description: 'الموقع الرسمي لاستوديو زفات تباريك للصوتيات - شيلات حماسية بالأسماء، زفات أفراح فخمة.',
    images: ['https://z-tabarik.vercel.app/logo.png'],
  },
};

export default function RootLayout({ children }) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'استوديو زفات تباريك للصوتيات',
    'url': 'https://z-tabarik.vercel.app',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'استوديو زفات تباريك للصوتيات',
    'url': 'https://z-tabarik.vercel.app',
    'logo': 'https://z-tabarik.vercel.app/logo.png',
  };

  return (
    <html lang="ar" dir="rtl">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}