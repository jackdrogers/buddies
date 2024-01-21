import React, { Fragment, RefObject, useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { navigate } from 'gatsby';
import { connect, useSelector } from 'react-redux';
import { updateUser } from '../state/user/actions';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import Layout from '../components/Layout';
const LOGIN_URL = '/logout';

const Login = ({ path, setUsers, userState }: any) => {
  const { user, clearUser }: any = useAuth();

  useEffect(() => {
    if(!user) navigate('/login/', { replace: true });
  }, [user]);

  useEffect(() => {
    if (user) {
      axios
        .post(
          LOGIN_URL,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.status === 'success') {
            clearUser();
          }
        });
    }
  }, []);

  return (
    <Layout>
      <section>Logging out...</section>
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
