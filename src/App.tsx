import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { analytics, logEvent } from './firebase';
import StarryNightSky from './components/StarryNightSky';
import CookiesModal from './components/CookiesModal';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
// import CalculatorBlog from './pages/CalculatorBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LovePoemGenerator from './components/LovePoemGenerator';
import { FloatingAffiliateShowcase } from './components/AffiliateComponent';
import { Product, Products } from './types/Products';
import SupportPopup from './components/SupportModal';

const App: React.FC = () => {
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === 'true') {
      setIsTrackingEnabled(true);
      logEvent(analytics, 'page_view', { page_title: 'Love Test' });
    }
  }, []);

  const handleComponentClick = (componentName: string) => {
    if (isTrackingEnabled) {
      logEvent(analytics, 'component_click', { component: componentName });
    }
  };

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsTrackingEnabled(true);
    logEvent(analytics, 'page_view', { page_title: 'Love Test' });
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setIsTrackingEnabled(false);
  };

  const handleProductClick = (product: Product) => {
    console.log(`Product clicked: ${product.name}`);
  };

  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-tr from-blue-950 via-purple-950 to-black">
        <Navbar />
        <StarryNightSky />
        <div className="container mx-auto relative z-10">
          <Routes>
            <Route path="/" element={<Home handleComponentClick={handleComponentClick} />} />
            <Route path="/love-poem-generator" element={<LovePoemGenerator />} />
            {/* <Route path="/:calculatorType" element={<CalculatorBlog />} /> */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <SupportPopup />
      <FloatingAffiliateShowcase 
        products={Products}
        scrollThreshold={300}
        rotationInterval={4000}
        onProductClick={handleProductClick}
        className="custom-showcase"
      />
      <CookiesModal onAccept={handleAcceptCookies} onDecline={handleDeclineCookies} />
    </Router>
  );
};

export default App;
