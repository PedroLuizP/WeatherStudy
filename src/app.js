
/*

Documentação
express = http://expressjs.com/en/4x/api.html#app.get
hbs = https://handlebarsjs.com/guide/

Rotas
app.com
app.com/help
app.com/about

get = Determina o que deve ser feito quando a rota for socilitada

app.set('views', viewspath) = ikjPersonaliza o caminha onde vai estar os arquivos hbs

*/

const express = require('express');
const path = require('path');
const chalk = require('chalk');
const hbs = require('hbs');
const app = express();
const geocode = require("../src/utils/geocode");

const publicPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views');
const partialpath = path.join(__dirname, '../templates/partials');

//Renderiza páginas interativas. Pode-se usar o EJS ou no casso desse curso Handlebarsjs (Se comportam como htm)
app.set('view engine', 'hbs');

//Passando o caminho a onde se encontra os arquivos HBS
app.set('views', viewspath);

//Arquivos parciais, footer head - Arquivos que podem estar em varias paginas - estáticos.
hbs.registerPartials(partialpath);

//Renderiza as páginas html na tela do navegador exemplo (localhost:3000about.html)
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

//Query é o canal aonde obtem as informaçãoes passadas pela url (http://localhost:3000/products?search=games&rating=5)
app.get('/products', (req, res) => {

    //Se na url não tiver search ou se search estiver vazia, ira ezecutar o codigo abaixo
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

// * = Coringa todas as páginas que não forem carregadas
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

app.listen('3000', () => {
    console.log(chalk.green.inverse('Server in up on port 3000.'))
});
