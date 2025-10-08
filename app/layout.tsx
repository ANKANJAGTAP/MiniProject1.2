import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import RoleRedirect from '@/components/RoleRedirect';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TurfBook - Sports Turf Booking Platform | Sangli & Miraj',
  description: 'Book sports turfs instantly in Sangli and Miraj. Find cricket, football, and other sports facilities with real-time availability and secure payments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          src={process.env.UMAMI_DOMAIN}
          data-website-id={process.env.UMAMI_SITE_ID}
        ></Script>
        {/* <Analytics /> */}
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <RoleRedirect>
            {children}
          </RoleRedirect>
          <Toaster />
        </AuthProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}