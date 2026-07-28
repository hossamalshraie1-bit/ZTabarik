// import './globals.css';

// const SITE_NAME = 'زفات تباريك';
// const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://z-tabarik.vercel.app';
// const ICON = '/logo.png';

// export const metadata = {
//   metadataBase: new URL(SITE_URL),

//   title: {
//     default: `استوديو زفات تباريك للصوتيات | أرقى الشيلات والزفات بالأسماء`,
//     template: `%s | ${SITE_NAME}`,
//   },

//   description:
//     'متخصصون في إنتاج الشيلات والزفات بالأسماء، المكس والماستر الاحترافي، وتسجيل البودكاست.',

//   openGraph: {
//     type: 'website',
//     locale: 'ar_SA',
//     url: SITE_URL,
//     siteName: SITE_NAME,
//     images: [{ url: ICON }],
//   },

//   icons: {
//     icon: ICON,
//     apple: ICON,
//     shortcut: ICON,
//   },

//   manifest: '/manifest.json',

//   verification: { google: 'google4603cba6b6bb4bbc' },
// };

// // schema.org WebSite — لاسم الموقع في جوجل
// const websiteSchema = {
//   '@context': 'https://schema.org',
//   '@type': 'WebSite',
//   name: SITE_NAME,
//   url: SITE_URL,
// };

// // schema.org LocalBusiness — للنتائج الغنية في جوجل
// const localBusiness = {
//   '@context': 'https://schema.org',
//   '@type': 'LocalBusiness',
//   name: SITE_NAME,
//   image: `${SITE_URL}${ICON}`,
//   '@id': SITE_URL,
//   url: SITE_URL,
//   telephone: '+967779011548',
//   openingHoursSpecification: {
//     '@type': 'OpeningHoursSpecification',
//     dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//     opens: '08:00',
//     closes: '23:00',
//   },
//   sameAs: ['https://wa.me/967779011548'],
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="ar" dir="rtl">
//       <head>
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
//         />
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
//         />
//       </head>
//       <body>{children}</body>
//     </html>
//   );
// }


import './globals.css';

const SITE_NAME = 'زفات تباريك';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://z-tabarik.vercel.app';
const ICON = '/logo.png';

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `استوديو زفات تباريك للصوتيات | أرقى الشيلات والزفات بالأسماء`,
    template: `%s | ${SITE_NAME}`,
  },

  description:
    'متخصصون في إنتاج الشيلات والزفات بالأسماء، المكس والماستر الاحترافي، وتسجيل البودكاست.',

  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: ICON }],
  },

  // تم التعديل هنا: تحديد المقاسات ونوع الملف إجبارياً ليقرأه زاحف جوجل
  icons: {
    icon: [
      { url: ICON, type: 'image/png', sizes: '96x96' },
      { url: ICON, type: 'image/png', sizes: '192x192' } // اختياري لدعم شاشات أكبر
    ],
    apple: [{ url: ICON, type: 'image/png' }],
    shortcut: [ICON],
  },

  manifest: '/manifest.json',

  verification: { google: 'google4603cba6b6bb4bbc' },
};

// schema.org WebSite — لاسم الموقع في جوجل
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: 'استوديو زفات تباريك', // تم التعديل هنا: إضافة اسم بديل مقترح
  url: SITE_URL,
};

// schema.org LocalBusiness — للنتائج الغنية في جوجل
const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  image: `${SITE_URL}${ICON}`,
  '@id': SITE_URL,
  url: SITE_URL,
  telephone: '+967779011548',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '23:00',
  },
  sameAs: ['https://wa.me/967779011548'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* من الجيد تركها هنا، ولكن تأكد أن لا تتعارض مع إعدادات Next.js */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
