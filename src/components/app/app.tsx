import React from 'react';

import AppHeader from '../app-header/app-header';
import Builder from '../builder/builder';
import {data, burger} from '../../utils/data';

import './app.css';

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <Builder data={data} burger={burger}/>
      </main>
    </>
  )
    ;
}

export default App;
