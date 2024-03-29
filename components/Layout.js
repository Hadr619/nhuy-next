import Head from 'next/head';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ScrollToTop from "./ScrollToTop/ScrollToTop";
export default function Layout({ children }) {
    return (
      <>
        <Head>
          <meta name="msapplication-TileColor" content="#ffc40d" />
          <meta name="theme-color" content="#ffffff" />
          {/* <link rel="icon" href="/icon.svg" type="image/svg" sizes="96x96" /> */}
       </Head>
       <Header />
          { children }
       <Footer />
       <ScrollToTop smooth />
      </>
    )
  }