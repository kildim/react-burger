// @ts-nocheck
import React, {useEffect} from 'react';
import Error from '../error/error';
import AppHeader from '../app-header/app-header';
import Builder from '../../pages/builder/builder';
import './app.css';
import {useDispatch, useSelector} from 'react-redux';
import IngredientDetail from '../ingredient-detail/ingredient-detail';
import OrderDetail from '../order-detail/order-detail';
import {fetchIngredients} from '../../services/api/api';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Loader from '../loader/loader';
import SignIn from '../../pages/sign-in/sign-in';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import Ingredient from '../../pages/ingredient/ingredient';
import RecoverPasswordNotification from '../RecoverPasswordNotification/RecoverPasswordNotification';
import ResetPasswordNotification from '../ResetPasswordNotification/ResetPasswordNotification';
import ProtectedRoute from '../protected-route/protected-route';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchIngredients());
    }, [dispatch]
  );

  const {isLoading, showErrorMessage} = useSelector((store) => ({
    //@ts-ignore
    isLoading: store.main.isLoading,
    showErrorMessage: store.main.showErrorMessage,
  }));

  return (
    <Router>
      {isLoading ? <Loader/> :
      showErrorMessage ? <Error /> :
        (<>
            {/*<Router>*/}
              <AppHeader/>
              <main>
                <Switch>
                  <Route path="/" exact={true}>
                    <Builder/>
                  </Route>
                  <Route path="/login" exact={true}>
                    <SignIn />
                  </Route>
                  <Route path="/register" exact={true}>
                    <Register />
                  </Route>
                  <Route path="/forgot-password" exact={true}>
                    <ForgotPassword />
                  </Route>
                  <Route path="/reset-password" exact={true}>
                    <ResetPassword />
                  </Route>
                  {/*<Route path="/profile">*/}
                  {/*  <Profile />*/}
                  {/*</Route>*/}
                  <ProtectedRoute path="/profile">
                    <Profile />
                  </ProtectedRoute>
                  <Route path="/ingredient/:id" exact={true}>
                    <Builder/>
                    <Ingredient />
                  </Route>
                  <Route>
                    <Redirect to={'/'}/>
                  </Route>
                </Switch>
              </main>
              <OrderDetail/>
              <IngredientDetail/>
              <RecoverPasswordNotification/>
              <ResetPasswordNotification/>
            {/*</Router>*/}
          </>
        )}
    </Router>
  )


}

export default App;
