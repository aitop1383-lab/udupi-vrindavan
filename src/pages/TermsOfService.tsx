import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  CheckCircle, 
  RefreshCw, 
  User, 
  CreditCard, 
  Copyright, 
  ExternalLink, 
  AlertTriangle, 
  Gavel, 
  Mail, 
  ShieldAlert
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

/**
 * TermsOfService Component
 * Using the exact legal content provided.
 * Design: High-end editorial layout consistent with the Udupi Vrindavan brand.
 */
const TermsOfService = () => {
  return (
    <div className="bg-[#fdfcf7] min-h-screen pt-24 md:pt-28 pb-16 md:pb-20 font-sans texture-bg">
      <Helmet>
        <title>Terms Of Use | Udupi Vrindavan</title>
        <meta name="description" content="Review the terms and conditions for using Udupi Vrindavan's website and services." />
      </Helmet>
      <div className="max-w-4xl mx-auto px-6">
        
        {/* --- Header Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-brand-blue/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="text-brand-gold" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-brand-blue mb-4">Terms of Use</h1>
          <p className="text-brand-gold font-bold tracking-widest uppercase text-xs">Effective Date: October 2024</p>
          <div className="h-1 w-20 bg-brand-gold/30 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* --- Content Body --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg max-w-none text-brand-blue/80 leading-relaxed space-y-12"
        >
          {/* Welcome Intro */}
          <section className="text-center md:text-left bg-brand-blue/5 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-brand-blue/5">
            <p className="text-lg md:text-xl m-0">
              Welcome to <strong>Udupi Vrindavan</strong>. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions of use. Please read these terms carefully before using our site.
            </p>
          </section>

          {/* 1 & 2: Acceptance and Changes */}
          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-brand-blue/5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-brand-gold" size={24} />
                <h3 className="text-xl font-bold text-brand-blue m-0 font-display">1. Acceptance of Terms</h3>
              </div>
              <p className="text-sm leading-relaxed">
                By using our website, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree with any part of these terms, you must not use our website.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-brand-blue/5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="text-brand-gold" size={24} />
                <h3 className="text-xl font-bold text-brand-blue m-0 font-display">2. Changes to Terms</h3>
              </div>
              <p className="text-sm leading-relaxed">
                We reserve the right to modify these Terms of Use at any time. Any changes will be posted on this page with an updated effective date. Your continued use of the site signifies your acceptance.
              </p>
            </section>
          </div>

          {/* 3. Use of the Website */}
          <section className="bg-brand-blue text-brand-cream p-6 md:p-12 rounded-3xl md:rounded-[3.5rem] shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <User className="text-brand-gold" size={32} />
              <h2 className="text-3xl font-display text-brand-gold m-0 italic">3. Use of the Website</h2>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <span className="text-brand-gold font-black uppercase text-[10px] tracking-[0.2em] bg-white/10 px-3 py-1 rounded-full w-fit">Eligibility</span>
                <p className="m-0 text-base">You must be at least 18 years old to use our website.</p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <span className="text-brand-gold font-black uppercase text-[10px] tracking-[0.2em] bg-white/10 px-3 py-1 rounded-full w-fit">Account</span>
                <p className="m-0 text-base">You are responsible for maintaining the confidentiality of your account information and for all activities under your account.</p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <span className="text-brand-gold font-black uppercase text-[10px] tracking-[0.2em] bg-white/10 px-3 py-1 rounded-full w-fit">Prohibited Conduct</span>
                <p className="m-0 text-base">You agree not to use the website for any unlawful purpose or in a way that could harm, disable, overburden, or impair the site.</p>
              </div>
            </div>
          </section>

          {/* 4. Orders and Payments */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <CreditCard className="text-brand-gold" />
              <h2 className="text-3xl font-display text-brand-blue m-0">4. Orders and Payments</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-brand-blue/5 shadow-sm text-center">
                <p className="font-bold text-brand-blue text-sm mb-2 uppercase tracking-tighter">Order Acceptance</p>
                <p className="text-xs opacity-70">We reserve the right to refuse or cancel any order at our sole discretion.</p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-brand-blue/5 shadow-sm text-center">
                <p className="font-bold text-brand-blue text-sm mb-2 uppercase tracking-tighter">Pricing (AED)</p>
                <p className="text-xs opacity-70">All prices are listed in AED and are subject to change without notice.</p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-brand-blue/5 shadow-sm text-center">
                <p className="font-bold text-brand-blue text-sm mb-2 uppercase tracking-tighter">Payment</p>
                <p className="text-xs opacity-70">Payment must be made at order time. We accept UAE Authorized cards and networks.</p>
              </div>
            </div>
          </section>

          {/* 5. Intellectual Property */}
          <section className="border-l-4 border-brand-gold pl-8 py-2">
            <div className="flex items-center gap-3 mb-4">
              <Copyright className="text-brand-gold" />
              <h2 className="text-2xl font-display text-brand-blue m-0">5. Intellectual Property</h2>
            </div>
            <p className="text-sm italic">
              All content on this website, including text, graphics, logos, images, and software, is the property of <strong>Udupi Vrindavan</strong> or its content suppliers and is protected by intellectual property laws. You may not use, reproduce, distribute, or create derivative works without express written permission.
            </p>
          </section>

          {/* 6, 7, 8: Legal Protections */}
          <section className="space-y-8 bg-brand-cream/30 p-6 md:p-12 rounded-3xl md:rounded-[3rem]">
            <div className="flex gap-6 items-start">
              <ExternalLink className="text-brand-gold mt-1 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-brand-blue mb-2 font-display text-xl">6. Links to Third-Party Sites</h4>
                <p className="text-sm opacity-80">Our website may contain links to third-party websites for your convenience. We are not responsible for the content or practices of these sites. Use at your own risk.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <AlertTriangle className="text-brand-gold mt-1 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-brand-blue mb-2 font-display text-xl">7. Disclaimers and Limitation of Liability</h4>
                <p className="text-sm opacity-80 font-medium">Disclaimer: Our website is provided "as is" without warranties. Udupi Vrindavan shall not be liable for any damages arising out of your use of the site.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <ShieldAlert className="text-brand-gold mt-1 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-brand-blue mb-2 font-display text-xl">8. Indemnification</h4>
                <p className="text-sm opacity-80">You agree to indemnify and hold harmless Udupi Vrindavan from any claims, damages, or losses arising out of your use of the website or violation of these terms.</p>
              </div>
            </div>
          </section>

          {/* 9. Governing Law */}
          <section className="text-center p-6 md:p-10 bg-white border border-brand-gold/20 rounded-3xl md:rounded-[3rem] shadow-xl">
            <Gavel className="text-brand-blue mx-auto mb-4" />
            <h2 className="text-2xl font-display text-brand-blue mb-4">9. Governing Law</h2>
            <p className="text-base font-medium">
              These Terms of Use are governed by and construed in accordance with the laws of <strong>UAE</strong>. Any disputes shall be subject to the exclusive jurisdiction of the courts in UAE.
            </p>
          </section>

          {/* 10. Contact Section */}
          <section className="bg-brand-blue text-brand-cream p-8 md:p-12 rounded-3xl md:rounded-[3.5rem] text-center relative overflow-hidden shadow-2xl">
            <Mail className="text-brand-gold/10 absolute -right-10 -bottom-10" size={250} />
            <div className="relative z-10">
              <h2 className="text-3xl font-display text-brand-gold mb-6 italic">10. Contact Us</h2>
              <p className="text-lg mb-8 opacity-80">If you have any questions or concerns about these Terms of Use, please reach out.</p>
              <a 
                href="mailto:info@UdupiVrindavan.com" 
                className="bg-brand-gold text-brand-blue px-6 md:px-10 py-3 md:py-4 rounded-full font-bold hover:bg-white transition-all inline-block shadow-lg text-sm md:text-base break-words"
              >
                info@UdupiVrindavan.com
              </a>
              <p className="mt-8 text-xs font-bold text-brand-gold/50 uppercase tracking-[0.3em]">
                Udupi Vrindavan Restaurant LLC
              </p>
            </div>
          </section>

        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;