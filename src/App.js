import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import OfflineBanner from './components/OfflineBanner';
import UserLocation from './components/UserLocation';
import SevenDayForecast from './components/SevenDayForecast';
import CityList from './components/CityList';
import cities from './data/cities';

class App extends React.Component {
  constructor(props) {
    super(props);

    // initialize location based on url
    let locationName = 'your current location';
    let locationCoords = null;
    const path = window.location.pathname.replace('/', '');

    if (cities[path]) {
      locationName = cities[path].name;
      locationCoords = cities[path].coords;
    }

    this.state = {
      locationName,
      locationCoords,
      isOffline: !window.navigator.onLine,
    }
  }

  componentDidMount() {
    this.monitorNetworkStatus();
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

  render() {
    const isOffline = this.state.isOffline;
    const userLocation = this.state.locationName === 'your current location';
    return (
      <div className="App">
        <BrowserRouter>
          {isOffline ? <OfflineBanner /> : null}
          <Header />
          <h3>7 Day Forecast for {this.state.locationName}</h3>
          {userLocation ? <UserLocation onSuccess={(coords) => this.setState({ locationCoords: coords })} /> : null}
          <SevenDayForecast location={this.state.locationCoords} isOffline={isOffline} />
          <h3>Forecast for your favourite cities</h3>
          <CityList onSelect={(city) => this.selectLocation(city)} />
        </BrowserRouter>
      </div >
    );
  }
}

export default App;
