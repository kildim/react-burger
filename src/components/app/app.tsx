// @ts-nocheck
import React from 'react';
import Loader from '../loader/loader';
import Error from '../error/error';

import AppHeader from '../app-header/app-header';
import Builder from '../builder/builder';
import {API_URL} from '../../constants/env-config';

import './app.css';

function App() {
  const [state, setState] = React.useState({data: [], isLoading: true, error: null})

  React.useEffect(() => {
    const getData = async () => {
        const res = await fetch(`${API_URL}/ingredients`);
        if (res.ok) {
          const serverData = await res.json();
          setState({...state, data: serverData.data, isLoading: false})
        }
        else
        {setState({...state, isLoading: false, error: res.status})}
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
                <Builder data={state.data} burger={state.data}/>
              </main>
            </>
      }
    </>
  )
}

export default App;
