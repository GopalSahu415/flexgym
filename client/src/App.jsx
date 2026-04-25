import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Membership from './components/Membership';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Appointment from './components/Appointment';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import Admin from './pages/Admin';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if navigating to admin
    setIsAdmin(window.location.pathname === '/admin');
    window.addEventListener('popstate', () => {
      setIsAdmin(window.location.pathname === '/admin');
    });
  }, []);

  if (isAdmin) {
    return (
      <>
        <Toaster position="top-right" />
        <Admin />
      </>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#111',
            color: '#fff',
            border: '1px solid rgba(0,212,255,0.3)',
            fontFamily: 'Barlow Condensed, sans-serif',
            letterSpacing: '0.05em',
          },
        }}
      />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Membership />
        <Gallery />
        <Testimonials />
        <Appointment />
        <Contact />
      </main>

      <Footer />
      <FloatingButtons />
    </>
  );
}
