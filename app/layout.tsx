import type { Metadata } from 'next';
import './globals.css';
import Providers from './provider';

export const metadata: Metadata = {
  title: '민원이지',
  description: '빠르고 확실한 민원은 민원이지',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'http://minwon.site',
    title: '민원이지',
    description: '빠르고 확실한 민원은 민원이지',
    images: [
      {
        url: 'http://minwon.site/og-image.png',
        width: 1200,
        height: 630,
        alt: '민원이지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mwez',
    siteId: '1467726470533754880',
    creatorId: '1467726470533754880',
    creator: '@KOA',
    title: '민원이지',
    description: '빠르고 확실한 민원은 민원이지',
    images: '',
  },
  generator: '민원이지',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&libraries=services,clusterer`}
          async
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
