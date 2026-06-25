import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface AdminLoginProps {
  passkey: string;
  setPasskey: (key: string) => void;
  handleLogin: (e: React.FormEvent) => void;
  error: boolean;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ passkey, setPasskey, handleLogin, error }) => {
  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-gold/15 blur-[120px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" 
      />
      <Helmet>
        <title>Access Control | Udupi Vrindavan</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/95 backdrop-blur-2xl p-6 sm:p-8 md:p-12 rounded-3xl md:rounded-[2.5rem] shadow-[0_30px_80px_rgba(15,47,74,0.1)] w-full max-w-md border border-white relative z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-brand-gold/10 rounded-3xl flex items-center justify-center rotate-3">
            <Lock className="text-brand-gold" size={40} />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-brand-blue text-center mb-3">Management Portal</h1>
        <p className="text-brand-blue/50 text-center mb-10 font-sans">
          Enter your passkey to access the admin dashboard.
        </p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input
              type="password"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="Enter Passkey"
              className={`w-full px-8 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-2xl outline-none text-brand-blue text-center font-bold tracking-widest text-lg transition-all placeholder:text-brand-blue/20 ${
                error ? '!bg-red-50/50 !border-red-400 shake !ring-4 !ring-red-400/20 text-red-500' : ''
              }`}
              autoFocus
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-3 text-center font-medium"
              >
                Incorrect passkey. Please try again.
              </motion.p>
            )}
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-brand-blue text-brand-cream py-5 rounded-2xl font-bold shadow-xl hover:bg-brand-blue/95 transition-all text-xl mt-4 flex items-center justify-center gap-3 cursor-pointer"
          >
            Unlock Dashboard <Sparkles className="text-brand-gold" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
