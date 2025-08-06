import React from 'react'
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Toaster } from 'react-hot-toast';
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
};

export default HomeLayout;