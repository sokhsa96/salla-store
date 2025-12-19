import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter, Noto_Kufi_Arabic } from 'next/font/google';
import QueryProvider from '@/providers/QueryProvider';
import '@/app/globals.css';

// Setup Fonts
const inter = Inter({ subsets: ['latin'],display: 'swap',variable: '--font-inter' });
const kufi = Noto_Kufi_Arabic({ subsets: ['arabic'] });


export const metadata = {
  title: {
    template: '%s | Salla Store',
    default: 'Salla Store - Premium E-commerce',
  },
  description: 'Experience the future of shopping with our luxury collection.',
  // Required for 100 SEO Score
  metadataBase: new URL('https://your-vercel-app.vercel.app'), 
  openGraph: {
    title: 'Salla Store',
    description: 'Premium E-commerce Challenge',
    siteName: 'Salla Store',
    locale: 'en_US',
    type: 'website',
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await the params (Next.js 15 requirement)
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages();

  // Determine direction and font
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass = locale === 'ar' ? kufi.className : inter.className;

  return (
    <html lang={locale} dir={dir}>
      <body className={fontClass}>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            {children}
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}