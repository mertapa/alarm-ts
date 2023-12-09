// pages/AlarmPage.tsx
import React, { useState, useEffect } from 'react';
import Alarm from '../components/Alarm';
import './AlarmPage.css';

const AlarmPage: React.FC = () => {
  const [alarms, setAlarms] = useState<string[]>([]);
  const [newAlarm, setNewAlarm] = useState<string>('');

  useEffect(() => {
    const storedAlarms = localStorage.getItem('alarms');
    if (storedAlarms) {
      setAlarms(JSON.parse(storedAlarms));
    }
  }, []);

  const handleAddAlarm = () => {
    if (newAlarm.trim() !== '') {
      setAlarms([...alarms, newAlarm]);
      setNewAlarm('');
      localStorage.setItem('alarms', JSON.stringify([...alarms, newAlarm]));
    }
  };

  const handleDeleteAlarm = (index: number) => {
    const updatedAlarms = [...alarms];
    updatedAlarms.splice(index, 1);
    setAlarms(updatedAlarms);
    localStorage.setItem('alarms', JSON.stringify(updatedAlarms));
  };

  return (
    <div className="alarm-page">
      <h2>Alarm Ekle</h2>
      <div className="alarm-form">
        <input
          type="time"
          value={newAlarm}
          onChange={(e) => setNewAlarm(e.target.value)}
        />
        <button onClick={handleAddAlarm}>Alarm Ekle</button>
      </div>
      <ul className="alarm-list">
        {alarms.length > 0 ? (
          alarms.map((alarm, index) => (
            <li key={index} className="alarm-list-item">
              <span>{alarm}</span>
              <button onClick={() => handleDeleteAlarm(index)}>Sil</button>
            </li>
          ))
        ) : (
          <li>Henüz alarm eklenmemiş.</li>
        )}
      </ul>
    </div>
  );
};

export default AlarmPage;
