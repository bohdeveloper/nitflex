import { Link } from "react-router-dom";
import nitflexLogo from "../../assets/images/nitflex-logo.png";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

const Header: React.FC = () => {
  const { token, perfilActivo } = useAuth();

  const getLogoPath = () => {
    if (!token) return "/";
    if (token && !perfilActivo) return "/perfiles";
    return "/home";
  };

  return (
    <header>
      <div className="logo">
        <Link to={getLogoPath()}>
          <img
            src={nitflexLogo}
            alt="Nitflex Logo"
            className="nitflex-logo"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;