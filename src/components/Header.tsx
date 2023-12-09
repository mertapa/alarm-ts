import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Clock</Link>
          </li>
          <li>
            <Link to="/alarm">Alarm</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
