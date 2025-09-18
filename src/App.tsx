import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import { TransitionProvider } from "./components/transition-provider";
import { Countdown } from "./components/countdown";
import { useState, useEffect } from "react";
import "./styles/countdown.css";

function App() {
  const [showCountdown, setShowCountdown] = useState(true);

  useEffect(() => {
    const targetDate = new Date(2025, 9, 18, 11, 5, 0); // 18 Sept 2025, 10:00 AM
    const now = new Date();

    // If already past → skip countdown
    if (now >= targetDate) {
      setShowCountdown(false);
    }
  }, []);

  const handleCountdownComplete = () => {
    setShowCountdown(false);
  };

  if (showCountdown) {
    return <Countdown onComplete={handleCountdownComplete} />;
  }

  return (
    <TransitionProvider>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </TransitionProvider>
  );
}

export default App;
