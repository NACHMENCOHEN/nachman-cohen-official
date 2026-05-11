import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "@/pages/Index";
import MusicPage from "@/pages/MusicPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import VideosPage from "@/pages/VideosPage";
import NotFound from "@/pages/NotFound";
import UnsubscribePage from "@/pages/UnsubscribePage";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminSubscribers from "@/pages/admin/AdminSubscribers";
import AdminBroadcast from "@/pages/admin/AdminBroadcast";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/unsubscribe" element={<UnsubscribePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="subscribers" element={<AdminSubscribers />} />
          <Route path="broadcast" element={<AdminBroadcast />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-[72px]">
        <AnimatedRoutes />
      </main>
      <Footer />
      <FloatingSocial />
      <WhatsAppButton />
    </BrowserRouter>
  );
};

export default App;
