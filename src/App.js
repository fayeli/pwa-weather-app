import React from 'react';
import './App.css';
import weatherSVG from './weather.svg';
import OfflineBanner from './components/OfflineBanner';
import SevenDayForecast from './components/SevenDayForecast';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      locationError: null,
      locationErrorCode: null,
      isOffline: !window.navigator.onLine,
    }
  }

  componentDidMount() {
    this.monitorNetworkStatus();
  }

  getUserLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          },
          locationError: null,
          locationErrorCode: null,
        })
      },
      (err) => {
        this.setState({ 
          locationError: err.message,
          locationErrorCode: err.code
        });
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
    const locationDenied = this.state.locationErrorCode === 1; // GeolocationPositionError.PERMISSION_DENIED
    return (
      <div className="App">
        {isOffline ? <OfflineBanner /> : null}
        <header className="App-header">
          <img src={weatherSVG} className="App-logo" alt="logo" />
          <p>
            Progressive Weather App
          </p>
          <p>7 Day Forecast for your current location</p>
          <button onClick={this.getUserLocation} disabled={isOffline}>Check Now ➜</button>
          {locationDenied ? <p>We're unable to get your location. Please check your permission settings and try again.</p> : null}
          <SevenDayForecast location={this.state.location} isOffline={isOffline}/>
          <p className="App-blue-text">
            Forecast for your favourite cities <i>(Coming Soon)</i>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
