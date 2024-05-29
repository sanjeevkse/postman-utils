import '#/styles/globals.css';
import Byline from '#/ui/byline';
import { GlobalNav } from '#/ui/global-nav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Postman Utils',
    template: '%s | Postman Utils',
  },
  metadataBase: new URL('https://app-router.vercel.app'),
  description: 'A playground to explore new Postman Utils features.',
  openGraph: {
    title: 'Postman Utils Playground',
    description: 'A playground to explore new Postman Utils features.',
    images: [`/api/og?title=Postman Utils`],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="[color-scheme:dark]">
      <body className="overflow-y-scroll bg-gray-1100 bg-[url('/grid.svg')] pb-36">
        <GlobalNav />

        <div className="lg:pl-72">
          <div className="mx-auto space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
            <div className="">{children}</div>
            <Byline className="fixed sm:hidden" />
          </div>
        </div>
      </body>
    </html>
  );
}
