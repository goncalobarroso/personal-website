import { Link, useLocation } from 'react-router-dom';

function Logo() {
    const location = useLocation();

    // Check if the current location is the homepage ("/")
    const isHomePage = location.pathname === '/';

    return (
        <div className="logo-container">
            {isHomePage ? (
                <a href={window.location.href}>
                    <img className="logo" src="logo.svg" alt="Logo" />
                </a>
            ) : (
                <Link to="/">
                    <img className="logo" src="logo.svg" alt="Logo" />
                </Link>
            )}
        </div>
    );
}

export default Logo;
