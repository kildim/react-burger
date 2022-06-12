// @ts-nocheck
import React, {useContext, useMemo} from 'react';
import Loader from '../loader/loader';
import Error from '../error/error';

import AppHeader from '../app-header/app-header';
import Builder from '../builder/builder';
import {API_URL} from '../../constants/env-config';
import {AppContext} from '../../services/app-context';

import './app.css';
import {useSelector} from 'react-redux';
import {loadIngredients} from '../../services/actions/action';
import IngredientDetail from '../ingredient-detail/ingredient-detail';
import OrderDetail from '../order-detail/order-detail';


function App() {
  const {isLoading, isError, errorMessage} = useSelector((store) => ({
    isLoading: store.isLoading,
    isError: store.isError,
    errorMessage: store.errorMessage,
  }));

  return (
    <>
      {
        isLoading ? <Loader/> :
          isError ? <Error error={errorMessage}/> :
            <>
              <AppHeader/>
              <main>
                <Builder/>
              </main>
              <OrderDetail />
              <IngredientDetail />
            </>
      }
    </>
  )
}

export default App;
