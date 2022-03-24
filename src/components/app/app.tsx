// @ts-nocheck
import React from 'react';
import Loader from '../loader/loader';
import Error from '../error/error';

import AppHeader from '../app-header/app-header';
import Builder from '../builder/builder';
import {burger} from '../../utils/data';
import {API_URL} from '../../constants/env-config';

import './app.css';

function App() {
  const [state, setState] = React.useState({data: [], isLoading: true, isError: false})

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(API_URL);
        const serverData = await res.json();

        setState({...state, data: serverData.data, isLoading: false})
      } catch (error) {
        setState({...state, data: serverData.data, isLoading: false, setIsError: true})
      }
    }

    getData();
  }, [])
  return (
    <>
    {
      state.isLoading ? <Loader/> :
        (
          state.isError ? <Error error={'ERROR'}/> :
        <>
          <AppHeader/>
          <main>
            <Builder data={state.data} burger={burger}/>
          </main>
        </>)
    }

    </>
  )
}

export default App;
