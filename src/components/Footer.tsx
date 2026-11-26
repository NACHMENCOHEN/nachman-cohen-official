import { Fragment } from "react";
import { Link } from "react-router-dom";
import { socialLinks } from "./social-icons";

const footerLinks = [
  { to: "/", label: "דף הבית" },
  { to: "/music", label: "מוזיקה" },
  { to: "/videos", label: "וידאו" },
  { to: "/about", label: "אודות" },
  { to: "/contact", label: "יצירת קשר" },
];

const Footer = () => {
  return (
    <footer className="pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* navigation row */}
          <nav className="flex flex-wrap items-center justify-center gap-y-3" aria-label="ניווט תחתון">
            {footerLinks.map((link, i) => (
              <Fragment key={link.to}>
                {i > 0 && <span className="w-px h-3 bg-foreground/25 mx-2.5 md:mx-6" aria-hidden />}
                <Link
                  to={link.to}
                  className="font-body text-[15px] md:text-lg text-foreground/85 whitespace-nowrap hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </Fragment>
            ))}
          </nav>

          {/* divider */}
          <div className="h-px bg-foreground/20 mt-6 mb-5" />

          {/* bottom row: copyright on the right, socials on the left */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-5">
            <p className="font-body text-sm text-foreground/60">© כל הזכויות שמורות לנחמן כהן</p>
            <div className="flex items-center gap-5">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className={`text-foreground/60 ${s.hoverColorClass} transition-colors`}
                >
                  <s.Icon size={19} />
                </a>
              ))}
            </div>
          </div>

          {/* credit */}
          <p className="mt-6 text-center text-[11px] text-muted-foreground/50" dir="rtl">
            <a href="https://ncgraphics.site/" target="_blank" rel="noopener" className="hover:text-primary transition-colors">
              האתר נבנה ע״י <span dir="ltr">NC Graphics</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
