//@ts-nocheck


import {
  saveUserProfile, setIsAuthenticated,
  showRecoverPasswordNotification,
  showResetPasswordNotification
} from '../actions/auth-action';
import {
  setIsLoading,
  showErrorMessage,
} from '../actions/action';
import {API_URL} from '../../constants/env-config';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {deleteCookie, getCookie, setCookie} from '../../utils/utils';

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(res.status);


export function useAuth() {
  const nick = useSelector((store) => store.auth.nick);
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated)
  const history = useHistory();

  const postRememberPasswordNotification = (email) => (dispatch, _getState) => {
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
        dispatch(showRecoverPasswordNotification(res))
      })
      .catch((error) => {
        dispatch(showErrorMessage({errorMessage: error}));
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

  const postResetPassword = (requestBody) => (dispatch, _getState) => {
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
        dispatch(showResetPasswordNotification(res))
      })
      .catch((error) => {
        dispatch(showErrorMessage({errorMessage: error}));
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

  const postRegister = (requestBody) => (dispatch, _getState) => {
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
        dispatch(saveUserProfile(res.user))
        history.push('/')
      })
      .catch((error) => {
        dispatch(showErrorMessage({errorMessage: error}));
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

  const signIn = (requestBody) => (dispatch, _getState) => {
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
          setCookie('authorization', res.accessToken);
          localStorage.setItem('authorization', res.refreshToken);
        } else {
          throw('Сервер не авторизировал!')
        }
      })
      .catch((error) => {
        dispatch(setIsAuthenticated(false));
        dispatch(showErrorMessage({errorMessage: error}));
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

  const signOut = () => (dispatch, _getState) => {
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
        history.push('/')
      })
      .catch((error) => {
        dispatch(setIsAuthenticated(false));
        dispatch(showErrorMessage({errorMessage: error}));
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

return {postRememberPasswordNotification, postResetPassword, signIn, signOut, isAuthenticated, postRegister}
}
