import React, {useEffect} from 'react';
import Error from '../error/error';
import AppHeader from '../app-header/app-header';
import Builder from '../../pages/builder/builder';
import './app.module.css';
import {useDispatch, useSelector} from 'react-redux';
import IngredientDetail from '../ingredient-detail/ingredient-detail';
import OrderDetail from '../order-detail/order-detail';
import {fetchIngredients} from '../../services/api/api';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
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
import {
  hideRecoverPasswordNotification,
  hideResetPasswordNotification,
  setAuthChecked
} from '../../services/actions/auth-action';
import {useAuth} from '../../services/auth/auth';
import Modal from '../modal/modal';
import {hideIngredientDetail, hideOrderDetail} from '../../services/actions/action';
import {RootState} from '../../index';
import OrdersList from '../../pages/orders-list/orders-list';

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
    }, [dispatch, getUserData]
  )

  const showErrorMessage = useSelector<RootState>((store) => (store.main.showErrorMessage));
  const isLoading = useSelector<RootState>((store) => (store.main.isLoading));
  const showOrderDetail = useSelector<RootState>((state) => (state.main.showOrderDetail));
  const showIngredientDetail = useSelector<RootState>((state) => (state.main.showIngredientDetail));
  const showPasswordRecoverNotification = useSelector<RootState, boolean>((state) => state.auth.showPasswordRecoverNotification)
  const passwordRecoverNotification = useSelector<RootState, string>((state) => {
    return state.auth.passwordRecoverStatus?.success ? 'Письмо с сылкой успешно выслано на почту!' : 'Сервер не подтвердил отправку письма на почту!'
  })
  const passwordRecoverStatus = useSelector<RootState, boolean | undefined>((state) => state.auth.passwordRecoverStatus?.success);
  const showPasswordResetNotification = useSelector<RootState, boolean>((state) => state.auth.showPasswordResetNotification);
  const passwordResetNotification = useSelector<RootState, string>((state) => {
    return state.auth.passwordResetStatus?.success ? 'Пароль сброшен успешно!' : 'Сервер не подтвердил сброс пароля!';
  })
  const passwordResetStatus = useSelector<RootState, boolean | undefined>((state) => state.auth.passwordResetStatus?.success);


  const handleCloseOrderDetailPopup = () => {
    dispatch(hideOrderDetail())
  }
  const handleCloseIngredientDetailPopup = () => {
    dispatch(hideIngredientDetail())
    history.replace('/');
  }
  const handleClosePasswordRecoverNotificationPopup = () => {
    dispatch(hideRecoverPasswordNotification());
    if (passwordRecoverStatus) {
      history.push('/reset-password')
    }
  }
  const handleCloseResetPasswordNotificationPopup = () => {
    dispatch(hideResetPasswordNotification());
    if (passwordResetStatus) {
      history.push('/login')
    }
  }

  // @ts-ignore
  // @ts-ignore
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
                <Route path="/feed" exact={true}>
                  <OrdersList />
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
                <IngredientDetail />
              </Modal>
            }
            {
              showPasswordRecoverNotification &&
              <Modal header={passwordRecoverNotification} onClosePopup={handleClosePasswordRecoverNotificationPopup}>
                <RecoverPasswordNotification onClosePopup={handleClosePasswordRecoverNotificationPopup}/>
              </Modal>
            }
            {
              showPasswordResetNotification &&
              <Modal header={passwordResetNotification} onClosePopup={handleCloseResetPasswordNotificationPopup}>
                <ResetPasswordNotification onClosePopup={handleCloseResetPasswordNotificationPopup}/>
              </Modal>
            }
          </>
        )
  )
}

export default App;
