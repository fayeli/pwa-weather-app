import React from 'react';
import './App.css';
import weatherSVG from './weather.svg';
import openweather from './api/openweather';

class App extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    locationErr: '',
  }

  componentDidMount() {
    this.getLocation();
    this.getForecast();
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
        this.setState({ locationErr: err.message });
      }
    );
  }

  getForecast() {
    openweather.get('/onecall', {
      params: {
        lat: 1.30,
        lon: 103.86
      }
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={weatherSVG} className="App-logo" alt="logo" />
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
