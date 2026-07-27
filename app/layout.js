// import './globals.css';

// export const metadata = {
//   metadataBase: new URL('https://z-tabarik.vercel.app'),

//   title: {
//     default: 'استوديو زفات تباريك للصوتيات | شيلات، زفات، أناشيد',
//     template: '%s | استوديو زفات تباريك',
//   },

//   description:
//     'الموقع الرسمي لاستوديو زفات تباريك للصوتيات - شيلات حماسية بالأسماء، زفات أفراح فخمة، تسجيل وتوزيع صوتي احترافي.',

//   keywords: [
//     'استوديو زفات تباريك',
//     'زفات تباريك',
//     'شيلات بالأسماء',
//     'زفات عرايس',
//     'إنتاج صوتي',
//     'مكس وماستر',
//     'شيلات حماسية',
//     'تباريك للصوتيات',
//     'اليمن',
//     'السعودية',
//   ],

//   authors: [{ name: 'استوديو زفات تباريك للصوتيات', url: 'https://z-tabarik.vercel.app' }],
//   creator: 'استوديو زفات تباريك للصوتيات',
//   publisher: 'استوديو زفات تباريك للصوتيات',

//   alternates: {
//     canonical: 'https://z-tabarik.vercel.app',
//     languages: { 'ar-SA': 'https://z-tabarik.vercel.app' },
//   },

//   openGraph: {
//     type: 'website',
//     locale: 'ar_SA',
//     url: 'https://z-tabarik.vercel.app',
//     siteName: 'استوديو زفات تباريك للصوتيات',
//     title: 'استوديو زفات تباريك للصوتيات | شيلات، زفات، أناشيد',
//     description:
//       'الموقع الرسمي لاستوديو زفات تباريك للصوتيات - شيلات حماسية بالأسماء، زفات أفراح فخمة، تسجيل وتوزيع صوتي احترافي.',
//     images: [
//       {
//         url: 'https://z-tabarik.vercel.app/logo.png',
//         width: 800,
//         height: 800,
//         alt: 'استوديو زفات تباريك للصوتيات',
//       },
//     ],
//   },

//   twitter: {
//     card: 'summary_large_image',
//     title: 'استوديو زفات تباريك للصوتيات',
//     description:
//       'الموقع الرسمي لاستوديو زفات تباريك للصوتيات - شيلات حماسية بالأسماء، زفات أفراح فخمة.',
//     images: ['https://z-tabarik.vercel.app/logo.png'],
//   },

//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },

//   icons: {
//     icon: [
//       { url: '/favicon.ico', sizes: 'any' },
//       { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
//       { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
//       { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
//       { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
//     ],
//     apple: [
//       { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
//       { url: '/apple-touch-icon-precomposed.png', sizes: '180x180', type: 'image/png' },
//     ],
//     shortcut: ['/favicon.ico'],
//   },

//   manifest: '/manifest.json',

//   verification: {
//     google: 'google4603cba6b6bb4bbc',
//   },
// };

// // JSON-LD Structured Data
// const organizationSchema = {
//   '@context': 'https://schema.org',
//   '@type': 'Organization',
//   name: 'استوديو زفات تباريك للصوتيات',
//   alternateName: 'زفات تباريك',
//   url: 'https://z-tabarik.vercel.app',
//   logo: 'https://z-tabarik.vercel.app/logo.png',
//   description:
//     'الموقع الرسمي لاستوديو زفات تباريك للصوتيات - شيلات حماسية بالأسماء، زفات أفراح فخمة، تسجيل وتوزيع صوتي احترافي.',
//   contactPoint: {
//     '@type': 'ContactPoint',
//     contactType: 'customer service',
//     telephone: '+967-776-158-797',
//     availableLanguage: ['Arabic'],
//   },
// };

// const websiteSchema = {
//   '@context': 'https://schema.org',
//   '@type': 'WebSite',
//   url: 'https://z-tabarik.vercel.app',
//   name: 'استوديو زفات تباريك للصوتيات',
//   description: 'الموقع الرسمي لاستوديو زفات تباريك للصوتيات',
//   inLanguage: 'ar',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="ar" dir="rtl">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta name="theme-color" content="#0d0d0d" />
//         <meta name="msapplication-TileColor" content="#0d0d0d" />

//         {/* Explicit Mobile & Desktop Favicon Links */}
//         <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
//         <link rel="icon" href="/favicon.ico" sizes="any" />
//         <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
//         <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
//         <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
//         <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
//         <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
//         <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/apple-touch-icon-precomposed.png" />
//         <link rel="manifest" href="/manifest.json" />

//         {/* Structured Data */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
//         />
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
//         />
//       </head>
//       <body>
//         {children}
//       </body>
//     </html>
//   );
// }

import './globals.css';

export const metadata = {
  metadataBase: new URL('https://z-tabarik.vercel.app'),

  title: {
    default: 'استوديو زفات تباريك للصوتيات | شيلات، زفات، أناشيد',
    template: '%s | استوديو زفات تباريك',
  },

  description:
    'الموقع الرسمي لاستوديو زفات تباريك للصوتيات - شيلات حماسية بالأسماء، زفات أفراح فخمة، تسجيل وتوزيع صوتي احترافي.',

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
    title: 'استوديو زفات تباريك للصوتيات | شيلات، زفات، أناشيد',
    description:
      'الموقع الرسمي لاستوديو زفات تباريك للصوتيات - شيلات حماسية بالأسماء، زفات أفراح فخمة، تسجيل وتوزيع صوتي احترافي.',
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

  manifest: '/manifest.json',

  verification: {
    google: 'google4603cba6b6bb4bbc',
  },
};

// JSON-LD Structured Data (معزز بمعايير Schema.org الرسمية)
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'استوديو زفات تباريك للصوتيات',
  alternateName: 'زفات تباريك',
  url: 'https://z-tabarik.vercel.app',
  logo: {
    '@type': 'ImageObject',
    url: 'https://z-tabarik.vercel.app/logo.png',
    width: '512',
    height: '512',
  },
  description:
    'الموقع الرسمي لاستوديو زفات تباريك للصوتيات - شيلات حماسية بالأسماء، زفات أفراح فخمة، تسجيل وتوزيع صوتي احترافي.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+967-776-158-797',
    availableLanguage: ['Arabic'],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://z-tabarik.vercel.app',
  name: 'استوديو زفات تباريك للصوتيات',
  description: 'الموقع الرسمي لاستوديو زفات تباريك للصوتيات',
  inLanguage: 'ar',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0d0d0d" />
        <meta name="msapplication-TileColor" content="#0d0d0d" />

        {/* روابط الأيقونات المعتمدة من جوجل قياسياً */}
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/apple-touch-icon-precomposed.png" />
        <link rel="manifest" href="/manifest.json" />

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
