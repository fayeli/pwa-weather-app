import React from 'react';
import weather from '../weather.svg';

const Header = () => {
    return (
        <header className="App-header">
            <img src={weather} className="App-logo" alt="logo" />
            <p>
                Progressive Weather App
        </p>
        </header>
    );
};

export default Header;
