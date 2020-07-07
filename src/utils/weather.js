
const http = require('http');

function weather(city, lat, lan, callback) {

    const url = process.env.CONNECTIONWEATHER;
    const cidade = city;

    const request = http.request(url, (response) => {
        let date = '';

        response.on('data', (chunk) => {
            try {
                return date = JSON.parse(date + chunk.toString());
            } catch (e) {
                return 'There was unexpected error!!!', e;
            }
        });

        response.on('error', (error) => {
            return error.message;
        });

        response.on('end', () => {
            return callback(cidade, date.current.weather_descriptions[0], date.current.temperature, date.current.feelslike,
                date.current.wind_speed, date.current.pressure, date.current.precip, date.current.humidity);
        });

    });

    return request.end()
};

module.exports = weather;
