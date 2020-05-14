import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import weatherSVG from './weather.svg';
import OfflineBanner from './components/OfflineBanner';
import SevenDayForecast from './components/SevenDayForecast';


const cities = {
  'hong-kong': {
    name: 'Hong Kong',
    coords: {
      lat: 22.28552,
      lon: 114.15769
    }
  },
  'singapore': {
    name: 'Singapore',
    coords: {
      lat: 1.28967,
      lon: 103.85007
    }
  },
  'san-francisco': {
    name: 'San Francisco',
    coords: {
      lat: 37.774929,
      lon: -122.419416
    }
  },
  'tokyo': {
    name: 'Tokyo',
    coords: {
      lat: 35.689487,
      lon: 139.691706
    }
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locationName: 'your current location',
      locationCoords: null,
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

  render() {
    const isOffline = this.state.isOffline;
    const locationDenied = this.state.locationErrorCode === 1; // GeolocationPositionError.PERMISSION_DENIED
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

            <Route path="/" exact>
              <button onClick={this.getUserLocation} disabled={isOffline}>Check Now ➜</button>
              {locationDenied ? <p>We're unable to get your location. Please check your permission settings and try again.</p> : null}
            </Route>

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
