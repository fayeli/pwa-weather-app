import React from 'react';
import weather from './weather.svg';
import './App.css';

class App extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    locationErr: '',
  }

  componentDidMount() {
    this.getLocation();
  }


  getLocation() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          locationErr: '',
        })
      },
      (err) => {
        this.setState({ locationErr: err.message});
      }
    );
  }

  render() {
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
}

export default App;
