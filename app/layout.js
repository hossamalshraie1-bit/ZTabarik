
import './globals.css';

const SITE_NAME = 'استوديو زفات تباريك';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://z-tabarik.vercel.app';
const ICON = '/logo.png';

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `استوديو زفات تباريك للصوتيات | أرقى الشيلات والزفات بالأسماء`,
    template: `%s | زفات تباريك`,
  },

  description:
    'متخصصون في إنتاج الشيلات والزفات بالأسماء، المكس والماستر الاحترافي، وتسجيل البودكاست.',

  keywords: ['زفات', 'شيلات', 'زفات بالأسماء', 'مكس وماستر', 'بودكاست', 'زفات تباريك', 'اعراس', 'تخرج', 'زفات افراح', 'افراح', 'السعودية', 'شيلات سعودية', 'مناسبات'],

  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: SITE_URL,
    siteName: 'استوديو زفات تباريك',
    title: 'استوديو زفات تباريك للصوتيات | أرقى الشيلات والزفات بالأسماء',
    description: 'متخصصون في إنتاج الشيلات والزفات بالأسماء، المكس والماستر الاحترافي، وتسجيل البودكاست.',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'زفات تباريك للزفات والشيلات بالاسماء لجميع الافراح',
      },
    ],
    // logo: "https://z-tabarik.vercel.app/logo.png"
  },

  // تم التعديل هنا: تحديد المقاسات ونوع الملف إجبارياً ليقرأه زاحف جوجل
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
      { url: '/apple-touch-icon-precomposed.png', sizes: '180x180', type: 'image/png' },],
    shortcut: ['/favicon.ico'],
  },


  manifest: '/manifest.json',

  verification: { google: 'google4603cba6b6bb4bbc' },
};

// schema.org WebSite — لاسم الموقع في جوجل
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'استوديو زفات تباريك',
  alternateName: 'زفات تباريك', // تم التعديل هنا: إضافة اسم بديل مقترح
  url: SITE_URL,
  description: 'متخصصون في إنتاج الشيلات والزفات بالأسماء، المكس والماستر الاحترافي، وتسجيل البودكاست.',
  logo: "/logo.png"
};

// schema.org LocalBusiness — للنتائج الغنية في جوجل
const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'استوديو زفات تباريك',
  alternateName: 'زفات تباريك',
  url: SITE_URL,
  description: 'متخصصون في إنتاج الشيلات والزفات بالأسماء، المكس والماستر الاحترافي، وتسجيل البودكاست.',
  image: 'https://z-tabarik.vercel.app/logo.png',
  logo: "https://z-tabarik.vercel.app/logo.png",
  '@id': SITE_URL,
  foundingDate: '2026',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'السعودية',
    addressRegion: 'الرياض',
    addressCountry: 'السعودية',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    telephone: '+967779011548',
    areaServed: 'السعودية',
    availableLanguage: 'ar',
  },
  sameAs: ['https://wa.me/967779011548'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'خدمات استوديو زفات تباريك',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'إنتاج وتسجيل الزفات',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'إنتاج الشيلات',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'إنتاج الأناشيد',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'التسجيلات الصوتية',
        },
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ik.imagekit.io" />

        {/* من الجيد تركها هنا، ولكن تأكد أن لا تتعارض مع إعدادات Next.js */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
