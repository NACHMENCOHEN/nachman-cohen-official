import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SEO title="הדף לא נמצא | נחמן כהן" description="הדף המבוקש לא נמצא" noindex />
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-display gold-text">404</h1>
        <p className="mb-6 text-lg text-muted-foreground font-body">הדף לא נמצא</p>
        <a href="/" className="font-body text-primary hover:text-primary/80 underline transition-colors">
          חזרה לדף הבית
        </a>
      </div>
    </div>
  );
};

export default NotFound;
