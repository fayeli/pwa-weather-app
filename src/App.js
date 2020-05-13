import React from 'react';
import './App.css';
import weatherSVG from './weather.svg';
import OfflineBanner from './components/OfflineBanner';
import SevenDayForecast from './components/SevenDayForecast';

class App extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    locationErr: '',
    isOffline: false,
  }

  componentDidMount() {
    this.getLocation();
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
          <SevenDayForecast lat='1.308' lon='103.863' />
          <p className="App-blue-text">
            Forecast for your favourite cities <i>(Coming Soon)</i>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
