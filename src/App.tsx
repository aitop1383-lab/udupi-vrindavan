/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useEffect } from 'react';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import { MotionConfig } from 'framer-motion';
import { useLocation, BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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

// Loading screen
const PageLoader = () => (
  <div className="fixed inset-0 bg-brand-cream flex flex-col items-center justify-center overflow-hidden z-[100]">
    <div className="absolute inset-0 pattern-dots opacity-40" />
    <div className="relative flex flex-col items-center gap-7 z-10">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute inset-0 border border-dashed border-brand-gold/60 rounded-full animate-spin-slow" />
        <div className="absolute inset-2 border-t-2 border-brand-blue rounded-full animate-spin" style={{ animationDuration: '1.4s' }} />
        <img src="/logo.png" alt="Udupi Vrindavan Logo" className="w-20 h-20 object-contain" />
      </div>
      <div className="text-center">
        <h2 className="text-2xl text-brand-blue mb-2">
          Udupi Vrindavan
        </h2>
        <p className="text-[11px] uppercase tracking-[0.3em] font-semibold shimmer-text">
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
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-sm tracking-widest uppercase text-brand-blue/40">Loading section...</div>}>
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
    <div className="fixed inset-0 bg-brand-cream flex flex-col items-center justify-center gap-4 z-[100]">
      <div className="w-12 h-12 border-4 border-brand-gold/40 border-t-brand-blue rounded-full animate-spin" />
      <p className="text-brand-blue font-semibold text-sm tracking-[0.2em] uppercase">Redirecting to Online Ordering...</p>
    </div>
  );
};

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
    <Router>
      <ScrollHandler />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <ScrollToTop />
        <div className="flex-1 flex flex-col">
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
            <Route path="/menu" element={<Navigate to="/#menu" replace />} />
            
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
    </MotionConfig>
  );
}
