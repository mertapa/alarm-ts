// components/Alarm.tsx
import React from 'react';

interface AlarmProps {
  time: string;
  onDelete: () => void;
}

const Alarm: React.FC<AlarmProps> = ({ time, onDelete }) => {
  return (
    <li className="alarm-list-item">
      <span>{time}</span>
      <button onClick={onDelete}>Sil</button>
    </li>
  );
};

export default Alarm;
