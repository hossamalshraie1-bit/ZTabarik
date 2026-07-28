import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://z-tabarik.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),

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

  authors: [{ name: 'استوديو زفات تباريك للصوتيات' }],
  creator: 'استوديو زفات تباريك للصوتيات',
  publisher: 'استوديو زفات تباريك للصوتيات',

  alternates: {
    canonical: siteUrl,
    languages: {
      'ar': siteUrl,
      'x-default': siteUrl,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: siteUrl,
    siteName: 'استوديو زفات تباريك للصوتيات',
    title: 'استوديو زفات تباريك للصوتيات | أرقى الشيلات والزفات بالأسماء',
    description:
      'استوديو زفات تباريك للصوتيات: متخصصون في إنتاج وتجهيز أرقى الشيلات والزفات بالأسماء والهندسة الصوتية بأحدث التقنيات العالمية.',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'استوديو زفات تباريك للصوتيات',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'استوديو زفات تباريك للصوتيات',
    description:
      'فخامة الهندسة الصوتية والإنتاج الفني في السعودية. شيلات حماسية وزفات بالأسماء.',
    images: ['/android-chrome-512x512.png'],
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
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/android-chrome-512x512.png'],
  },

  manifest: '/manifest.json',

  verification: {
    google: 'google4603cba6b6bb4bbc',
  },
};

// JSON-LD LocalBusiness Structured Data
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'زفات تباريك',
  alternateName: 'ZAFZT TABARIK',
  image: `${siteUrl}/android-chrome-512x512.png`,
  '@id': siteUrl,
  url: siteUrl,
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
  alternateName: ['زفات تباريك', 'استوديو زفات تباريك'],
  url: siteUrl,
  description: 'الموقع الرسمي لاستوديو زفات تباريك في الرياض، السعودية',
  inLanguage: 'ar',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="theme-color" content="#0d0d0d" />
        <meta name="msapplication-TileColor" content="#0d0d0d" />
        <meta property="og:site_name" content="استوديو زفات تباريك للصوتيات" />

        {/* 512x512 High-Resolution Universal Favicon Link */}
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="shortcut icon" href="/android-chrome-512x512.png" />

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


