//@ts-nocheck


import {
  saveUserProfile, setIsAuthenticated, setIsUserDataLoading,
  showRecoverPasswordNotification,
  showResetPasswordNotification
} from '../actions/auth-action';
import {
  setIsLoading,
  showErrorMessage,
} from '../actions/action';
import {API_URL} from '../../constants/env-config';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {deleteCookie, getCookie, setCookie} from '../../utils/utils';
// import {useState} from 'react';

const checkResponse = (res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export function useAuth() {
  const nick = useSelector((store) => store.auth.nick);
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated)
  const history = useHistory();
  const dispatch = useDispatch();
  let isExpired = false;

  // export const updateToken = () => {
  //   return fetch(`${API_URL}/auth/token`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json;charset=utf-8",
  //     },
  //     body: JSON.stringify({
  //       token: localStorage.getItem("refreshToken"),
  //     }),
  //   }).then(checkReponse);
  // };
  //
  // export const fetchWithRefresh = async (url, options) => {
  //   try {
  //     const res = await fetch(url, options);
  //     return await checkReponse(res);
  //   } catch (err) {
  //     if (err.message === "jwt expired") {
  //       const refreshData = await updateToken(); //обновляем токен
  //       if (!refreshData.success) {
  //         return  Promise.reject(refreshData);
  //       }
  //       localStorage.setItem("refreshToken", refreshData.refreshToken);
  //       setCookie("accessToken", refreshData.accessToken);
  //       options.headers.authorization = refreshData.accessToken;
  //       const res = await fetch(url, options); //повторяем запрос
  //       return await checkReponse(res);
  //     } else {
  //       return Promise.reject(err);
  //     }
  //   }
  // };

  const updateToken = (refreshToken) => {
    isExpired = true;
    const options = {
      method: "POST",
      body: JSON.stringify({token: refreshToken}),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };
    fetch(`${API_URL}/auth/token`, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setCookie('authorization', res.accessToken);
          localStorage.setItem('authorization', res.refreshToken);
        }else {
          throw('Сервер не обновил токен!')
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        // dispatch(getUserData())
      })
  }

  const getUserData = () => (dispatch, _getState) => {
      const accessToken = getCookie('authorization');
      const refreshToken = localStorage.getItem('authorization');

      if (!accessToken || !refreshToken) {
        return null
      }

      dispatch(setIsUserDataLoading(true));
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken,
        },
      };

      fetch(`${API_URL}/auth/user`, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            dispatch(saveUserProfile(res.user));
            dispatch(setIsAuthenticated(true));
            dispatch(setIsUserDataLoading(false))
          } else {
            if (res.message === "jwt expired" && isExpired === false) {
              updateToken(refreshToken);
            } else {
              dispatch(setIsUserDataLoading(false))
            }
          }
        })
        .catch((error) => {
          dispatch(showErrorMessage({errorMessage: error}));
          dispatch(setIsUserDataLoading(false))
        })
  }

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

return {postRememberPasswordNotification, postResetPassword, signIn, signOut, isAuthenticated, postRegister, getUserData}
}
