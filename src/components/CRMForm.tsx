import React, { useState } from "react";
import { motion } from "framer-motion";
import { Utensils, ShieldCheck } from "lucide-react";

const CRMForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwwG3Z_KW5NAF22aMhnASbcJ0ZG2r0RhXmprv-XbYz4r_1gxXSN-zkM9lSVs0updLvInw/exec",
        {
          method: "POST",
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (result.result === "success") {
        setStatus("success");
        setFormData({
          name: "",
          phone: "",
          email: ""
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("idle");
    }
  };

  return (
    <section className="py-20 md:py-32 bg-brand-gold relative overflow-hidden">

      <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
        <Utensils size={600} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        <div className="bg-brand-cream p-8 md:p-16 lg:p-20 rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 md:border-8 border-brand-blue/5">

          <div className="text-center mb-12 md:mb-16">
            <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              Inner Circle
            </span>

            <h2 className="text-3xl md:text-5xl mb-6 text-brand-blue leading-tight">
              Register for <br />
              <span className="italic text-brand-gold">
                Exclusive Offers
              </span>
            </h2>

            <p className="text-brand-blue/70 text-base md:text-lg max-w-2xl mx-auto">
              Join our inner circle and get updates on seasonal menus,
              special events, and exclusive member-only discounts.
            </p>
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 md:py-16"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <ShieldCheck size={48} />
              </div>

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

            <form
              onSubmit={handleSubmit}
              className="space-y-6 md:space-y-8 max-w-2xl mx-auto"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-brand-blue/50 ml-2 md:ml-4">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    className="w-full bg-white border-2 border-brand-blue/5 rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-5 focus:outline-none focus:border-brand-gold transition-colors text-brand-blue"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-brand-blue/50 ml-2 md:ml-4">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    placeholder="Enter your phone"
                    required
                    className="w-full bg-white border-2 border-brand-blue/5 rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-5 focus:outline-none focus:border-brand-gold transition-colors text-brand-blue"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value
                      })
                    }
                  />
                </div>

              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-brand-blue/50 ml-2 md:ml-4">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full bg-white border-2 border-brand-blue/5 rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-5 focus:outline-none focus:border-brand-gold transition-colors text-brand-blue"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-brand-blue text-brand-cream py-5 md:py-6 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl hover:bg-brand-gold transition-all shadow-xl hover:shadow-brand-gold/30 disabled:opacity-50 mt-4"
              >
                {status === "loading"
                  ? "Registering..."
                  : "Join the Inner Circle"}
              </button>

            </form>
          )}

        </div>
      </div>
    </section>
  );
};

export default CRMForm;