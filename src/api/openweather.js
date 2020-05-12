import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
    params: {
        appid: '8b35b6cffd8a00d3588e31a0fffc3c05'
    }
});
