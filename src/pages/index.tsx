import React, { Fragment, useEffect, useState } from 'react';

import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';
import Break from '../components/Break';

const Home = () => {
  const { user }: any = useAuth();
  return (
    <Layout>
      {user ? (
        <p>{user.user}</p>
      ) : (
        <Fragment>
          <p>not logged in</p>
          <a href="/login">Login</a>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <Break />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Layout>
  );
};

export default Home;
