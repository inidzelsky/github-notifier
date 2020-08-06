import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar navbar-dark bg-primary mb-3'>
      <h1 className='text-white'>
        <i className='fab fa-github'></i>
        {' '}
        Github Notifier
      </h1>
    </nav>
  );
}

export default Navbar;