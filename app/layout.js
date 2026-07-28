import './globals.css';

const SITE_NAME = 'استوديو زفات تباريك للصوتيات';
const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL || 'https://z-tabarik.vercel.app';
const ICON      = '/android-chrome-512x512.png';

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:  `${SITE_NAME} | أرقى الشيلات والزفات بالأسماء`,
    template: `%s | ${SITE_NAME}`,
  },

  description:
    'متخصصون في إنتاج الشيلات والزفات بالأسماء، المكس والماستر الاحترافي، وتسجيل البودكاست.',

  openGraph: {
    type:     'website',
    locale:   'ar_SA',
    url:      SITE_URL,
    siteName: SITE_NAME,
    images:   [{ url: ICON }],
  },

  icons: {
    icon:     ICON,
    apple:    ICON,
    shortcut: ICON,
  },

  manifest: '/manifest.json',

  verification: { google: 'google4603cba6b6bb4bbc' },
};

// schema.org WebSite — المصدر الأساسي لاسم الموقع في جوجل
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type':    'WebSite',
  name:       SITE_NAME,
  url:        SITE_URL,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon"             type="image/png" href={ICON} />
        <link rel="apple-touch-icon"                  href={ICON} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
