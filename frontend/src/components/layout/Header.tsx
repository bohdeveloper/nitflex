import React from 'react';
import nitflexLogo from "../../assets/images/nitflex-logo.png";
import './Header.css';

const Header: React.FC = () => {
  return (
    <header>
      <div className="logo">
        <a href="/inicio">
          <img src={nitflexLogo} alt="Nitflex Logo" className="nitflex-logo" />
        </a>
      </div>
    </header>
  );
};

export default Header;