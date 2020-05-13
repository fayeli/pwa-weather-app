import React from 'react';
import openweather from '../api/openweather';

class SevenDayForecast extends React.Component {
    state = {
        openweatherData: [], // TODO: save to local storage
        openweatherErr: null
    }

    componentDidMount() {
        this.getForecast();
    }

    getForecast() {
        openweather.get('/onecall', {
            params: {
                lat: this.props.lat,
                lon: this.props.lon,
                units: 'metric',
                exclude: 'current,hourly,minutely'
            }
        }).then(response => {
            console.log(response.data);
            this.setState({openweatherData: response.data.daily});
        }).catch(error => {
            console.log(error);
            this.setState({openweatherErr: error});
        });
    }

    renderList() {
        return this.state.openweatherData.map((data) => {
            const description = data.weather[0].description;
            const dayTemp = Math.round(data.temp.day);
            const nightTemp = Math.round(data.temp.night);
            return (
                <li key={data.dt}>
                    {description}, day: {dayTemp}°C, night: {nightTemp}°C
                </li>
            )
        });
    }

    render() {
        return (
            <div>
                <p>7 Day Forecast for (latitude: {this.props.lat}, longitude: {this.props.lon})</p>
                <ul>
                    {this.renderList()}
                </ul>
            </div>
        )
    }
}

export default SevenDayForecast;
