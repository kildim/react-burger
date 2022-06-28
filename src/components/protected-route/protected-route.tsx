import {Redirect, Route, useLocation} from 'react-router-dom';
import {useAuth} from '../../services/auth/auth';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchIngredients} from '../../services/api/api';

function ProtectedRoute(props: any) {
  const [isUserLoaded, setUserLoaded] = useState(false);
  const {isAuthenticated, getUserData} = useAuth();
  const location = useLocation();
  const {isLoading} = useSelector((store) => ({
    //@ts-ignore
    isLoading: store.main.isLoading,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location.pathname }
        }}
      />
    )
  }

  return <Route {...props} />
}

export default ProtectedRoute;