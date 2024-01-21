import React, { Fragment } from 'react';
import '../styles/styles.scss';
import NavBar from './Navbar';
import useAuth from '../hooks/useAuth';

const Layout = ({ children }: any) => {
  const { user } = useAuth();
  console.log(user);
  return (
    <main>
      {user && <NavBar />}
      <div
        className="d-flex flex-column p-3"
        style={{ width: '-webkit-fill-available' }}
      >
        {children}
      </div>
    </main>
  );
};

export default Layout;
