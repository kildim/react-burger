// @ts-nocheck
import React from 'react';
import Loader from '../loader/loader';
import Error from '../error/error';
import Modal from '../modal/modal';

import AppHeader from '../app-header/app-header';
import Builder from '../builder/builder';
import {burger} from '../../utils/data';
import {API_URL} from '../../constants/env-config';

import './app.css';

function App() {
  const [state, setState] = React.useState({data: [], isLoading: true, error: null, showModal: true})

  const handleModalClose = () => {
    console.log('CLOSE');
    setState({...state, showModal: false})
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(API_URL);
        const serverData = await res.json();

        setState({...state, data: serverData.data, isLoading: false})
      } catch (error) {
        console.log(error.message)
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
              {state.showModal && <Modal header={'Модальное окно'} show={true} onCloseClick={handleModalClose}><h1>GHJKL</h1></Modal>}
            </>

    }

    </>
  )
}

export default App;
