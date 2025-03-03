import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { loraFont, montserratFont, poppinsFont, robotoFont } from './fonts';

import { ThemeProvider, AuthenticationProvider, PermissionProvider } from '@/state';
import { Footer, Navbar } from '@/layout';
import { FRONT_URL, SITE_NAME, SITE_SLOGAN } from "@/helpers";

export const metadata = {
  metadataBase: new URL(`${FRONT_URL}`),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME}: ${SITE_SLOGAN}`,
  },
  description: 'Connecting African migrants in the Middle East through shared stories, resources, and community support to foster positive change and empowerment.',
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'dXQaiLReuJEMNsbsKNM7_kClapsPeickrhrwFNwxFkg',
  },
  openGraph: {
    siteName: `${SITE_NAME}`,
    url: '/',
    locale: 'en_US',
    type: 'website',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`box-border antialiased font-sans bg-white ${robotoFont}`}>
        <ThemeProvider>
          <AuthenticationProvider>
            <PermissionProvider>
              {/* Root container with min-h-screen and flex layout */}
              <div className="flex flex-col min-h-screen overflow-hidden">
                {/* Navbar at the top */}
                <Navbar />
                
                {/* Main content area with flex-grow to ensure it expands properly */}
                <main className="flex-grow pt-0 px-4 sm:px-6 md:px-8">
                  {children}
                </main>
                
                {/* Footer at the bottom */}
                <Footer />
              </div>
            </PermissionProvider>
          </AuthenticationProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-XMJ318HTFX" />
    </html>
  );
}