import React, { Fragment, RefObject, useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { navigate } from 'gatsby';
import { connect, useSelector } from 'react-redux';
import { updateUser } from '../state/user/actions';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import Layout from '../components/Layout';
const REGISTER_URL = '/register';

const Register = ({ path, setUsers, userState }: any) => {
  const { setUser }: any = useAuth();
  const nameRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const userRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const errRef: RefObject<HTMLParagraphElement> =
    useRef<HTMLParagraphElement>(null);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ 
          name, email: username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const accessToken = response?.data?.access_token;
      const roles = response?.data?.role;
      setUser({ user: username, role: roles, access_token: accessToken });

      // if(roles === 'admin') {
      //   navigate('/admin/profile/', { replace: true });
      // } else {
        navigate('/user/profile/', { replace: true });
      // }
    } catch (err) {}
  };
  return (
    <Layout>
      {' '}
      <section>
        {success ? (
          <Fragment>Logged in</Fragment>
        ) : (
          <Fragment>
            <p ref={errRef}>{error}</p>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Name:</label>
              <input
                id="name"
                type="text"
                ref={nameRef}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button>Sign Up</button>
            </form>
          </Fragment>
        )}
      </section>
    </Layout>
  );
};

const mapStateToProps = (state: any) => ({
  userState: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUsers: bindActionCreators(updateUser, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
