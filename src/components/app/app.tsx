import React, {useEffect} from 'react';
import Error from '../error/error';
import AppHeader from '../app-header/app-header';
import Builder from '../../pages/builder/builder';
import './app.module.css';
import IngredientDetail from '../ingredient-detail/ingredient-detail';
import OrderDetail from '../order-detail/order-detail';
import {fetchIngredients} from '../../services/api/api';
import {Switch, Route, Redirect, useHistory, RouteProps, RouteComponentProps, matchPath} from 'react-router-dom';
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
import OrdersList from '../../pages/orders-list/orders-list';
import {hideOrderComplete} from '../../services/actions/feed-action';
import OrderComplete from '../order-complete/order-complete';
import OrderExhaustive from '../../pages/order-exhaustive/order-exhaustive';
import {useAppDispatch, useAppSelector} from '../../services/app-hooks';

function App() {

  const dispatch = useAppDispatch();
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
  );


  const showErrorMessage = useAppSelector((store) => (store.main.showErrorMessage));
  const isLoading = useAppSelector((store) => (store.main.isLoading));
  const showOrderDetail = useAppSelector((state) => (state.main.showOrderDetail));
  const showIngredientDetail = useAppSelector((state) => (state.main.showIngredientDetail));
  const showPasswordRecoverNotification = useAppSelector((state) => state.auth.showPasswordRecoverNotification)
  const passwordRecoverNotification = useAppSelector((state) => {
    return state.auth.passwordRecoverStatus?.success ? 'Письмо с сылкой успешно выслано на почту!' : 'Сервер не подтвердил отправку письма на почту!'
  })
  const passwordRecoverStatus = useAppSelector((state) => state.auth.passwordRecoverStatus?.success);
  const showPasswordResetNotification = useAppSelector((state) => state.auth.showPasswordResetNotification);
  const passwordResetNotification = useAppSelector((state) => {
    return state.auth.passwordResetStatus?.success ? 'Пароль сброшен успешно!' : 'Сервер не подтвердил сброс пароля!';
  })
  const passwordResetStatus = useAppSelector((state) => state.auth.passwordResetStatus?.success);


  const handleCloseOrderDetailPopup = () => {
    dispatch(hideOrderDetail())
  }
  const handleCloseOrderCompletePopup = () => {
    dispatch(hideOrderComplete())
    history.replace('/feed');
  }
  const handleCloseProfileOrderCompletePopup = () => {
    dispatch(hideOrderComplete())
    history.replace('/profile/orders');
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
  const handleCloseIngredientDetailPopup = () => {
    dispatch(hideIngredientDetail())
    history.replace('/');
  }

  const profileRender = (props: RouteComponentProps) => {
    const locationState = props.location.state;
    const matchRoute = matchPath<{id: string}>( props.location.pathname, {path: '/profile/orders/:id'});
    let result: JSX.Element | null;
    result =  matchRoute === null ?  <Profile />
      :
      locationState === undefined ? <OrderExhaustive orderId={matchRoute.params.id}/>
        :
        <>
          <Profile />
          <Modal
            header={''}
            onClosePopup={handleCloseProfileOrderCompletePopup}
            children={<OrderComplete />}
            drillProp={{orderId: matchRoute.params.id}}
          />
        </>
    return result;
  }

  const orderListRender = (props: RouteComponentProps) => {
    const locationState = props.location.state;
    const matchRoute = matchPath<{id: string}>( props.location.pathname, {path: '/feed/:id'});
    let result: JSX.Element | null;

    result = matchRoute === null ?  <OrdersList />
      :
      locationState === undefined ? <OrderExhaustive orderId={matchRoute.params.id}/>
        :
        <>
          <OrdersList />
          <Modal
            header={''}
            onClosePopup={handleCloseOrderCompletePopup}
            children={<OrderComplete />}
            drillProp={{orderId: matchRoute.params.id}}
          />
        </>
    return result;
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
                <ProtectedRoute path="/profile" render={profileRender} />
                <Route path="/ingredient/:id" exact={true}>
                  <Builder/>
                  <Ingredient/>
                </Route>
                <Route path="/feed" render={orderListRender} />
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
              <Modal header={'Детали ингредиента'} onClosePopup={handleCloseIngredientDetailPopup}
                children={<IngredientDetail />} />
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
