import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Youtube, Instagram } from "lucide-react";

const spring = { type: "spring" as const, duration: 0.6, bounce: 0 };

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <Link to="/" className="font-display text-xl text-foreground hover:text-primary transition-colors">
          Nachman Cohen
        </Link>
        <div className="flex items-center gap-5">
          <motion.a whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.95 }} href="https://www.instagram.com/nachmencohen" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
            <Instagram size={20} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.95 }} href="https://www.youtube.com/@Nachmen_cohen" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="YouTube">
            <Youtube size={20} />
          </motion.a>
        </div>
        <div className="text-center md:text-right">
          <p className="text-[10px] text-muted-foreground/60 mb-1">Nachman Cohen Official Website</p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nachman Cohen. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  </footer>
);

export default Footer;
