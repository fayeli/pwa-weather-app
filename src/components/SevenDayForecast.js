import React from 'react';
import { IonChip } from '@ionic/react';
import moment from 'moment';
import openweather from '../api/openweather';
import Spinner from './Spinner';

class SevenDayForecast extends React.Component {
    constructor(props) {
        super(props);

        const name = this.props.name;
        const hasSaved = !!localStorage.getItem(`lastSaved_${name}`);

        this.state = {
            openweatherData: [],
            openweatherErr: null,
            isLoading: false,
            lastSaved: hasSaved ? JSON.parse(localStorage.getItem(`lastSaved_${name}`)) : null
        }
    }

    componentDidMount() {
        this.getForecast();
    }

    componentDidUpdate(prevProps) {
        if (this.props.name !== prevProps.name) {
            const name = this.props.name;
            const hasSaved = !!localStorage.getItem(`lastSaved_${name}`);
            this.setState({
                lastSaved: hasSaved ? JSON.parse(localStorage.getItem(`lastSaved_${name}`)) : null
            });
        }
        if (this.props.coords !== prevProps.coords) {
            this.getForecast();
        }
        if (this.props.isOffline !== prevProps.isOffline && !this.props.isOffline) {
            this.getForecast();
        }
    }

    getForecast() {
        if (this.props.isOffline) {
            this.retrieveOffline();
            return;
        }
        if (this.props.coords == null) { return }
        this.setState({ isLoading: true });
        openweather.get('/onecall', {
            params: {
                lat: this.props.coords.lat,
                lon: this.props.coords.lon,
                units: 'metric',
                exclude: 'current,hourly,minutely'
            }
        }).then(response => {
            this.setState({
                openweatherData: response.data.daily,
                isLoading: false
            });
        }).catch(error => {
            this.setState({
                openweatherErr: error,
                isLoading: false
            });
        });
    }

    retrieveOffline() {
        const name = this.props.name;
        const hasOfflineData = !!localStorage.getItem(`offlineData_${name}`);
        if (hasOfflineData) {
            const openweatherData = JSON.parse(localStorage.getItem(`offlineData_${name}`));
            this.setState({ openweatherData });
        } else {
            this.setState({ openweatherData: []});
        }
    }

    saveData = () => {
        const dateNow = Date.now();
        const name = this.props.name;
        this.setState({ lastSaved: dateNow });
        localStorage.setItem(`lastSaved_${name}`, JSON.stringify(dateNow));
        localStorage.setItem(`offlineData_${name}`, JSON.stringify(this.state.openweatherData));
    }

    renderList() {
        const isLoading = this.state.isLoading;
        const isOffline = this.props.isOffline;
        const hasData = this.state.openweatherData.length ? true : false;
        if (isOffline && !hasData) {
            // maybe TODO: schedule web request with background sync
            // maybe TODO: push notification when you are back online
            return <div>Oops.. you have not saved offline weather report for this location.</div>
        }
        if (isLoading) {
            return <Spinner />;
        }
        return (
            <ul>
                {this.state.openweatherData.map((data) => {
                    const description = data.weather[0].description;
                    const dayTemp = Math.round(data.temp.day);
                    const nightTemp = Math.round(data.temp.night);
                    const date = moment(data.dt * 1000).calendar().split(" ")[0];
                    return (
                        <li key={data.dt}>
                            {date}: {description}, day: {dayTemp}°C, night: {nightTemp}°C
                        </li>
                    )
                })}
            </ul>
        );
    }

    renderFooter() {
        const hasData = this.state.openweatherData.length ? true : false;
        if (!hasData) { return null }
        const hasSaved = !!this.state.lastSaved;
        return (
            <div>
                <IonChip color="secondary" onClick={this.saveData}>Save for Offline</IonChip>
                {hasSaved ? <p>Last saved - {moment(this.state.lastSaved).calendar()} </p> : null}
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderList()}
                {this.renderFooter()}
            </div>
        );
    }
}


export default SevenDayForecast;
