import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Info, Eye, Globe, Lock, ShieldAlert, FileText } from 'lucide-react';

/**
 * PrivacyPolicy Component
 * Uses the specific content provided by the user.
 * Verified: All icons are standard Lucide-React exports to prevent build errors.
 */
const PrivacyPolicy = () => {
  return (
    <div className="bg-[#fdfcf7] min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* --- Header Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-brand-blue/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="text-brand-gold" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-brand-blue mb-4">Privacy Policy</h1>
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
          {/* Introduction */}
          <section>
            <p>
              At <strong>Udupi Vrindavan</strong>, accessible from <a href="https://udupivrindavan.com/" className="text-brand-gold underline font-bold">https://udupivrindavan.com/</a>, 
              one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of 
              information that is collected and recorded by Udupi Vrindavan and how we use it.
            </p>
            <p className="mt-4">
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. 
              This Privacy Policy applies only to our online activities and is valid for visitors to our website in relation 
              to the information that they shared and/or collected in Udupi Vrindavan. This policy is not applicable to any 
              information collected offline or via channels other than this website.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Info className="text-brand-gold" />
              <h2 className="text-3xl font-display text-brand-blue m-0">Information we collect</h2>
            </div>
            <p>
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, 
              will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <p className="mt-4">
              We also ask users to submit new passwords, if applicable. We prioritize security and understand the importance 
              of strong passwords. That’s why we don’t use weak passwords on our website. All passwords are generated using 
              tools from <strong>strong-password-generator.com</strong>, ensuring they meet high security standards. 
              This commitment helps protect our users’ accounts and data, giving you peace of mind while using our services.
            </p>
            <p className="mt-4">
              If you contact us directly, we may receive additional information about you such as your name, email address, 
              phone number, the contents of the message and/or attachments you may send us, and any other information 
              you may choose to provide.
            </p>
            <div className="bg-white p-8 rounded-3xl border border-brand-blue/5 shadow-sm my-8">
              <h4 className="text-brand-blue font-bold mb-6 uppercase text-xs tracking-widest">Personal Information we collect from users:</h4>
              <ul className="grid md:grid-cols-2 gap-4 list-none p-0">
                {[
                  'Email address', 
                  'First name and last name', 
                  'Phone number', 
                  'Address', 
                  'City', 
                  'Social Media information (ie. Connect with Facebook)'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium">
                    <div className="w-2 h-2 bg-brand-gold rounded-full" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="bg-brand-blue text-brand-cream p-8 md:p-12 rounded-[3.5rem] shadow-xl">
            <h2 className="text-3xl font-display text-brand-gold mb-8 italic">How we use your information</h2>
            <ul className="space-y-4 opacity-90 text-lg">
              {[
                "Provide, operate, and maintain our website",
                "Improve, personalize, and expand our website",
                "Understand and analyze how you use our website",
                "Develop new products, services, features, and functionality",
                "Communicate for customer service, updates, and marketing purposes",
                "Send you emails",
                "Find and prevent fraud"
              ].map((text, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="mt-2 w-1.5 h-1.5 bg-brand-gold rounded-full shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Log Files */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-brand-gold" />
              <h2 className="text-3xl font-display text-brand-blue m-0">Log Files</h2>
            </div>
            <p>
              Udupi Vrindavan follows a standard procedure of using log files. These files log visitors when they visit websites. 
              All hosting companies do this as part of hosting services’ analytics. The information collected by log files 
              include IP addresses, browser type, ISP, date and time stamp, referring/exit pages, and possibly the number of clicks. 
              These are not linked to any information that is personally identifiable.
            </p>
          </section>

          {/* Email Privacy Policies */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Mail className="text-brand-gold" />
              <h2 className="text-3xl font-display text-brand-blue m-0">Email Privacy Policies</h2>
            </div>
            <p>
              To maintain a trustworthy platform, we are implementing measures to prevent the use of <strong>temporary or Disposable 
              email addresses</strong>. By allowing only genuine email addresses, we aim to create a safer environment for everyone. 
              Additionally, we are utilizing robust encryption protocols to safeguard your data.
            </p>
          </section>

          {/* Browser Policies */}
          <section className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-brand-gold/20 shadow-sm">
            <h2 className="text-3xl font-display text-brand-blue mb-8">Updated Browser Policies</h2>
            <div className="grid md:grid-cols-1 gap-8">
              <div className="flex gap-6">
                <Lock className="text-brand-gold shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-brand-blue mb-1">Enhanced Encryption Protocols</h4>
                  <p className="text-sm">Advanced encryption methods to secure your browsing data from unauthorized access.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <Eye className="text-brand-gold shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-brand-blue mb-1">Strict Cookie Management</h4>
                  <p className="text-sm">Stringent controls over cookies. We only use essential cookies for optimal website functionality.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <ShieldAlert className="text-brand-gold shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-brand-blue mb-1">Protection Against Malicious Content</h4>
                  <p className="text-sm">Strengthened measures to detect and block malicious content, malware, and phishing attempts.</p>
                </div>
              </div>
            </div>
            <p className="mt-8 text-sm italic text-brand-blue/60 p-4 bg-brand-cream rounded-xl">
              For added safety against viruses and hackers, we kindly ask you to please update to a modern browser.
            </p>
          </section>

          {/* Content & Integrity */}
          <section>
            <h2 className="text-3xl font-display text-brand-blue mb-6 italic">Use of Content & Content Policy</h2>
            <p>
              We strictly prohibit the use of <strong>fake content</strong>, including images and text. All content must be original 
              and meaningful. Furthermore, we strictly ban <strong>adult content</strong> on our platform. To maintain a family-friendly 
              space, we follow pornography laws across all countries and address violations promptly.
            </p>
          </section>

          {/* GDPR Rights */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Globe className="text-brand-gold" />
              <h2 className="text-3xl font-display text-brand-blue m-0">GDPR Data Protection Rights</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[
                "The right to access", "The right to rectification", 
                "The right to erasure", "The right to restrict processing",
                "The right to object to processing", "The right to data portability"
              ].map((right, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-brand-blue/5">
                  <div className="text-brand-gold font-bold">0{idx + 1}</div>
                  <div className="text-sm font-semibold text-brand-blue">{right}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Children’s Information */}
          <section className="border-l-4 border-brand-gold pl-8">
            <h3 className="text-2xl font-display text-brand-blue mb-4">Children’s Information</h3>
            <p className="text-sm">
              Udupi Vrindavan does not knowingly collect any Personal Identifiable Information from children under the age of 13. 
              We encourage parents to monitor online activity. If you think your child provided this info, please contact us 
              immediately for removal.
            </p>
          </section>

          {/* Footer Contact Card */}
          <section className="bg-brand-blue text-brand-cream p-10 rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 -translate-y-1/2 translate-x-1/2">
              <Mail size={300} />
            </div>
            <h2 className="text-3xl font-display text-brand-gold mb-6 italic">Contact Us</h2>
            <p className="text-xl mb-8 opacity-80">Questions about your privacy? Reach out to our team.</p>
            <div className="space-y-2">
              <a href="mailto:info@UdupiVrindavan.com" className="text-2xl font-bold hover:text-brand-gold transition-colors block">
                info@UdupiVrindavan.com
              </a>
              <p className="font-bold text-brand-gold mt-4">Udupi Vrindavan Restaurant LLC</p>
            </div>
          </section>

        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;