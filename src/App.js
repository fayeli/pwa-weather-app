import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import weatherSVG from './weather.svg';
import OfflineBanner from './components/OfflineBanner';
import SevenDayForecast from './components/SevenDayForecast';
import cities from './data/cities';

class App extends React.Component {
  constructor(props) {
    super(props);

    // initialize location based on url
    let locationName = 'your current location';
    let locationCoords = null;
    const path = window.location.pathname.replace('/','');

    if (cities[path]) {
      locationName = cities[path].name;
      locationCoords = cities[path].coords;
    }

    this.state = {
      locationName,
      locationCoords,
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
          locationCoords: {
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
      this.setState({ isOffline: true });
    });
    window.addEventListener('online', (event) => {
      this.setState({ isOffline: false });
    });
  }

  selectLocation = (city) => {
    this.setState({
      locationName: cities[city].name,
      locationCoords: cities[city].coords,
    });
  }

  renderCityList() {
    return Object.keys(cities).map((key) => {
      return (
        <li key={key}>
          <Link to={`/${key}`} onClick={() => this.selectLocation(key)}>
            {cities[key].name}
          </Link>
        </li>
      );
    });
  }

  renderUserLocation() {
    const isOffline = this.state.isOffline;
    const locationDenied = this.state.locationErrorCode === 1; // GeolocationPositionError.PERMISSION_DENIED
    return (
      <div>
        <button onClick={this.getUserLocation} disabled={isOffline}>Check Now ➜</button>
        {locationDenied ? <p>We're unable to get your location. Please check your permission settings and try again.</p> : null}
      </div>
    );
  }

  render() {
    const isOffline = this.state.isOffline;
    const userLocation = this.state.locationName === 'your current location';
    return (
      <div className="App">
        {isOffline ? <OfflineBanner /> : null}
        <BrowserRouter>
          <header className="App-header">
            <img src={weatherSVG} className="App-logo" alt="logo" />
            <p>
              Progressive Weather App
            </p>

            <p>7 Day Forecast for {this.state.locationName}</p>

            {userLocation ? this.renderUserLocation() : null}

            <SevenDayForecast location={this.state.locationCoords} isOffline={isOffline} />
          </header>
          <div className="App-blue-text">
            <p>Forecast for your favourite cities <i>(Coming Soon)</i></p>
            <ul>
              {this.renderCityList()}
            </ul>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
