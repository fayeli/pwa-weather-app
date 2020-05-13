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

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.getForecast();
        }
    }


    getForecast() {
        if (this.props.location == null) { return }; 
        openweather.get('/onecall', {
            params: {
                lat: this.props.location.lat,
                lon: this.props.location.lon,
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
                <ul>
                    {this.renderList()}
                </ul>
            </div>
        )
    }
}

export default SevenDayForecast;
