import { useStore, useSelector } from 'react-redux';
import { clearUser, updateUser } from '../state/user/actions';

const useAuth = () => {
  const { dispatch } = useStore();

  return {
    user: useSelector((state: any) => state.user),
    setUser: (data: any) => {
      updateUser(data)(dispatch);
    },
    clearUser: () => clearUser()(dispatch),
  };
};

export default useAuth;
