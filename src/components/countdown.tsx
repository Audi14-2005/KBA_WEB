import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CountdownProps {
  targetDate?: Date;
  onCountdownComplete?: () => void;
}

export function Countdown({ targetDate, onCountdownComplete }: CountdownProps) {
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [isComplete, setIsComplete] = useState(false);
  const [showLaunchAnimation, setShowLaunchAnimation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Create confetti elements
    const createConfetti = () => {
      const launchAnimation = document.getElementById('launchAnimation');
      if (!launchAnimation) return;
      
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];
      
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        launchAnimation.appendChild(confetti);
      }
    };

    const calculateCountdown = () => {
      // Target date is September 18, 2025, at 10:00 AM
      const countDate = targetDate || new Date(2025, 8, 18, 10, 0, 0); // Month is 0-indexed, so 8 = September
      const now = new Date();
      const gap = countDate.getTime() - now.getTime();

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const textDay = Math.floor(gap / day);
      const textHour = Math.floor((gap % day) / hour);
      const textMinute = Math.floor((gap % hour) / minute);
      const textSecond = Math.floor((gap % minute) / second);

      setDays(textDay < 10 ? '0' + textDay : textDay.toString());
      setHours(textHour < 10 ? '0' + textHour : textHour.toString());
      setMinutes(textMinute < 10 ? '0' + textMinute : textMinute.toString());
      setSeconds(textSecond < 10 ? '0' + textSecond : textSecond.toString());

      if (gap < 0) {
        setIsComplete(true);
        setShowLaunchAnimation(true);
        if (onCountdownComplete) {
          onCountdownComplete();
        }
      }
    };

    // Run countdown immediately and then every second
    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    // Create confetti when countdown is complete
    if (isComplete && showLaunchAnimation) {
      createConfetti();
    }

    return () => clearInterval(interval);
  }, [isComplete, showLaunchAnimation, targetDate, onCountdownComplete]);

  const handleEnterSite = () => {
    // Hide the launch animation and show the main site
    setShowLaunchAnimation(false);
    // Store in localStorage that countdown has been completed
    localStorage.setItem('countdownCompleted', 'true');
    // Navigate to home page or refresh the page
    navigate('/');
  };

  if (!isComplete) {
    return (
      <div className="countdown-container">
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>

        <div className="website-background">
          <iframe src="about:blank" title="background" frameBorder="0"></iframe>
        </div>

        <div className="countdown-overlay">
          <div className="main-content">
            <h1>KBA REC</h1>
            <p className="tagline"> At KBA, we don't follow trends, <br />we build the chain that defines them.</p>
            <p className="launch-text">Launching Soon:</p>

            <div id="countdown">
              <div className="time-box">
                <span className="number" id="days">{days}</span>
                <span className="label">Days</span>
              </div>
              <div className="time-box">
                <span className="number" id="hours">{hours}</span>
                <span className="label">Hours</span>
              </div>
              <div className="time-box">
                <span className="number" id="minutes">{minutes}</span>
                <span className="label">Minutes</span>
              </div>
              <div className="time-box">
                <span className="number" id="seconds">{seconds}</span>
                <span className="label">Seconds</span>
              </div>
            </div>
          </div>
        </div>

        <footer>
          &copy; {new Date().getFullYear()} KBA REC. All rights reserved.
        </footer>
      </div>
    );
  }

  return (
    <div className="countdown-container">
      <div className="launch-animation" id="launchAnimation" style={{ display: showLaunchAnimation ? 'flex' : 'none' }}>
        <div className="grand-opening-text">🎉 GRAND OPENING 🎉</div>
        <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '2rem' }}>KBA REC IS NOW LIVE!</h1>
        <button className="enter-site-btn" onClick={handleEnterSite}>ENTER WEBSITE</button>
      </div>
    </div>
  );
}