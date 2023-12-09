import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClockPage from './pages/ClockPage';
import AlarmPage from './pages/AlarmPage';
import Header from './components/Header';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/alarm" element={<AlarmPage />} />
          <Route path="/" element={<ClockPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
