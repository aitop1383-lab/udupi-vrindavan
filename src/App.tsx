/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

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

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-brand-gold selection:text-brand-blue">
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={
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
            } />
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