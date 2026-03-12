import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Send } from "lucide-react";

const spring = { type: "spring" as const, duration: 0.6, bounce: 0 };

const BookingSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp message with form data
    const text = encodeURIComponent(
      `Hi, I'd like to book Nachman Cohen.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/447435952083?text=${text}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/30 to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center mb-16"
        >
          <p className="font-body text-xs font-medium text-primary mb-3 tracking-widest uppercase">Booking</p>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">Book Nachman Cohen</h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Weddings • Bar Mitzvah • Concerts • Private Events
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-5 py-3.5 rounded-xl bg-card border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              maxLength={20}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-5 py-3.5 rounded-xl bg-card border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              maxLength={255}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-5 py-3.5 rounded-xl bg-card border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
            <textarea
              placeholder="Tell us about your event..."
              required
              maxLength={1000}
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-5 py-3.5 rounded-xl bg-card border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full inline-flex items-center justify-center gap-2 gold-gradient text-primary-foreground font-body font-semibold text-sm px-7 py-4 rounded-xl transition-opacity hover:opacity-90"
            >
              <Send size={16} />
              {submitted ? "Message Sent!" : "Send Booking Request"}
            </motion.button>
          </motion.form>

          {/* Direct Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="rounded-2xl bg-card border border-border p-8 text-center">
              <p className="font-body text-xs text-muted-foreground mb-4 tracking-wider uppercase">Or contact directly</p>
              <a
                href="tel:+447435952083"
                className="block font-display text-3xl md:text-4xl text-foreground hover:text-primary transition-colors mb-8"
                dir="ltr"
              >
                +44 7435 952083
              </a>
              <div className="flex items-center justify-center gap-4">
                <motion.a
                  href="tel:+447435952083"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 gold-gradient text-primary-foreground font-body font-medium text-sm px-6 py-3 rounded-full"
                >
                  <Phone size={16} />
                  Call Now
                </motion.a>
                <motion.a
                  href="https://wa.me/447435952083"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 font-body font-medium text-sm px-6 py-3 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;