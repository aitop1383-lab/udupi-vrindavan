import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  IoLockClosedOutline,
  IoCreateOutline,
  IoListOutline,
  IoEyeOutline,
  IoCheckmarkCircleOutline,
  IoTextOutline,
  IoImageOutline,
  IoCloudUploadOutline,
  IoArrowForwardOutline,
  IoSparklesOutline
} from 'react-icons/io5';
import { Helmet } from 'react-helmet-async';

const WP_BASE_URL = 'http://d7v.021.myftpupload.com/';
const PASSKEY = 'udupi@admin';

const BlogAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === PASSKEY) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPasskey('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/5 blur-[120px] rounded-full" />

        <Helmet>
          <title>Access Control | Udupi Vrindavan</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(15,47,74,0.1)] w-full max-w-md border border-white/20 relative z-10"
        >
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-brand-gold/10 rounded-3xl flex items-center justify-center rotate-3">
              <IoLockClosedOutline className="text-brand-gold" size={40} />
            </div>
          </div>

          <h1 className="text-3xl font-display font-bold text-brand-blue text-center mb-3">
            Management Portal
          </h1>
          <p className="text-brand-blue/50 text-center mb-10 font-sans">
            Please enter your unique passkey to unlock your dashboard.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter Passkey"
                className={`w-full px-8 py-4 bg-brand-cream border rounded-2xl focus:outline-none transition-all placeholder:text-brand-blue/20 text-center font-bold tracking-widest text-lg ${error ? 'border-red-400 shake shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'border-brand-blue/5 focus:border-brand-gold focus:shadow-[0_0_20px_rgba(212,166,90,0.1)]'
                  }`}
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-3 text-center font-medium"
                >
                  Oops! Incorrect passkey.
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-brand-blue text-brand-cream py-5 rounded-2xl font-bold shadow-xl hover:bg-brand-blue/95 transition-all text-xl mt-4 flex items-center justify-center gap-3"
            >
              Unlock Now
              <IoSparklesOutline className="text-brand-gold" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream py-16 px-6 relative overflow-hidden flex items-center justify-center">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-brand-gold/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-brand-blue/5 blur-[150px] rounded-full" />

      <Helmet>
        <title>Blog Management | Udupi Vrindavan</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/70 backdrop-blur-2xl rounded-[3rem] p-8 md:p-14 shadow-[0_30px_100px_rgba(15,47,74,0.08)] border border-white/40 relative z-10"
      >
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-brand-gold/10 px-4 py-2 rounded-full text-brand-gold font-bold text-sm mb-6 uppercase tracking-widest"
          >
            <IoSparklesOutline />
            Active Session
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-blue mb-4">
            Hello there!
          </h1>
          <p className="text-brand-blue/60 text-lg font-sans max-w-sm mx-auto leading-relaxed">
            Welcome! You can easily manage your blogs from here
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-5 mb-14">
          <MenuButton
            label="Write Blog"
            desc="Start a new article or story"
            href={`${WP_BASE_URL}wp-admin/post-new.php`}
            icon={<IoCreateOutline className="text-brand-gold" size={28} />}
            delay={0.3}
            primary
          />
          <MenuButton
            label="Edit Blogs"
            desc="Manage and update existing posts"
            href={`${WP_BASE_URL}wp-admin/edit.php`}
            icon={<IoListOutline className="text-brand-gold" size={28} />}
            delay={0.4}
          />
          <MenuButton
            label="View Blogs"
            desc="See how your blog looks live"
            href="/blog"
            icon={<IoEyeOutline className="text-brand-gold" size={28} />}
            delay={0.5}
            internal
          />
        </div>

        {/* Checklist Guide */}
        <div className="bg-brand-blue/5 p-8 md:p-10 rounded-[2rem] border border-brand-blue/5">
          <h2 className="text-xl font-display font-bold text-brand-blue mb-8 flex items-center gap-3">
            <IoCheckmarkCircleOutline className="text-brand-gold" size={24} />
            Quick Easy Guide
          </h2>

          <div className="space-y-6">
            <CheckItem
              icon={<IoCreateOutline />}
              text="Click 'Write Blog' above"
              delay={0.6}
            />
            <CheckItem
              icon={<IoTextOutline />}
              text="Add your title and story"
              delay={0.7}
            />
            <CheckItem
              icon={<IoImageOutline />}
              text="Choose a photo for your post"
              delay={0.8}
            />
            <CheckItem
              icon={<IoCloudUploadOutline />}
              text="Click the blue 'Publish' button"
              delay={0.9}
            />
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center mt-10 text-brand-blue/30 text-sm font-sans">
          Logged in as Administrator • 2026 Udupi Vrindavan
        </p>
      </motion.div>
    </div>
  );
};

const MenuButton = ({ label, desc, href, icon, delay, primary = false, internal = false }: any) => {
  return (
    <motion.a
      href={href}
      target={internal ? '_self' : '_blank'}
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      className={`group w-full flex items-center justify-between p-6 rounded-2xl transition-all border ${primary
        ? 'bg-brand-blue text-brand-cream border-brand-blue shadow-[0_10px_30px_rgba(15,47,74,0.15)] hover:shadow-[0_15px_40px_rgba(15,47,74,0.2)]'
        : 'bg-white text-brand-blue border-brand-blue/5 shadow-sm hover:shadow-md hover:border-brand-gold/30'
        }`}
    >
      <div className="flex items-center gap-5">
        <div className={`p-3 rounded-xl transition-colors ${primary ? 'bg-white/10' : 'bg-brand-gold/10'}`}>
          {icon}
        </div>
        <div className="text-left">
          <div className="text-xl font-bold font-display leading-tight">{label}</div>
          <div className={`text-sm ${primary ? 'text-brand-cream/60' : 'text-brand-blue/40'}`}>{desc}</div>
        </div>
      </div>
      <IoArrowForwardOutline className={`transition-transform group-hover:translate-x-1 ${primary ? 'text-brand-gold' : 'text-brand-gold/50'}`} size={24} />
    </motion.a>
  );
};

const CheckItem = ({ icon, text, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="flex items-center gap-4 text-brand-blue/70 group"
    >
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-gold flex-shrink-0 shadow-sm border border-brand-blue/5 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <span className="font-sans font-medium text-brand-blue/80">{text}</span>
    </motion.div>
  );
};

export default BlogAdmin;
