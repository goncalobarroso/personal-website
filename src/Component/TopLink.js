import { Link } from 'react-router-dom';

function TopLink({handleLinkHover , handleLinkLeave}) {
    return (
      <div className="top-link-container">
            <Link to="/" className='top-link'>
                home
            </Link>
            <Link to="/create" className='top-link'>
                create pattern
            </Link>
            <Link to="/about" className='top-link'>
                about
            </Link>
      </div>  
    );
}

export default TopLink;