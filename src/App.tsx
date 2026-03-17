/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// Sabhi separate files se components ko import karein
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Heritage from './pages/Heritage';
import Process from './components/Process';
import SignatureMenu from './components/SignatureMenu';
import Commitment from './pages/Commitment';
import Testimonials from './components/Testimonials';
import CRMForm from './components/CRMForm';
import ReachUs from './pages/ReachUs';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VisitUdupi from './pages/VisitUdupi';
import ScrollToTop from './components/ScrollToTop';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen overflow-x-hidden selection:bg-brand-gold selection:text-brand-blue">
        <Navbar />
        <Routes>
          {/* Main Landing Page (Sare sections ke saath) */}
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

          {/* Alag Page (Sirf VisitUdupi dikhega) */}
          <Route path="/visit-udupi" element={<VisitUdupi />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}