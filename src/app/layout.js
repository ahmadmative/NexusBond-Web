import { Poppins } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "NexusBond AI | Your AI Companion",
  description: "Your AI Companion",
  icons: {
    icon: [
      {
        url: "/assets/images/logo.png",
        sizes: "any",
      },
      {
        url: "//assets/images/logo.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/assets/images/logo.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
    shortcut: "/assets/images/logo.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
