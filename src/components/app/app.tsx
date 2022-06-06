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


function App() {
  const {isLoading, isError, errorMessage} = useSelector((store) => ({
    isLoading: store.isLoading,
    isError: store.isError,
    errorMessage: store.errorMessage,
  }));


  // const [state, setState] = React.useState({data: [], isLoading: true, error: null});
  // const appState = useMemo(() => ({state, setState}), [state, setState]);

  // React.useEffect(() => {
  //   const getData = async () => {
  //     const res = await fetch(`${API_URL}/ingredients`);
  //     try {
  //       if (res.ok) {
  //         const serverData = await res.json();
  //         setState({...state, data: serverData.data, isLoading: false})
  //       } else {
  //         setState({...state, isLoading: false, error: res.status})
  //       }
  //     } catch
  //       (error) {
  //       setState({...state, isLoading: false, error: error.message})
  //     }
  //   }
  //   getData();
  // }, [])

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
            </>
      }
    </>
  )
}

export default App;
