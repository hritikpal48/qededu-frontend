import React from 'react'
import Header from '../header/Header';
import Footer from '../footer/Footer';

const HomeLayout = ({ children }: { children:React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default HomeLayout;