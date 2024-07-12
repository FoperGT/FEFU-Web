import React, { useState, useEffect } from 'react';
import './Countdown.css';

const Countdown = () => {
  const calculateTimeLeft = () => {
    const eventDate = new Date('2024-08-16T00:00:00'); 
    const currentTime = new Date();
    const difference = eventDate - currentTime;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="Countdown">
      <h2>Обратный отсчет до фэнтези-драфта</h2>
      <div className="time">
        <span>{timeLeft.days || '0'}д </span>
        <span>{timeLeft.hours || '0'}ч </span>
        <span>{timeLeft.minutes || '0'}м </span>
        <span>{timeLeft.seconds || '0'}с</span>
      </div>
    </div>
  );
};

export default Countdown;
