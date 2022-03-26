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
  const [state, setState] = React.useState({data: [], isLoading: true, error: null})

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(API_URL);
        const serverData = await res.json();

        setState({...state, data: serverData.data, isLoading: false})
      } catch (error) {
        setState({...state, isLoading: false, error: error.message})
      }
    }

    getData();
  }, [])

  return (
    <>
    {
      state.isLoading ? <Loader/> :

          (state.error !== null) ? <Error error={state.error}/> :
            <>
              <AppHeader/>
              <main>
                <Builder data={state.data} burger={burger}/>
              </main>
            </>

    }

    </>
  )
}

export default App;
