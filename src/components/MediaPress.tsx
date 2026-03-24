import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

const articles = [
  { title: "נחמן כהן מרגש עם סינגל חדש: \"ומרדכי ידע\"", source: "בחדרי חרדים", url: "https://www.bhol.co.il/news/1689132" },
  { title: "נחמן כהן מרגש עם סינגל חדש: \"ומרדכי ידע\"", source: "כל רגע", url: "https://www.kore.co.il/viewArticle/180617" },
  { title: "נחמן כהן מקדיש לבתו: \"אמן על הילדים\" • קליפ", source: "בחדרי חרדים", url: "https://www.bhol.co.il/news/1486334" },
  { title: "נחמן כהן בסינגל קליפ חדש: מיין טייערע לעכטעלע", source: "בחדרי חרדים", url: "https://www.bhol.co.il/news/1477282" },
  { title: "נחמן כהן בקליפ חדש 'התעוררי'", source: "כל רגע", url: "https://www.kore.co.il/viewArticle/137882" },
  { title: "נחמן כהן רק רוצה \"למצוא חן\" • האזינו", source: "אמת", url: "https://www.emess.co.il/radio/619703" },
  { title: "נחמן כהן מקדיש לאחיו חתן בר המצווה: תפילין", source: "בחדרי חרדים", url: "https://www.bhol.co.il/news/1460867" },
  { title: "נחמן כהן – כתבות ועדכונים", source: "KCM", url: "https://www.kcm.fm/News/4445" },
  { title: "נחמן כהן – כתבות ועדכונים", source: "המחדש", url: "https://hm-news.co.il/tag/%D7%A0%D7%97%D7%9E%D7%9F-%D7%9B%D7%94%D7%9F/" },
];

const MediaPress = () => {
  const { t } = useLanguage();

  return (
    <section className="mt-20 pt-16 border-t border-border">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.1 }}
        className="font-body text-xs font-medium text-muted-foreground mb-4 tracking-widest"
      >
        {t.aboutPage.mediaLabel}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.2 }}
        className="font-display text-3xl md:text-4xl text-foreground mb-8"
      >
        {t.aboutPage.mediaTitle}
      </motion.h2>

      <div className="space-y-3">
        {articles.map((article, i) => (
          <motion.a
            key={i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.25 + i * 0.05 }}
            className="group flex items-center justify-between gap-4 px-5 py-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all"
          >
            <div className="min-w-0">
              <p className="font-body text-sm text-foreground group-hover:text-primary transition-colors truncate">
                {article.title}
              </p>
              <p className="font-body text-xs text-muted-foreground mt-1">{article.source}</p>
            </div>
            <ExternalLink size={16} className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default MediaPress;
