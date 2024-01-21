import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import useAuth from '../hooks/useAuth';
import { Dropdown } from 'react-bootstrap';

export default function NavBar({ location }: any) {
  const { user } = useAuth();
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: '280px' }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg className="bi me-2" width="40" height="32">
          <use href="#bootstrap"></use>
        </svg>
        <span className="fs-4">Buddies</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a
            href="/"
            className={`nav-link ${
              window.location.pathname === '/' ? 'active' : 'text-white'
            }`}
            aria-current="page"
          >
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#home"></use>
            </svg>
            Home
          </a>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <Dropdown>
          <Dropdown.Toggle
            as="a"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          >
            <span className="text-white">
              <strong>{user.name}</strong>
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {user.role === 'user' && (
              <li>
                <a className="dropdown-item" href="/user/profile">
                  Profile
                </a>
              </li>
            )}
            {user.role === 'admin' && (
              <li>
                <a className="dropdown-item" href="/user/admin/profile">
                  Admin
                </a>
              </li>
            )}
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="/logout">
                Sign out
              </a>
            </li>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
