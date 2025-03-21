import './style.css';
import { Link } from 'react-router-dom';
import LaprasImg from '../../assets/images/lapras.png';
import RedImg from '../../assets/images/red.png';

function Banner() {
  return (
    <div className="banner">
      <span className="banner-first-container">
        <div className="banner-text-container">
          <div className="first-banner-text">
            Welcome!
          </div>
          <div className="first-banner-sub-text">
            Search for your favorite Pokémon and build your team
          </div>
        </div>
        <img src={LaprasImg} className="img-lapras" alt="Lapras" />
      </span>
      <Link to="/team">
        <div className="banner-second-container">
          <img src={RedImg} className="img-red" alt="Red" />
          <div className="banner-gradient"></div>
          <div className="banner-second-container-text">Manage Team</div>
        </div>
      </Link>
    </div>
  );
}

export default Banner;
