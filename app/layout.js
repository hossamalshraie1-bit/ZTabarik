import './globals.css';

export const metadata = {
  title: 'استوديو زفات تباريك للصوتيات | شيلات، زفات، أناشيد',
  description: 'الموقع الرسمي لاستوديو زفات تباريك للصوتيات - شيلات حماسية بالأسماء، زفات أفراح فخمة، تسجيل وتوزيع صوتي احترافي.',
  manifest: '/manifest.json',
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}