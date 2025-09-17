import { Routes, Route } from 'react-router-dom'
import { Header } from './components/header'
import { Footer } from './components/footer'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import { TransitionProvider } from './components/transition-provider'
import { Countdown } from './components/Countdown'
import { useState, useEffect } from 'react'
import './styles/countdown.css'

// For testing: Add this line to your browser console to reset the countdown
// localStorage.removeItem('countdownCompleted');

function App() {
  const [showCountdown, setShowCountdown] = useState(() => {
    // Check localStorage to see if countdown has been completed
    const countdownCompleted = localStorage.getItem('countdownCompleted');
    return countdownCompleted !== 'true';
  });
  
  useEffect(() => {
    // Add the countdown-active class to the body when countdown is active
    if (showCountdown) {
      document.body.classList.add('countdown-active');
    } else {
      document.body.classList.remove('countdown-active');
    }
  }, [showCountdown]);

  const handleCountdownComplete = () => {
    // Wait for the launch animation to play before showing the main site
    setTimeout(() => {
      // Store in localStorage that countdown has been completed
      localStorage.setItem('countdownCompleted', 'true');
      setShowCountdown(false);
    }, 5000); // 5 seconds delay to show the launch animation
  };

  if (showCountdown) {
    return <Countdown onCountdownComplete={handleCountdownComplete} />;
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
  )
}

export default App