import { Link } from 'react-router-dom';
import './style.css';
import LogoSvg from '../LogoSvg'

function Header() {
  return (
    <header className="container-header">
      <Link to="/" className="logo">
        <LogoSvg></LogoSvg>
        MonkeyMon
      </Link>
      <Link to="/team" className='team-header'>
      Team
      </Link>
    </header>
  );
}

export default Header;