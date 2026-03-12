import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { toast } from "sonner";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const inputClasses =
  "w-full bg-transparent px-4 py-3 rounded-lg text-foreground font-body placeholder:text-muted-foreground shadow-[inset_0_0_0_1px_hsl(210_10%_15%)] focus:shadow-[inset_0_0_0_1px_hsl(45_70%_70%),0_0_0_4px_hsla(45_70%_70%/0.15)] focus:outline-none transition-shadow";

const ContactPage = () => {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll get back to you soon.");
    }, 1000);
  };

  return (
    <div className="pt-28 pb-24">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Book Nachman"
          subtitle="Fill out the form below and we'll get back to you within 24 hours"
        />

        <div className="max-w-2xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="text" placeholder="Full Name" required className={inputClasses} />
              <input type="email" placeholder="Email Address" required className={inputClasses} />
              <input type="tel" placeholder="Phone Number" className={inputClasses} />
              <input type="text" placeholder="Event Type" className={inputClasses} />
              <input type="text" placeholder="Event Date" className={inputClasses} />
              <input type="text" placeholder="Location" className={inputClasses} />
            </div>
            <textarea
              placeholder="Tell us about your event..."
              rows={5}
              className={inputClasses + " resize-none"}
            />
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-primary-foreground font-ui text-xs px-8 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50"
            >
              <Send size={14} />
              {sending ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.form>

          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row gap-8">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">booking@nachmancohen.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">+1 (718) 555-0123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
