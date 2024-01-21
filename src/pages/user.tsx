import React from 'react';
import { Router } from '@reach/router';
import Layout from '../components/Layout';
import Profile from '../components/Profile';
import RequireAuth from '../components/RequireAuth';

const App = () => (
  <Layout>
    <Router>
      <RequireAuth role="user" path="/user">
        <Profile path="/profile" />
      </RequireAuth>
      <RequireAuth role="admin" path="/user/admin">
        <Profile path="/profile" />
      </RequireAuth>
    </Router>
  </Layout>
);

export default App;
