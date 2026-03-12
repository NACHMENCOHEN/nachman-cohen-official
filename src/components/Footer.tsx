import { Link } from "react-router-dom";
import { Youtube, Music } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="font-display text-xl text-foreground">
          נחמן כהן
        </Link>
        <div className="flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
            <Youtube size={20} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Spotify">
            <Music size={20} />
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
