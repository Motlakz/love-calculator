import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { analytics, logEvent } from './firebase';
import StarryNightSky from './components/StarryNightSky';
import CookiesModal from './components/CookiesModal';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CalculatorBlog from './pages/CalculatorBlog';

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

  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-tr from-blue-950 via-purple-950 to-black">
        <Navbar />
        <StarryNightSky />
        <div className="container mx-auto relative z-10">
          <Routes>
            <Route path="/" element={<Home handleComponentClick={handleComponentClick} />} />
            <Route path="/:calculatorType/" element={<CalculatorBlog />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <CookiesModal onAccept={handleAcceptCookies} onDecline={handleDeclineCookies} />
    </Router>
  );
};

export default App;
