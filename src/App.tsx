import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "@/pages/Index";
import MusicPage from "@/pages/MusicPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";
import ComingSoon from "@/pages/ComingSoon";

const PUBLISHED_DOMAIN = "nachman-cohen-official.lovable.app";

const App = () => {
  const isPublished = window.location.hostname === PUBLISHED_DOMAIN;

  if (isPublished) {
    return <ComingSoon />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-[72px]">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
};

export default App;
