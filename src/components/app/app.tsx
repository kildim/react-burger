import React from 'react';
import './app.css';
import {data, burger} from '../../utils/data';
import Menu from '../menu/menu'
import Builder from '../builder/builder';

function App() {
  return (
    <>
      <header className={'header'}>
        <Menu/>
      </header>
      <main>
        <Builder data={data} burger={burger}/>
      </main>
    </>
  )
    ;
}

export default App;
