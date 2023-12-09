import React, { useState, useEffect } from 'react';
import './Clock.css';

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  const updateClock = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    setCurrentTime(`${hours}:${minutes}:${seconds}`);
  };

  useEffect(() => {
    // Sayfa yüklendiğinde saat bilgisini güncelle
    updateClock();

    // Her saniyede bir saat bilgisini güncelle
    const intervalId = setInterval(updateClock, 1000);

    // Component unmount olduğunda interval'i temizle
    return () => clearInterval(intervalId);
  }, []); // Boş dependency array, sadece bir kere çalıştırılmasını sağlar.

  return <div className="clock">{currentTime}</div>;
};

export default Clock;
