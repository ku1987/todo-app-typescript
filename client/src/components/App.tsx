import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { APP_TITLE } from 'biz/const';

function App() {
  useEffect(() => {
    document.title = `${APP_TITLE}`;
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p
          ref={(input) => {
            console.log(input);
          }}
        >
          Edited! <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
