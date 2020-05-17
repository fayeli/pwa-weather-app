import React from 'react';
import { IonApp, IonPage, IonContent, IonListHeader } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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
    let path = window.location.pathname.replace('/', '');

    if (cities[path]) {
      locationName = cities[path].name;
      locationCoords = cities[path].coords;
    } else {
      path = 'current-location';
    }

    this.state = {
      path,
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
      path: city,
      locationName: cities[city].name,
      locationCoords: cities[city].coords,
    });
  }

  render() {
    const isOffline = this.state.isOffline;
    const userLocation = this.state.locationName === 'your current location';
    return (
      <IonApp>
        <IonReactRouter>
          <IonPage>
            <Header />
            <IonContent fullscreen style={{textAlign: 'center'}}>
              {isOffline ? <OfflineBanner /> : null}
                <h3 style={{ paddingTop: '50px' }}>7 Day Forecast for {this.state.locationName}</h3>
              {userLocation ? <UserLocation onSuccess={(coords) => this.setState({ locationCoords: coords })} isOffline={isOffline} /> : null}
              <SevenDayForecast
                name={this.state.path}
                coords={this.state.locationCoords}
                isOffline={isOffline} />
              <h3>Forecast for your favourite cities</h3>
              <CityList onSelect={(city) => this.selectLocation(city)} />
            </IonContent>
          </IonPage>
        </IonReactRouter>
      </IonApp>
    );
  }
}

export default App;
