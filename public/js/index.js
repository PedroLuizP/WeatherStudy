const form = document.querySelector('form');
const search = document.querySelector('input');
const ul = document.querySelector('ul');
const body = document.querySelector('body');

form.addEventListener('submit', async function (e) {

    //Previne a atualização instatanea do navegador, permitindo a renderinização da pagina
    e.preventDefault();

    //Remove as li caso os campos ja estejam preenchidos
    ul.querySelectorAll('li').forEach(w => w.remove());

    //Verifica se há erros
    if (search.value === "" || search.value === " ") {
        const msg = 'Field of search is empty !!!'
        return erroMessage(msg)
    }

    if (!search.value.match(/[a-zA-Z]/g)) {
        const msg = 'Caracter Invalido ( ! @ # $ % & * ^ ) !!!'
        return erroMessage(msg)
    }

    //Normaliza a string para filtragem de erros
    const dataMain = search.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return processing(dataMain.toLocaleLowerCase(), e => {
        if (e.error) {
            erroMessage(e.erroMessage)
        } else {
            //Criando as li
            const datacity = document.createElement('li'), dataState = document.createElement('li'), dataTemperature = document.createElement('li'),
                dataFellsLike = document.createElement('li'), dataPrecipitation = document.createElement('li'), dataUmidity = document.createElement('li');

            //Defininso seus valores
            datacity.innerText = `City - ${e.city}`, dataState.innerText = `State - ${e.state}`, dataTemperature.innerText = `Temperature - ${e.temperature}`,
                dataFellsLike.innerText = `FellsLike - ${e.fellslike}`, dataPrecipitation.innerText = `Precipitation - ${e.precipitation}`, dataUmidity.innerText = `Humidity - ${e.humidity}`;

            //Adicionando seus valores
            ul.appendChild(datacity), ul.appendChild(dataState), ul.appendChild(dataTemperature), ul.appendChild(dataFellsLike), ul.appendChild(dataPrecipitation), ul.appendChild(dataUmidity);

            return search.value = '', search.focus();
        }
    });

});

function processing(city, callback) {
    const data = fetch(`http://localhost:3000/weather?address=${city}`).then((response) => {
        response.json().then((data) => {
            return callback(data);
        })
    });
    return;
}

function erroMessage(msg = null, erro = "") {
    console.log('passei aqui message')
    const errorMessage = document.createElement('li');
    errorMessage.innerText = `${msg} ${erro}`;
    errorMessage.style.color = "red";
    ul.appendChild(errorMessage);
    return search.value = '', search.focus();
}
