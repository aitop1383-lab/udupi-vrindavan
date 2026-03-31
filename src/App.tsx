/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import { useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

// 🏡 Standard imports (Instant rendering)
import Home from './pages/Home';

// 🚀 Lazy Loading for Main Routes
const VisitUdupi = lazy(() => import('./pages/VisitUdupi'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'));
const Blog = lazy(() => import("./pages/Blog"));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));

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

// 🌀 Simple Loading Fallback
const PageLoader = () => <div className="h-screen bg-brand-cream flex items-center justify-center">
  <div className="w-12 h-12 border-2 border-brand-blue/10 border-t-brand-gold rounded-full animate-spin" />
</div>;

// 🔗 Path to ID mapping for virtual routes
const SECTION_MAP: Record<string, string> = {
  '/about-us': 'about-us',
  '/heritage': 'heritage',
  '/our-commitment': 'our-commitment',
  '/contact-us': 'contact-us',
};

// ⚡ Global Scroll Logic (Handles Pathname, Hash, and Virtual Routes)
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Determine target ID: prioritize hash, then virtual route mapping
    let targetId = hash.replace('#', '');
    if (!targetId && SECTION_MAP[pathname]) {
      targetId = SECTION_MAP[pathname];
    }

    if (!targetId) {
      // Normal page navigation or landing on root: Reset to top
      window.scrollTo(0, 0);
    } else {
      // Section navigation: Wait for element (helps with lazy loading)
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

      // Try once
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

// 🏠 Main Landing Page Content (Components are shared across virtual routes)
const MainLanding = () => (
  <main>
    <Home />
    <AboutUs />
    <Heritage />
    <Process />
    <SignatureMenu />
    <Commitment />
    <Testimonials />
    <CRMForm />
    <ReachUs />
  </main>
);

export default function App() {
  return (
    <Router>
      <ScrollHandler />
      <div className="min-h-screen selection:bg-brand-gold selection:text-brand-blue">
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Home & Virtual Section Routes */}
            <Route path="/" element={<MainLanding />} />
            <Route path="/about-us" element={<MainLanding />} />
            <Route path="/heritage" element={<MainLanding />} />
            <Route path="/our-commitment" element={<MainLanding />} />
            <Route path="/contact-us" element={<MainLanding />} />

            {/* Sub-pages */}
            <Route path="/visit-udupi" element={<VisitUdupi />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            <Route path="/blog/admin" element={<BlogAdmin />} />
            <Route path="/legacy-blog" element={<Blog />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}