// @ts-nocheck
import React, {useContext, useEffect, useMemo} from 'react';
import Loader from '../loader/loader';
import Error from '../error/error';
import AppHeader from '../app-header/app-header';
import Builder from '../builder/builder';
import './app.css';
import {useDispatch, useSelector} from 'react-redux';
import IngredientDetail from '../ingredient-detail/ingredient-detail';
import OrderDetail from '../order-detail/order-detail';
import {fetchIngredients} from '../../services/api/api';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchIngredients());
    }, []
  );

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
              <OrderDetail/>
              <IngredientDetail/>
            </>
      }
    </>
  )
}

  export default App;
