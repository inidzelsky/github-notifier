import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-3'>
      <h1 className='text-white mr-auto'>
        <i className='fab fa-github' />
        {' '}
        Github Notifier
      </h1>

      <ul className='navbar-nav justify-content-end'>
          <li className='navbar-item mr-3'>
            <Link to="/login"><h5 className='text-white'>Login</h5></Link>
          </li>

          <li className='navbar-item mr-3'>
            <Link to="/register"><h5 className='text-white'>Register</h5></Link>
          </li>

          <li className='navbar-item'>
            <Link to="/send"><h5 className='text-white'>Send</h5></Link>
          </li>
      </ul>
    </nav>
  );
}

export default Navbar;