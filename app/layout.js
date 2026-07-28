import './globals.css';

export const metadata = {
  metadataBase: new URL('https://z-tabarik.vercel.app'),

  title: {
    default: 'استوديو زفات تباريك للصوتيات | شيلات، زفات بالأسماء',
    template: '%s | زفات تباريك',
  },

  description:
    'زفات تباريك للصوتيات - شيلات حماسية بالأسماء، زفات أفراح فخمة، تسجيل وتوزيع صوتي احترافي.',

  keywords: [
    'استوديو زفات تباريك',
    'زفات تباريك',
    'شيلات بالأسماء',
    'زفات عرايس',
    'إنتاج صوتي',
    'مكس وماستر',
    'شيلات حماسية',
    'تباريك للصوتيات',
    'اليمن',
    'السعودية',
  ],

  authors: [{ name: 'استوديو زفات تباريك للصوتيات', url: 'https://z-tabarik.vercel.app' }],
  creator: 'استوديو زفات تباريك للصوتيات',
  publisher: 'استوديو زفات تباريك للصوتيات',

  alternates: {
    canonical: 'https://z-tabarik.vercel.app',
    languages: { 'ar-SA': 'https://z-tabarik.vercel.app' },
  },

  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://z-tabarik.vercel.app',
    siteName: 'استوديو زفات تباريك للصوتيات',
    title: 'استوديو زفات تباريك للصوتيات | شيلات، زفات بالأسماء',
    description:
      'زفات تباريك للصوتيات - شيلات حماسية بالأسماء، زفات أفراح فخمة، تسجيل وتوزيع صوتي احترافي.',
    images: [
      {
        url: 'https://z-tabarik.vercel.app/logo.png',
        width: 800,
        height: 800,
        alt: 'استوديو زفات تباريك للصوتيات',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'استوديو زفات تباريك للصوتيات',
    description:
      'الموقع الرسمي لاستوديو زفات تباريك للصوتيات - شيلات حماسية بالأسماء، زفات أفراح فخمة.',
    images: ['https://z-tabarik.vercel.app/logo.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon-precomposed.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },

  manifest: '/manifest.json',

  verification: {
    google: 'google4603cba6b6bb4bbc',
  },
};

// JSON-LD Structured Data
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'زفات تباريك',
  alternateName: 'استوديو زفات تباريك للصوتيات',
  url: 'https://z-tabarik.vercel.app',
  logo: 'https://z-tabarik.vercel.app/logo.png',
  description:
    'زفات تباريك للصوتيات - شيلات حماسية بالأسماء، زفات أفراح فخمة، تسجيل وتوزيع صوتي احترافي.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+967-779-011-548',
    availableLanguage: ['Arabic'],
  },
};

// ✅ إضافة: potentialAction لتحسين ظهور الموقع في بحث جوجل
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'زفات تباريك',
  alternateName: 'استوديو زفات تباريك للصوتيات',
  url: 'https://z-tabarik.vercel.app',
  description: 'الموقع الرسمي لاستوديو زفات تباريك للصوتيات',
  inLanguage: 'ar',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://z-tabarik.vercel.app/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0d0d0d" />
        <meta name="msapplication-TileColor" content="#0d0d0d" />

        {/* Explicit Mobile & Desktop Favicon Links */}
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/apple-touch-icon-precomposed.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* ✅ إضافة: Preconnect لتحسين سرعة التحميل */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
