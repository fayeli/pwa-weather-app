import React from 'react';
import moment from 'moment';
import openweather from '../api/openweather';
import Spinner from './Spinner';

class SevenDayForecast extends React.Component {
    state = {
        openweatherData: [],
        openweatherErr: null,
        isLoading: false,
        lastSaved: null,
    }

    componentDidMount() {
        this.getForecast();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.getForecast();
        }
    }

    getForecast() {
        if (this.props.location == null) { return }
        this.setState({ isLoading: true });
        openweather.get('/onecall', {
            params: {
                lat: this.props.location.lat,
                lon: this.props.location.lon,
                units: 'metric',
                exclude: 'current,hourly,minutely'
            }
        }).then(response => {
            console.log(response.data);
            this.setState({
                openweatherData: response.data.daily,
                isLoading: false
            });
        }).catch(error => {
            console.log(error);
            this.setState({
                openweatherErr: error,
                isLoading: false
            });
        });
    }

    saveData = () => {
        const dateNow = Date.now();
        this.setState({ lastSaved: dateNow });
        localStorage.setItem('lastSaved', dateNow);
        localStorage.setItem('offlineData', JSON.stringify(this.state.openweatherData));
    }

    renderList() {
        const isLoading = this.state.isLoading;
        if (isLoading) {
            return <Spinner />;
        }
        return (
            <ul>
                {this.state.openweatherData.map((data) => {
                    const description = data.weather[0].description;
                    const dayTemp = Math.round(data.temp.day);
                    const nightTemp = Math.round(data.temp.night);
                    return (
                        <li key={data.dt}>
                            {description}, day: {dayTemp}°C, night: {nightTemp}°C
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
                <button onClick={this.saveData}>Save for Offline</button>
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
