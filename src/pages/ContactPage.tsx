import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { toast } from "sonner";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const inputClasses =
  "w-full bg-transparent px-4 py-3 rounded-full text-foreground font-body placeholder:text-muted-foreground border border-border focus:border-foreground focus:outline-none transition-colors text-right";

const ContactPage = () => {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("ההודעה נשלחה! נחזור אליכם בהקדם.");
    }, 1000);
  };

  return (
    <div className="pt-28 pb-24">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="הזמנת נחמן"
          subtitle="מלאו את הטופס ונחזור אליכם תוך 24 שעות"
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
              <input type="text" placeholder="שם מלא" required className={inputClasses} />
              <input type="email" placeholder="כתובת אימייל" required className={inputClasses} />
              <input type="tel" placeholder="מספר טלפון" className={inputClasses} />
              <input type="text" placeholder="סוג אירוע" className={inputClasses} />
              <input type="text" placeholder="תאריך האירוע" className={inputClasses} />
              <input type="text" placeholder="מיקום" className={inputClasses} />
            </div>
            <textarea
              placeholder="ספרו לנו על האירוע שלכם..."
              rows={5}
              className="w-full bg-transparent px-4 py-3 rounded-2xl text-foreground font-body placeholder:text-muted-foreground border border-border focus:border-foreground focus:outline-none transition-colors resize-none text-right"
            />
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-primary-foreground font-body font-medium text-xs px-8 py-3 rounded-full flex items-center gap-2 disabled:opacity-50"
            >
              <Send size={14} />
              {sending ? "שולח..." : "שלח הודעה"}
            </motion.button>
          </motion.form>

          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row gap-8">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-foreground" />
              <span className="text-sm text-muted-foreground">booking@nachmancohen.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-foreground" />
              <span className="text-sm text-muted-foreground">+1 (718) 555-0123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
