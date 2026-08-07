
import './globals.css';

const SITE_NAME = 'زفات تباريك';
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

  keywords: ['زفات', 'شيلات', 'زفات بالأسماء', 'مكس وماستر', 'بودكاست', 'زفات تباريك', 'اعراس', 'تخرج', 'زفات افراح', 'افراح', 'السعودية', 'شيلات سعودية', 'مناسبات', 'استوديو صوتيات', 'استوديوهات', 'استوديو زفات تباريك', 'استوديو'],

  authors: [{ name: 'زفات تباريك', url: SITE_URL }],
  creator: 'زفات تباريك',
  publisher: 'زفات تباريك',

  alternates: {
    canonical: SITE_URL,
    languages: { 'ar-SA': SITE_URL },
  },

  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: SITE_URL,
    siteName: 'زفات تباريك',
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
  name: 'زفات تباريك',
  alternateName: 'زفات تباريك', // تم التعديل هنا: إضافة اسم بديل مقترح
  url: SITE_URL,
  description: 'متخصصون في إنتاج الشيلات والزفات بالأسماء، المكس والماستر الاحترافي، وتسجيل البودكاست.',
  logo: "/logo.png"
};

// schema.org LocalBusiness — للنتائج الغنية في جوجل
const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'زفات تباريك',
  alternateName: 'زفات تباريك',
  url: SITE_URL,
  description: 'متخصصون في إنتاج الشيلات والزفات بالأسماء، المكس والماستر الاحترافي، وتسجيل البودكاست.',
  image: '/logo.png',
  logo: "/logo.png",
  '@id': SITE_URL,
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'المملكة العربية السعودية',
    addressLocality: 'الرياض',
    addressRegion: 'الرياض',
    postalCode: '11564',
    addressCountry: 'SA',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    telephone: '+966533019282',
    areaServed: 'السعودية',
    availableLanguage: 'ar',
  },
  sameAs: ['https://wa.me/966533019282'],
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
          name: 'زفات بالاسماء',
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
          name: 'شيلات بالاسماء',
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
