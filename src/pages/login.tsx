import React, { Fragment, RefObject, useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { navigate } from 'gatsby';
import { connect, useSelector } from 'react-redux';
import { updateUser } from '../state/user/actions';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import Layout from '../components/Layout';
const LOGIN_URL = '/login';

const Login = ({ path, setUsers, userState }: any) => {
  const { user, setUser }: any = useAuth();
  const userRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const errRef: RefObject<HTMLParagraphElement> =
    useRef<HTMLParagraphElement>(null);

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
        LOGIN_URL,
        JSON.stringify({ email: username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const accessToken = response.data.access_token;
      const roles = response.data.role;
      setUser({
        user: username,
        role: roles,
        name: response.data.name,
        access_token: accessToken,
      });
      navigate('/user/profile/', { replace: true });
    } catch (err) {}
  };
  return (
    <Layout>
      <section>
        {success ? (
          <Fragment>Logged in</Fragment>
        ) : (
          <Fragment>
            <p ref={errRef}>{error}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
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
              <button>Sign In</button>
            </form>
            <br />
            <p>
              Need to <a href="/signup">Sign Up</a>?
            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
