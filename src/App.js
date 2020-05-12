import React from 'react';
import weather from './weather.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={weather} className="App-logo" alt="logo" />
        <p>
          Progressive Weather App
        </p>
        <p className="App-blue-text">
          <i>Coming Soon</i>
        </p>
      </header>
    </div>
  );
}

export default App;
