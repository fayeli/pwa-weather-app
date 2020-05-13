import React from 'react';
import './App.css';
import weatherSVG from './weather.svg';
import openweather from './api/openweather';
import OfflineBanner from './components/OfflineBanner';

class App extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    locationErr: '',
    isOffline: false,
  }

  componentDidMount() {
    this.getLocation();
    this.getForecast();
    this.monitorNetworkStatus();
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

  monitorNetworkStatus() {
    window.addEventListener('offline', (event) => {
      this.setState({isOffline: true});
    });
    window.addEventListener('online', (event) => {
      this.setState({isOffline: false});
    });
  }

  render() {
    const isOffline = this.state.isOffline;
    return (
      <div className="App">
        {isOffline ? <OfflineBanner /> : null}
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
