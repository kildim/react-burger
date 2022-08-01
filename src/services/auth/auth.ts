import {
  saveUserProfile, setAuthChecked, setIsAuthenticated, setIsUserDataLoading,
  showRecoverPasswordNotification, showResetPasswordNotification,
} from '../actions/auth-action';
import {
  setIsLoading,
  showErrorMessage,
} from '../actions/action';
import {API_URL} from '../../constants/env-config';
// import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {deleteCookie, getCookie, setCookie, checkResponse} from '../../utils/utils';
import {fetchWithRefresh} from '../../utils/fetch-with-refreash';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../../index';
import {useAppSelector} from '../app-hooks';
export function useAuth() {
  const nick = useAppSelector((store) => store.auth.nick);
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated)
  const isAuthChecked = useAppSelector((store) => store.auth.isAuthChecked);

  const history = useHistory();

  const getUserData = (): ThunkAction<any, any, any, any> => (dispatch, _getState) => {
    const accessToken = getCookie("authorization");
    dispatch(setIsUserDataLoading(true));
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken || '',
      },
    };

    fetchWithRefresh(`${API_URL}/auth/user`, options)
      .then((res) => {
        if (res.success) {
          dispatch(saveUserProfile(res.user));
          dispatch(setAuthChecked(true));
        } else {
          throw res;
        }
      })
      .catch((error) => {
        dispatch(showErrorMessage(error.message));

      })
      .finally(() => {
        dispatch(setIsUserDataLoading(false));
        dispatch(setAuthChecked(true));
      })
  };

  const postRememberPasswordNotification = (email: string): ThunkAction<any, any, any, any> => (dispatch, _getState) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({email: email}),
      headers: {
        'Content-Type': 'application/json'
      },
    };

    dispatch(setIsLoading(true));
    fetch(`${API_URL}/password-reset`, options)
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch(showRecoverPasswordNotification(res));
        }
      })
      .catch((error) => {
        dispatch(showErrorMessage({errorMessage: error.message}));
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

  const postResetPassword = (requestBody: any): ThunkAction<any, any, any, any> => (dispatch, _getState) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      },
    };


    dispatch(setIsLoading(true));
    fetch(`${API_URL}/password-reset/reset`, options)
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch(showResetPasswordNotification(res))
        }
      })
      .catch((error) => {
        dispatch(showErrorMessage({errorMessage: error.message}));
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

  const postRegister = (requestBody: any): ThunkAction<any, any, any, any> => (dispatch, _getState) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      },
    }
    dispatch(setIsLoading(true));
    fetch(`${API_URL}/auth/register`, options)
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          setCookie('authorization', res.accessToken, {});
          localStorage.setItem('authorization', res.refreshToken);
          dispatch(saveUserProfile(res.user))
          history.push('/')
        } else {
          throw ('Сервер не зарегистрировал!')
        }
      })
      .catch((error) => {
        dispatch(showErrorMessage(error.message));
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

  const signIn = (requestBody: any):ThunkAction<any, any, any, any> => (dispatch, _getState) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      },
    }
    dispatch(setIsLoading(true));
    fetch(`${API_URL}/auth/login`, options)
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch(saveUserProfile(res.user));
          dispatch(setIsAuthenticated(true));
          setCookie('authorization', res.accessToken, {});
          localStorage.setItem('authorization', res.refreshToken);
        } else {
          throw('Сервер не авторизировал!')
        }
      })
      .catch((error) => {
        dispatch(setIsAuthenticated(false));
        dispatch(showErrorMessage(error.message));
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

  const signOut = (): ThunkAction<any, any, any, any> => (dispatch, _getState) => {
    const refreshToken = localStorage.getItem('authorization');
    const options = {
      method: 'POST',
      body: JSON.stringify({token: refreshToken}),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    dispatch(setIsLoading(true));
    fetch(`${API_URL}/auth/logout`, options)
      .then(checkResponse)
      .then((_res) => {
        dispatch(setIsAuthenticated(false));
        deleteCookie('authorization');
        localStorage.removeItem('authorization');
        dispatch(setAuthChecked(true));
        dispatch(saveUserProfile({
          email: null,
          name: null
        }));
        history.push('/')
      })
      .catch((error) => {
        dispatch(setIsAuthenticated(false));
        dispatch(showErrorMessage({errorMessage: error}));
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

  return {
    postRememberPasswordNotification,
    postResetPassword,
    signIn,
    signOut,
    isAuthenticated,
    postRegister,
    getUserData,
    isAuthChecked,
    nick,
  }
}
