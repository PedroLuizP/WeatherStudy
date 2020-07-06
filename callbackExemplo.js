
const chalk = require('chalk');

setTimeout(() => {
    console.log(chalk.green.inverse('Three seconds are up!'))
}, 3000);


//Callback function
const geocode = (location, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }

        return callback(data);
    }, 2000)
};

//Callback funtion é executada quando o escopo a qual ela pertence e terminado de executar. respeitando assim a assincronidade
const teste = geocode('sao jose do rio preto', (data) => {
    console.log(data);
})
