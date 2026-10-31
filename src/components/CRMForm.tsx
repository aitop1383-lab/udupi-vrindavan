import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Loader2, AlertCircle, ArrowRight } from "lucide-react";

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

const FieldError = ({ message }: { message?: string }) => (
  <AnimatePresence>
    {message && (
      <motion.p
        key="error"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
        className="ml-1 mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-600"
      >
        <AlertCircle size={12} />
        {message}
      </motion.p>
    )}
  </AnimatePresence>
);

const CRMForm = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const phoneRegex = /^[0-9+]{10,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Enter a valid phone number (10–15 digits).";
    if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email address.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    const scriptURL = import.meta.env.VITE_CRM_SCRIPT_URL as string;

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
    "w-full rounded-2xl border border-brand-blue/15 bg-white px-5 py-4 text-brand-blue placeholder-brand-blue/35 input-gold-focus";
  const inputError = "border-red-400 bg-red-50";
  const labelCls = "ml-1 mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-blue/55";

  return (
    <section id="exclusive-offers" className="relative scroll-mt-24 overflow-hidden bg-brand-gold py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 85% 10%, rgba(255,255,255,0.3) 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(15,47,74,0.15) 0%, transparent 50%)' }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-brand-cream shadow-2xl shadow-brand-blue/25 lg:grid-cols-5">
          {/* Left panel */}
          <div className="relative overflow-hidden bg-brand-blue p-8 sm:p-12 text-brand-cream lg:col-span-2">
            <div className="absolute inset-0 pattern-dots opacity-20" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full border border-brand-gold/25" />
            <div className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full border border-brand-gold/25" />
            <div className="relative">
              <span className="eyebrow eyebrow-light">Inner Circle</span>
              <h2 className="mt-5 text-3xl md:text-5xl leading-[1.05] text-brand-cream">
                Register for <br />
                <span className="accent text-[1.12em]">Exclusive Offers</span>
              </h2>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-brand-cream/70">
                Join our inner circle and get updates on seasonal menus,
                special events, and exclusive member-only discounts.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 sm:p-12 lg:col-span-3 lg:p-14">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex h-full flex-col items-center justify-center py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                  >
                    <ShieldCheck size={40} />
                  </motion.div>
                  <h3 className="mb-3 text-2xl md:text-3xl text-brand-blue">
                    Welcome to the Family!
                  </h3>
                  <p className="max-w-md text-base text-brand-blue/70">
                    You've been registered successfully. Watch your inbox
                    for tasty surprises and exclusive updates.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 font-semibold text-brand-bronze underline underline-offset-4 transition-colors hover:text-brand-blue cursor-pointer"
                  >
                    Register another guest
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                  noValidate
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="crm-name" className={labelCls}>Full Name</label>
                      <input
                        id="crm-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Enter your name"
                        className={`${inputBase} ${errors.name ? inputError : ''}`}
                        value={formData.name}
                        onChange={handleChange("name")}
                      />
                      <FieldError message={errors.name} />
                    </div>
                    <div>
                      <label htmlFor="crm-phone" className={labelCls}>Phone Number</label>
                      <input
                        id="crm-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Enter your phone"
                        className={`${inputBase} ${errors.phone ? inputError : ''}`}
                        value={formData.phone}
                        onChange={handleChange("phone")}
                      />
                      <FieldError message={errors.phone} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="crm-email" className={labelCls}>Email Address</label>
                    <input
                      id="crm-email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      className={`${inputBase} ${errors.email ? inputError : ''}`}
                      value={formData.email}
                      onChange={handleChange("email")}
                    />
                    <FieldError message={errors.email} />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-blue py-5 text-base md:text-lg font-semibold text-brand-cream shadow-xl shadow-brand-blue/20 transition-all duration-300 hover:bg-brand-ink disabled:opacity-60 cursor-pointer"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="animate-spin" size={22} />
                        Registering…
                      </>
                    ) : (
                      <>
                        Join the Inner Circle
                        <ArrowRight size={18} className="text-brand-gold transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2 text-center text-sm font-semibold text-red-600"
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
      </div>
    </section>
  );
};

export default CRMForm;
