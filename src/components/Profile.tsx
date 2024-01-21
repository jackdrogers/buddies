import React from 'react';
import useAuth from '../hooks/useAuth';
// import { getUser } from '../services/auth';

const Profile = ({ path }: any) => {
  const { user }: any = useAuth();
  return (
    <>
      <h1>Your {user.role === 'admin' ? 'ADMIN' : ''} profile</h1>
      <ul>
        <li>E-mail: {user?.user}</li>
        <li>Role: {user?.role}</li>
      </ul>
    </>
  );
};

export default Profile;
