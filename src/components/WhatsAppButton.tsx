import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/447435952083"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1, type: "spring", duration: 0.4, bounce: 0.2 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-shadow"
    aria-label="WhatsApp"
  >
    <MessageCircle size={26} />
  </motion.a>
);

export default WhatsAppButton;
