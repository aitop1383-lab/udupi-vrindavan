/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useEffect } from 'react';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation, BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// 🏡 Standard imports (Instant rendering)
import Home from './pages/Home';

// 🚀 Lazy Loading for Main Routes
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const VisitUdupi = lazy(() => import('./pages/VisitUdupi'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'));
const BlogAdmin = lazy(() => import('./pages/BlogAdmin'));
const NotFound = lazy(() => import('./pages/NotFound'));

// 🚀 Lazy Loading for Home Sections (below-the-fold)
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Heritage = lazy(() => import('./pages/Heritage'));
const Process = lazy(() => import('./components/Process'));
const SignatureMenu = lazy(() => import('./components/SignatureMenu'));
const Commitment = lazy(() => import('./pages/Commitment'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const CRMForm = lazy(() => import('./components/CRMForm'));
const ReachUs = lazy(() => import('./pages/ReachUs'));
const Footer = lazy(() => import('./components/Footer'));

// 🌀 Premium Loading Screen
const PageLoader = () => (
  <div className="h-screen w-screen bg-brand-cream flex flex-col items-center justify-center relative overflow-hidden z-[100]">
    {/* Decorative background blur shapes */}
    <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-brand-gold/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-brand-blue/5 rounded-full blur-3xl animate-pulse" />
    
    <div className="relative flex flex-col items-center gap-8 z-10">
      {/* Shimmering Logo container with gold spinner ring */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Outer Rotating Dotted Border */}
        <div className="absolute inset-0 border-[3px] border-dashed border-brand-gold/40 rounded-full animate-spin-slow" />
        {/* Inner Solid Spinning Accent */}
        <div className="absolute inset-1 border-t-2 border-b-2 border-brand-blue rounded-full animate-spin" style={{ animationDuration: '1.5s' }} />
        
        {/* Logo Image in the center */}
        <div className="w-20 h-20 bg-white rounded-full p-2.5 shadow-lg flex items-center justify-center">
          <img src="/logo.png" alt="Udupi Vrindavan Logo" className="w-full h-full object-contain animate-pulse" />
        </div>
      </div>
      
      {/* Elegant Text */}
      <div className="text-center">
        <h2 className="font-serif text-2xl text-brand-blue font-bold tracking-wider mb-2">
          Udupi Vrindavan
        </h2>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-bold shimmer-text">
          Loading Sacred Flavors
        </p>
      </div>
    </div>
  </div>
);

// ⚡ Global Scroll Logic (Handles Hash scrolling for lazy loaded components)
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const targetId = hash.replace('#', '');

    if (!targetId) {
      window.scrollTo(0, 0);
    } else {
      let attempts = 0;
      const tryScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 85; 
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          return true;
        }
        return false;
      };

      if (!tryScroll()) {
        const interval = setInterval(() => {
          attempts++;
          if (tryScroll() || attempts > 20) {
            clearInterval(interval);
          }
        }, 100);
      }
    }
  }, [pathname, hash]);

  return null;
};

// 🏠 Main Landing Page Content
const MainLanding = () => (
  <main>
    <Home />
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-brand-blue/50">Loading section...</div>}>
      <AboutUs />
      <Heritage />
      <Process />
      <SignatureMenu />
      <Commitment />
      <Testimonials />
      <CRMForm />
      <ReachUs />
    </Suspense>
  </main>
);

// 🔗 External Redirect Helper
const ExternalRedirect = ({ url }: { url: string }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return (
    <div className="h-screen w-screen bg-brand-cream flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-brand-gold border-t-brand-blue rounded-full animate-spin" />
      <p className="text-brand-blue font-bold text-sm tracking-wider uppercase">Redirecting to Online Ordering...</p>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollHandler />
      <div className="min-h-screen selection:bg-brand-gold selection:text-brand-blue flex flex-col justify-between">
        <div>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<MainLanding />} />
            
            {/* Dedicated Trust & Information Pages */}
            <Route path="/about" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
            <Route path="/reach-us" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
            <Route path="/visit-udupi" element={<Suspense fallback={<PageLoader />}><VisitUdupi /></Suspense>} />
            <Route path="/privacy" element={<Suspense fallback={<PageLoader />}><PrivacyPolicy /></Suspense>} />
            <Route path="/privacy-policy" element={<Suspense fallback={<PageLoader />}><PrivacyPolicy /></Suspense>} />
            <Route path="/terms-of-service" element={<Suspense fallback={<PageLoader />}><TermsOfService /></Suspense>} />
            <Route path="/blog" element={<Suspense fallback={<PageLoader />}><BlogPage /></Suspense>} />
            <Route path="/blog/:slug" element={<Suspense fallback={<PageLoader />}><BlogPostDetail /></Suspense>} />
            <Route path="/blog/admin" element={<Suspense fallback={<PageLoader />}><BlogAdmin /></Suspense>} />
            
            <Route path="/legacy-blog" element={<Navigate to="/blog" replace />} />
            
            {/* Redirect /booking to official ordering portal */}
            <Route path="/booking" element={<ExternalRedirect url="https://order.udupivrindavan.com" />} />
            <Route path="/bookings" element={<ExternalRedirect url="https://order.udupivrindavan.com" />} />
            <Route path="/book" element={<ExternalRedirect url="https://order.udupivrindavan.com" />} />
            <Route path="/reservation" element={<ExternalRedirect url="https://order.udupivrindavan.com" />} />
            <Route path="/reservations" element={<ExternalRedirect url="https://order.udupivrindavan.com" />} />
            <Route path="/table-booking" element={<ExternalRedirect url="https://order.udupivrindavan.com" />} />
            
            {/* Real 404 Route */}
            <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
          </Routes>
        </div>
        
        {/* Footer */}
        <Suspense fallback={<div className="h-20" />}>
          <Footer />
        </Suspense>
      </div>
    </Router>
  );
}
