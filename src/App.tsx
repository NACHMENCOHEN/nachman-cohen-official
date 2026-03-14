import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "@/pages/Index";
import MusicPage from "@/pages/MusicPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";
import ComingSoon from "@/pages/ComingSoon";
import MusicVideosPage from "@/pages/MusicVideosPage";

const PUBLISHED_DOMAIN = "nachman-cohen-official.lovable.app";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/videos" element={<MusicVideosPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const isPublished = window.location.hostname === PUBLISHED_DOMAIN;

  if (isPublished) {
    return <ComingSoon />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-[72px]">
        <AnimatedRoutes />
      </main>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
};

export default App;
