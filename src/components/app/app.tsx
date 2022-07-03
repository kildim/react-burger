// @ts-nocheck
import React, {useEffect} from 'react';
import Error from '../error/error';
import AppHeader from '../app-header/app-header';
import Builder from '../../pages/builder/builder';
import './app.module.css';
import {useDispatch, useSelector} from 'react-redux';
import IngredientDetail from '../ingredient-detail/ingredient-detail';
import OrderDetail from '../order-detail/order-detail';
import {fetchIngredients} from '../../services/api/api';
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from 'react-router-dom';
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
import {getCookie} from '../../utils/utils';
import {setAuthChecked} from '../../services/actions/auth-action';
import {useAuth} from '../../services/auth/auth';
import Modal from '../modal/modal';
import {hideIngredientDetail, hideOrderDetail, showIngredientDetail} from '../../services/actions/action';

function App() {

  const dispatch = useDispatch();
  const {getUserData} = useAuth();
  const history = useHistory();

  useEffect(() => {
      dispatch(fetchIngredients());
    }, [dispatch]
  );
  useEffect(
    () => {
      const accessToken = getCookie('authorization');
      const refreshToken = localStorage.getItem('authorization');
      if (accessToken && refreshToken) {
        dispatch(getUserData());
      } else {
        dispatch(setAuthChecked(true));
      }
    }, []
  )

  const {isLoading, showErrorMessage} = useSelector((store) => ({
    //@ts-ignore
    isLoading: store.main.isLoading,
    showErrorMessage: store.main.showErrorMessage,
  }));
  const {showOrderDetail} = useSelector((state) => ({showOrderDetail: state.main.showOrderDetail}));
  const {showIngredientDetail} = useSelector((state) => ({showIngredientDetail: state.main.showIngredientDetail}))


  const handleCloseOrderDetailPopup = () => {
    dispatch(hideOrderDetail())
  }
  const handleCloseIngredientDetailPopup = () => {
    dispatch(hideIngredientDetail())
    history.replace('/');
  }

  return (
    isLoading ? <Loader/> :
      showErrorMessage ? <Error/> :
        (<>
            <AppHeader/>
            <main>
              <Switch>
                <Route path="/" exact={true}>
                  <Builder/>
                </Route>
                <Route path="/login" exact={true}>
                  <SignIn/>
                </Route>
                <Route path="/register" exact={true}>
                  <Register/>
                </Route>
                <Route path="/forgot-password" exact={true}>
                  <ForgotPassword/>
                </Route>
                <Route path="/reset-password" exact={true}>
                  <ResetPassword/>
                </Route>
                <ProtectedRoute path="/profile">
                  <Profile/>
                </ProtectedRoute>
                <Route path="/ingredient/:id" exact={true}>
                  <Builder/>
                  <Ingredient/>
                </Route>
                <Route>
                  <Redirect to={'/'}/>
                </Route>
              </Switch>
            </main>
            {
              showOrderDetail &&
              <Modal header={''} onClosePopup={handleCloseOrderDetailPopup}>
                <OrderDetail/>
              </Modal>
            }
            {
              showIngredientDetail &&
              <Modal header={'Детали ингредиента'} onClosePopup={handleCloseIngredientDetailPopup}>
                <IngredientDetail/>
              </Modal>
            }

            <RecoverPasswordNotification/>
            <ResetPasswordNotification/>
          </>
        )
  )
}

export default App;
