import React from 'react';
import './app.css';
import data from '../../utils/data';
import Menu from '../menu/menu'
import Constructor from '../constructor/constructor';

function App() {
  return (
    <>
      <header className={'header'}>
        <Menu/>
      </header>
      <main>
        <Constructor data={data}/>
      </main>
    </>
)
  ;
}

export default App;
