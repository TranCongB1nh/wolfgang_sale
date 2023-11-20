import Navbar from '@/components/Header/Navbar'
import './globals.css'
import TawkTo from '@/components/TawkTo';
import { Providers } from '@/redux/provider';
import Footer from '@/components/Footer';
import MailChimpPopUp from '@/components/MailChimpPopUp';
import MessengerChat from '@/components/MessengerChat';
import Script from 'next/script';
import Head from 'next/head';


export async function generateMetadata() {
  return {
    title: 'WolfGang | Thời trang cao cấp - chính hãng',
    description: 'WolfGang - Nơi cung cấp các sản phẩm thời trang, phụ kiện Chuyên Nghiệp - Website : wolfgang.vercel.app- Hotline : 0332826845',
    metadataBase: new URL('https://wolfgang.vercel.app/'),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en-US',
        'de-DE': '/de-DE',
      },
    },
    openGraph: {
      title: 'WolfGang | Thời trang cao cấp - chính hãng',
      type: 'website',
      url: 'https://wolfgang.vercel.app/',
      description: 'WolfGang - Nơi cung cấp các sản phẩm thời trang, phụ kiện Chuyên Nghiệp - Website : wolfgang.vercel.app- Hotline : 0332826845',
      images: 'https://res.cloudinary.com/dnlfoftar/image/upload/v1700226566/img_meta_a6fomy.jpg'
    }
  }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="google-site-verification" content="mCluf7z9mQW4wrvxzO0DiuHPIlXcd3TVaJw8_lSjJQ4" />
      </Head>

      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-J9WGMJM2PN"></Script>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date()); 
              gtag('config', 'G-J9WGMJM2PN');
            `
        }}
      >
      </Script>
      <Script type='text/javascript' src='https://platform-api.sharethis.com/js/sharethis.js#property=64e1d1a680556000127479ff&product=inline-share-buttons' async></Script>
      {/* <Script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=64e1d1a680556000127479ff&product=inline-share-buttons&source=platform"></Script> */}
      <Script id="mcjs" dangerouslySetInnerHTML={{
        __html: `
        !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/b20d117330404a90801147d3f/1d24ba73d202403817eda5d3d.js");
      `}}>
      </Script>
      <body className="relative bg-white">
        <Providers>
          {/* <MailChimpPopUp /> */}
          <TawkTo />
          <MessengerChat />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
