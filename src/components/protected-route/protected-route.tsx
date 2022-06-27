import {Redirect, Route, useLocation} from 'react-router-dom';
import {useAuth} from '../../services/auth/auth';

function ProtectedRoute(props: any) {
const {isAuthenticated} = useAuth();
  const location = useLocation();

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
