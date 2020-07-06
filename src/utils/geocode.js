
const http = require('http');
const weather = require('./weather');

function geocode(city = 'none', callback) {

    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoicGVkcm8tbHBmIiwiYSI6ImNrYno1eGxzZzE2Y2oydXAzbHZjY2JpeWQifQ.HDuwxcMvSkQcjp2u7rXgEg&limit=1`;

    const request = http.request(url, (response) => {

        let date = '';

        response.on('data', (chunk) => {
            try {
                return date = JSON.parse(date + chunk.toString())
            } catch (e) {
                return 'There was an unexpected error!!!', e;
            }
        });

        response.on('end', () => {
            try {
                return weather(date.features[0].place_name.toString(), date.features[0].center[1],
                    date.features[0].center[0], (a, b, c, d, e, f, g, h) => callback(a, b, c, d, e, f, g, h));
            } catch (e) {
                return callback(true), e;
            }
        });

        response.on('error', (error) => {
            return callback(error.message);
        });

    });

    return request.end();
};

module.exports = geocode;
