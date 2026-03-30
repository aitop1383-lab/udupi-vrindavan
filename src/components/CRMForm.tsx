import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, ShieldCheck, Loader2, AlertCircle } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────
interface FormData {
  name: string;
  phone: string;
  email: string;
}
interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

// ─── Inline Field Error ─────────────────────────────────────
const FieldError = ({ message }: { message?: string }) => (
  <AnimatePresence>
    {message && (
      <motion.p
        key="error"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-1.5 text-red-500 text-xs font-semibold mt-1.5 ml-1"
      >
        <AlertCircle size={12} />
        {message}
      </motion.p>
    )}
  </AnimatePresence>
);

// ─── Component ──────────────────────────────────────────────
const CRMForm = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const phoneRegex = /^[0-9+]{10,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Enter a valid phone number (10–15 digits).";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear field error when user starts typing
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwwG3Z_KW5NAF22aMhnASbcJ0ZG2r0RhXmprv-XbYz4r_1gxXSN-zkM9lSVs0updLvInw/exec";

    try {
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus("success");
      setFormData({ name: "", phone: "", email: "" });
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputBase =
    "w-full bg-white border-2 border-brand-blue/10 rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-5 text-brand-blue placeholder-brand-blue/30 input-gold-focus";
  const inputError = "border-red-400 bg-red-50";

  return (
    <section className="py-20 md:py-32 bg-brand-gold relative overflow-hidden">
      {/* Background radial glow for depth */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 60%)' }}
      />

      {/* Decorative icon */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
        <Utensils size={600} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-brand-cream p-8 md:p-16 lg:p-20 rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 md:border-8 border-brand-blue/5">

          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              Inner Circle
            </span>
            <h2 className="text-3xl md:text-5xl mb-6 text-brand-blue leading-tight">
              Register for <br />
              <span className="italic text-brand-gold">Exclusive Offers</span>
            </h2>
            <p className="text-brand-blue/70 text-base md:text-lg max-w-2xl mx-auto">
              Join our inner circle and get updates on seasonal menus,
              special events, and exclusive member-only discounts.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              /* ── Success State ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-10 md:py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 md:w-24 md:h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
                >
                  <ShieldCheck size={48} />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-brand-blue">
                  Welcome to the Family!
                </h3>
                <p className="text-brand-blue/70 text-base md:text-lg">
                  You've been registered successfully. Watch your inbox
                  for tasty surprises and exclusive updates.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-10 text-brand-gold font-bold underline hover:text-brand-blue transition-colors text-lg"
                >
                  Register another guest
                </button>
              </motion.div>
            ) : (
              /* ── Form ── */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 md:space-y-8 max-w-2xl mx-auto"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Name */}
                  <div>
                    <label className="text-xs uppercase tracking-widest font-bold text-brand-blue/50 ml-1 mb-2 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className={`${inputBase} ${errors.name ? inputError : ''}`}
                      value={formData.name}
                      onChange={handleChange("name")}
                    />
                    <FieldError message={errors.name} />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs uppercase tracking-widest font-bold text-brand-blue/50 ml-1 mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone"
                      className={`${inputBase} ${errors.phone ? inputError : ''}`}
                      value={formData.phone}
                      onChange={handleChange("phone")}
                    />
                    <FieldError message={errors.phone} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-brand-blue/50 ml-1 mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`${inputBase} ${errors.email ? inputError : ''}`}
                    value={formData.email}
                    onChange={handleChange("email")}
                  />
                  <FieldError message={errors.email} />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-brand-blue text-brand-cream py-5 md:py-6 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl hover:bg-brand-gold hover:text-brand-blue transition-all shadow-xl hover:shadow-brand-gold/30 disabled:opacity-60 mt-4 flex items-center justify-center gap-3 duration-300"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="animate-spin" size={22} />
                      Registering…
                    </>
                  ) : (
                    "Join the Inner Circle"
                  )}
                </button>

                {/* Server error */}
                <AnimatePresence>
                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 text-center font-semibold text-sm flex items-center justify-center gap-2"
                    >
                      <AlertCircle size={16} />
                      Something went wrong. Please try again.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CRMForm;