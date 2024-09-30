import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';

function Logo() {
    const location = useLocation();

    // Check if the current location is the homepage ("/")
    const isHomePage = location.pathname === '/';

    return (
        <div className="logo-container">
            {isHomePage ? (
                <a href={window.location.href}>
                    <img className="logo" src={logo} alt="Logo" />
                </a>
            ) : (
                <Link to="/">
                    <img className="logo" src={logo} alt="Logo" />
                </Link>
            )}
        </div>
    );
}

export default Logo;
