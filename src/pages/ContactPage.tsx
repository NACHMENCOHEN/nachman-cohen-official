import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Send, Loader2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          formType: "contact",
        },
      });

      if (error) throw error;

      toast.success("Message sent! Check your email for confirmation.");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Something went wrong. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <SEO title="Contact – Nachman Cohen" description="Book Nachman Cohen for weddings, concerts and private events." />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Book a Show"
            subtitle="Book Nachman Cohen for live performances"
          />

          <div className="max-w-2xl mx-auto">
            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.15 }}
              onSubmit={handleSubmit}
              className="space-y-4 mb-12"
            >
              {[
                { type: "text", placeholder: "Your Name", key: "name", maxLength: 100 },
                { type: "tel", placeholder: "Phone Number", key: "phone", maxLength: 20 },
                { type: "email", placeholder: "Email Address", key: "email", maxLength: 255 },
              ].map((field) => (
                <input
                  key={field.key}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.key !== "phone"}
                  maxLength={field.maxLength}
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-card border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                />
              ))}
              <textarea
                placeholder="Your message..."
                required
                maxLength={1000}
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-5 py-3.5 rounded-xl bg-card border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none"
              />
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-sm px-7 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-70"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {loading ? "Sending..." : "Send Message"}
              </motion.button>
            </motion.form>

            {/* Direct Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.25 }}
              className="text-center"
            >
              <p className="font-body text-xs text-muted-foreground mb-3 tracking-wider uppercase">
                Weddings • Bar Mitzvah • Private Events
              </p>
              <p className="font-body text-muted-foreground mb-4">
                Or contact directly:
              </p>
              <a
                href="tel:+447435952083"
                className="inline-block font-display text-4xl md:text-5xl text-foreground hover:text-primary transition-colors mb-8"
                dir="ltr"
              >
                +44 7435 952083
              </a>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href="tel:+447435952083"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-medium text-sm px-8 py-4 rounded-full transition-shadow hover:shadow-lg hover:shadow-primary/20"
                >
                  <Phone size={18} />
                  Call Now
                </motion.a>
                <motion.a
                  href="https://wa.me/447435952083"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 font-body font-medium text-sm px-8 py-4 rounded-full border border-foreground text-foreground hover:bg-primary/10 transition-all"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
