import './globals.css';

export const metadata = {
  metadataBase: new URL('https://z-tabarik.vercel.app'),

  title: {
    default: 'استوديو زفات تباريك للصوتيات | أرقى الشيلات والزفات بالأسماء',
    template: '%s | زفات تباريك',
  },

  description:
    'استوديو زفات تباريك للصوتيات: متخصصون في إنتاج وتجهيز أرقى الشيلات والزفات بالأسماء والهندسة الصوتية بأحدث التقنيات العالمية.',

  keywords: [
    'استوديو زفات تباريك',
    'زفات تباريك',
    'شيلات بالأسماء',
    'زفات عرايس',
    'إنتاج صوتي',
    'مكس وماستر',
    'شيلات حماسية',
    'تباريك للصوتيات',
    'مصنع زفات في الرياض',
    'استوديو صوتيات في السعودية',
    'الرياض',
    'السعودية',
  ],

  authors: [{ name: 'استوديو زفات تباريك للصوتيات', url: 'https://z-tabarik.vercel.app' }],
  creator: 'استوديو زفات تباريك للصوتيات',
  publisher: 'استوديو زفات تباريك للصوتيات',

  alternates: {
    canonical: 'https://z-tabarik.vercel.app',
    languages: {
      'ar': 'https://z-tabarik.vercel.app',
      'x-default': 'https://z-tabarik.vercel.app',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'ar_YE',
    url: 'https://z-tabarik.vercel.app',
    siteName: 'استوديو زفات تباريك للصوتيات | Zafatik Tabarik Studio',
    title: 'استوديو زفات تباريك للصوتيات | أرقى الشيلات والزفات بالأسماء',
    description:
      'استوديو زفات تباريك للصوتيات: متخصصون في إنتاج وتجهيز أرقى الشيلات والزفات بالأسماء والهندسة الصوتية بأحدث التقنيات العالمية.',
    images: [
      {
        url: 'https://z-tabarik.vercel.app/apple-touch-icon.png',
        width: 1200,
        height: 630,
        alt: 'شعار استوديو زفات تباريك للصوتيات',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'استوديو زفات تباريك للصوتيات | Zafatik Tabarik Studio',
    description:
      'فخامة الهندسة الصوتية والإنتاج الفني في السعودية. شيلات حماسية وزفات بالأسماء.',
    images: ['https://z-tabarik.vercel.app/apple-touch-icon.png'],
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
      { url: '/apple-touch-icon.png', type: 'image/png' },
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
    shortcut: ['/apple-touch-icon.png'],
  },

  manifest: '/manifest.json',

  verification: {
    google: 'google4603cba6b6bb4bbc',
  },
};

// JSON-LD LocalBusiness Structured Data (Standard schema format for Google Search rich features)
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'استوديو زفات تباريك للصوتيات',
  alternateName: 'Zafatik Tabarik Studio',
  image: 'https://z-tabarik.vercel.app/apple-touch-icon.png',
  '@id': 'https://z-tabarik.vercel.app',
  url: 'https://z-tabarik.vercel.app',
  telephone: '+967779011548',
  priceRange: '$$$',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 15.369445,
    longitude: 44.191007,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '23:00',
  },
  sameAs: ['https://wa.me/967779011548'],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'استوديو زفات تباريك للصوتيات',
  alternateName: 'Zafatik Tabarik Studio',
  url: 'https://z-tabarik.vercel.app',
  description: 'الموقع الرسمي لاستوديو زفات تباريك في الرياض، السعودية',
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
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
        <meta name="google-site-verification" content="google4603cba6b6bb4bbc" />

        <link rel="canonical" href="https://z-tabarik.vercel.app" />
        <link rel="alternate" hrefLang="ar" href="https://z-tabarik.vercel.app" />
        <link rel="alternate" hrefLang="x-default" href="https://z-tabarik.vercel.app" />

        {/* Favicons & Icons for Google Search Indexing */}
        <link rel="icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect for Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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

