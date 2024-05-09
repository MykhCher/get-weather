'use strict'

// Get DOM elements.
const radioName = document.querySelector('#city-name-radio');
const radioId = document.querySelector('#city-id-radio');

const nameInput = document.querySelector('#city-name');
const idInput = document.querySelector('#city-id');
const submitBtn = document.querySelector('.btn-container > input')

const temp = document.querySelector("#temp");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");

radioId.addEventListener('change', (e) => {
    nameInput.value = '';
    nameInput.disabled = true;
    idInput.disabled = false;
})

radioName.addEventListener('change', (e) => {
    idInput.value = '';
    idInput.disabled = true;
    nameInput.disabled = false;
})

const params = {
    url: 'https://api.openweathermap.org/data/2.5/',
    appid: '8156e4c2f49d869a37d8c165a4619d15',
}

function getWeather(e) {
    e.preventDefault();
    const query = {
        type: nameInput.disabled ? 'id' : 'q',
        value: nameInput.disabled ? idInput.value : nameInput.value
    };
    fetch(
        `${params.url}weather?${query.type}=${query.value}&units=metric&appid=${params.appid}`
    )
        .then(resp => resp.json())
        .then(data => {
            if (data.cod === '404') {
                document.querySelector('.errDiv').innerHTML = 'Enter valid city name or id.'
                temp.innerHTML = '-';
                wind.innerHTML = '-';
                humidity.innerHTML = '-';
            } else {
                document.querySelector('.errDiv').innerHTML = '';
                temp.innerHTML = data.main.temp;
                wind.innerHTML = data.wind.speed;
                humidity.innerHTML = data.main.humidity;
            }
        })
        .catch(err => {document.querySelector('.errDiv').innerHTML = 'Something went wrong. Please try again later.'})
}

submitBtn.addEventListener('click', getWeather);
