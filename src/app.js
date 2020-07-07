const express = require('express');
const path = require('path');
const chalk = require('chalk');
const hbs = require('hbs');
const app = express();
const geocode = require("../src/utils/geocode");
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views');
const partialpath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');

app.set('views', viewspath);

hbs.registerPartials(partialpath);

app.use(express.static(publicPath))

app.get('', (req, res) => {

    return res.render('index', {
        title: 'Weather Page',
        name: 'Pedro Luiz'
    });
});

app.get('/weather', function (req, res) {
    
    if (!req.query.address) {
        res.render('404', {
            title: 'Not Found Address',
            name: "Pedro Luiz",
            messageError: 'Sorry but You must provide a search term!!!'
        })
    }

    const data = geocode(req.query.address, (...e) => {
        if (e[0] === true) {
            return res.send({error: 'error', messageError: 'Sorry but You must provide a search term!!!'});
        }

        res.send({
            city: e[0],
            state: e[1],
            temperature: e[2],
            fellslike: e[3],
            precipitation: e[6],
            humidity: e[7]
        })
    })

});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.render('404', {
            title: `Not Found Page ${req.query.search}`,
            name: "Pedro Luiz",
            messageError: 'Sorry but You must provide a search term!!!'
        })
    }

    res.send({
        products: [req.query]
    })
});

app.get('/about', (req, res) => {
    return res.render('about', {
        title: "About Page!",
        name: "Pedro Luiz"
    });
});

app.get('/help', (req, res) => {
    return res.render('help', {
        title: "Help Page!",
        name: 'Pedro Luiz'
    });
});

app.get('*', (req, res) => {
    return res.render('404', {
        title: 'Not Found Page',
        name: "Pedro Luiz",
        messageError: '404 Page Not Found!!'
    });
});

app.get('/about/*', (req, res) => {
    return res.render('404', {
        title: 'Not Found Page',
        name: "Pedro Luiz",
        messageError: '404 Page Not Found!!'
    });
});

app.get('/help/*', (req, res) => {
    return res.render('404', {
        title: 'Not Found Page',
        name: "Pedro Luiz",
        messageError: '404 Page Not Found!!'
    });
});

app.get('/index/*', (req, res) => {
    return res.render('404', {
        title: 'Not Found Page',
        name: "Pedro Luiz",
        messageError: '404 Page Not Found!!'
    });
});

app.listen(port, () => {
    console.log(chalk.green.inverse(`Server in up on port ${port}`))
});
