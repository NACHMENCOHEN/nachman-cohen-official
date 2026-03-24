import { useLanguage } from "@/i18n/LanguageContext";

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-0 font-body text-xs">
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 transition-colors ${
          lang === "en"
            ? "text-foreground font-semibold"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        English
      </button>
      <span className="text-border">|</span>
      <button
        onClick={() => setLang("he")}
        className={`px-2 py-1 transition-colors ${
          lang === "he"
            ? "text-foreground font-semibold"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        עברית
      </button>
    </div>
  );
};

export default LanguageSwitcher;
