import { Fragment, FunctionComponent } from 'react';
import useAuth from '../hooks/useAuth';
import React from 'react';
import { navigate } from 'gatsby';

type AuthTypes = {
  children: any;
  path: any;
  role: string;
};

const RequireAuth: FunctionComponent<AuthTypes> = ({
  role,
  children,
  path,
}) => {
  const { user }: any = useAuth();

  if (user) {
    if (user.role === role) return <Fragment>{children}</Fragment>;
    else {
      navigate('/', { replace: true });
    }
  } else {
    navigate('/login', { replace: true });
    return null;
  }
};

export default RequireAuth;
