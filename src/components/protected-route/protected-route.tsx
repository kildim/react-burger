import {Redirect, Route, useLocation} from 'react-router-dom';
import {useAuth} from '../../services/auth/auth';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchIngredients} from '../../services/api/api';
import Loader from '../loader/loader';

function ProtectedRoute(props: any) {
  const {isAuthenticated, getUserData} = useAuth();
  const location = useLocation();
  const {isUserDataLoading} = useSelector((store) => ({
    // @ts-ignore
    isUserDataLoading: store.auth.isUserDataLoading
    })
  )

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  if (!isUserDataLoading) {
    return (<Loader/>);
  }

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: {from: location.pathname}
        }}
      />
    )
  }

  return <Route {...props} />
}

export default ProtectedRoute;
