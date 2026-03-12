import { Link } from "react-router-dom";
import { Youtube, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="font-display text-xl text-foreground">
          נחמן כהן
        </Link>
        <div className="flex items-center gap-5">
          <a href="https://www.instagram.com/nachmen_cohen" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="https://www.youtube.com/@Nachmen_cohen" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="YouTube">
            <Youtube size={20} />
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} נחמן כהן. כל הזכויות שמורות.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
