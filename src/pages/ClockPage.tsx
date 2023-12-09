// pages/ClockPage.tsx
import React, { useState, useEffect } from 'react';
import '../components/Clock.css'
import Alarm from '../components/Alarm'; // Alarm bileşenini ekledik

const ClockPage: React.FC = () => {
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());
  const [alarms, setAlarms] = useState<string[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
      checkAlarms();
    }, 1000);

    // Sayfa yüklendiğinde kayıtlı alarmları getir
    const storedAlarms = localStorage.getItem('alarms');
    if (storedAlarms) {
      setAlarms(JSON.parse(storedAlarms));
    }

    return () => clearInterval(intervalId);
  }, []);

  const checkAlarms = () => {
    // Burada alarm listesini kontrol et ve eğer alarmın saati geldiyse bildirim göster
    const storedAlarms = localStorage.getItem('alarms');
    if (storedAlarms) {
      const alarms: string[] = JSON.parse(storedAlarms);

      alarms.forEach((alarm) => {
        if (alarm === currentTime) {
          showNotification();
          playAlarmSound(); // Sesli bildirim ekle
        }
      });
    }
  };

  const showNotification = () => {
    // Bildirim gösterme kodunu buraya ekleyebilirsiniz
    // Örnek olarak Notification API kullanabilirsiniz
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Alarm', {
            body: 'Alarm saati geldi!',
          });
        }
      });
    }
  };

  const playAlarmSound = () => {
    const audio = new Audio('/alarm.mp3'); // Ses dosyasının yolu
    audio.play();
  };

  const handleDeleteAlarm = (index: number) => {
    const updatedAlarms = [...alarms];
    updatedAlarms.splice(index, 1);
    setAlarms(updatedAlarms);
    localStorage.setItem('alarms', JSON.stringify(updatedAlarms));
  };

  return (
    <div className="clock-page">
      <h2>Aktüel Zaman</h2>
      <div className="clock">{currentTime}</div>

      <h2>Alarmlar</h2>
      <ul className="alarm-list">
        {alarms.length > 0 ? (
          alarms.map((alarm, index) => (
            <Alarm key={index} time={alarm} onDelete={() => handleDeleteAlarm(index)} />
          ))
        ) : (
          <li>Henüz alarm eklenmemiş.</li>
        )}
      </ul>
    </div>
  );
};

export default ClockPage;
