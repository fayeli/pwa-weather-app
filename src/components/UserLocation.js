import React from 'react';

class UserLocation extends React.Component {
    state = {
        locationCoords: null,
        locationError: null,
        locationErrorCode: null,
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
                });
                // Pass user coords to app's main state
                this.props.onSuccess({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            (err) => {
                this.setState({
                    locationError: err.message,
                    locationErrorCode: err.code
                });
            }
        );
    }

    render() {
        const isOffline = this.props.isOffline;
        const locationDenied = this.state.locationErrorCode === 1; // GeolocationPositionError.PERMISSION_DENIED
        return (
            <div>
                <button onClick={this.getUserLocation} disabled={isOffline}>Check Now ➜</button>
                {locationDenied ? <p>We're unable to get your location. Please check your permission settings and try again.</p> : null}
            </div>
        );
    }
}

export default UserLocation;
