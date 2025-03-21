import { Link } from 'react-router-dom';
import './style.css';

function Header() {
  return (
    <header className="container-header">
      <Link to="/" className="logo">
        MonkeyMon
      </Link>
    </header>
  );
}

export default Header;