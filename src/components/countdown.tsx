import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate?: Date;
  onComplete: () => void;
}

export function Countdown({ targetDate, onComplete }: CountdownProps) {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [blast, setBlast] = useState(false);

  useEffect(() => {
    const calculateCountdown = () => {
      const countDate = targetDate || new Date(2025, 8, 18, 11, 0, 0);
      const now = new Date();
      const gap = countDate.getTime() - now.getTime();

      if (gap <= 0) {
        setDays("00");
        setHours("00");
        setMinutes("00");
        setSeconds("00");
        return;
      }

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const textDay = Math.floor(gap / day);
      const textHour = Math.floor((gap % day) / hour);
      const textMinute = Math.floor((gap % hour) / minute);
      const textSecond = Math.floor((gap % minute) / second);

      setDays(textDay < 10 ? "0" + textDay : textDay.toString());
      setHours(textHour < 10 ? "0" + textHour : textHour.toString());
      setMinutes(textMinute < 10 ? "0" + textMinute : textMinute.toString());
      setSeconds(textSecond < 10 ? "0" + textSecond : textSecond.toString());

      if (
        textDay === 0 &&
        textHour === 0 &&
        textMinute === 0 &&
        (textSecond === 2 || textSecond === 1) &&
        !blast
      ) {
        setBlast(true);

        setTimeout(() => {
          onComplete();
        }, 4000);
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onComplete, blast]);

  // Different blast spawn areas
  const blastAreas = [
    { top: "50%", left: "50%" }, // center
    { top: "10%", left: "20%" }, // top-left
    { top: "15%", left: "80%" }, // top-right
    { top: "80%", left: "25%" }, // bottom-left
    { top: "75%", left: "75%" }, // bottom-right
  ];

  return (
    <div className="countdown-container">
      {blast &&
        blastAreas.map((area, idx) => (
          <div
            key={idx}
            className="blast-effect"
            style={{
              top: area.top,
              left: area.left,
              position: "absolute", // ✅ ensures independent positioning
              transform: "translate(-50%, -50%)",
            }}
          >
            {Array.from({ length: 3 }).map((_, wave) =>
              Array.from({ length: 40 }).map((_, i) => {
                const hue = Math.floor(Math.random() * 360);
                const x = Math.random() * 500 - 250;
                const y = Math.random() * 500 - 250;
                const delay = wave * 0.3 + Math.random() * 0.2;
                return (
                  <span
                    key={`${idx}-${wave}-${i}`}
                    className="particle"
                    style={
                      {
                        "--hue": hue,
                        "--x": x,
                        "--y": y,
                        "--delay": `${delay}s`,
                      } as React.CSSProperties
                    }
                  ></span>
                );
              })
            )}
          </div>
        ))}

      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>

      <div className="website-background">
        <iframe src="about:blank" title="background" frameBorder="0"></iframe>
      </div>

      <div className="countdown-overlay">
        <div className="main-content">
          <h1>KBA REC</h1>
          <p className="tagline">
            At KBA, we don't follow trends, <br />
            we build the chain that defines them.
          </p>
          <p className="launch-text">Launching Soon:</p>

          <div id="countdown">
            <div className="time-box">
              <span className="number">{days}</span>
              <span className="label">Days</span>
            </div>
            <div className="time-box">
              <span className="number">{hours}</span>
              <span className="label">Hours</span>
            </div>
            <div className="time-box">
              <span className="number">{minutes}</span>
              <span className="label">Minutes</span>
            </div>
            <div className="time-box">
              <span className="number">{seconds}</span>
              <span className="label">Seconds</span>
            </div>
          </div>
        </div>
      </div>

      <footer>&copy; {new Date().getFullYear()} KBA REC. All rights reserved.</footer>
    </div>
  );
}
