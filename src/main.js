import './style.css';
import Swal from 'sweetalert2';
import weather from './weather.js';
import translate from './languageAPI.js';

const imgLogo = document.querySelector('#img-logo');
const btnSearch = document.querySelector('#search-button');
const cityOutput = document.querySelector('#city');
const countryOutput = document.querySelector('#country');
const tempOutput = document.querySelector('#temp');
const descriptionOutput = document.querySelector('#temp-description');
const imgIconOutput = document.querySelector('#img-icon');
const weatherContainer = document.querySelector('#weather-container');
const btnForecast = document.querySelector('#btn-forecast');
const forecastContainer = document.querySelector('.forecast-container');

const days = ['Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.', 'Dom.'];

imgLogo.addEventListener('click', () => {
    location.reload(true);
});

btnSearch.addEventListener('click', async () => {
    btnForecast.disabled = false;
    while (forecastContainer.firstChild) {
        forecastContainer.removeChild(forecastContainer.firstChild);
    }
    forecastContainer.style.display = 'none';
    const cityWeather = await getAPIweather();
    createWeatherContainer(cityWeather);
});

btnForecast.addEventListener('click', async () => {
    btnForecast.disabled = true;
    const cityWeather = await getAPIweather();
    const daysForecast = await forecastContainerDays(cityWeather);
    createForecastContainer(daysForecast);
});

const createWeatherContainer = async (objData) => {
    const country = objData.resolvedAddress.split(',')[2];
    if (typeof country === 'undefined') {
        Swal.fire({
            icon: 'error',
            title: 'Ops ... Algo deu errado.',
            text: 'Isso não é uma cidade',
        });
    } else {
        weatherContainer.style.display = 'flex';
        cityOutput.innerText = objData.address;
        countryOutput.innerText = country;
        tempOutput.innerText = `${objData.currentConditions.temp}º`;
        descriptionOutput.innerText = await translate(objData.currentConditions.conditions);
        imgIconOutput.src = `./images/icons/${objData.currentConditions.icon}.png`;
    }
}

const getAPIweather = async () => {
    const city = document.querySelector('#input-city').value;
    try {
        const cityWeather = await weather(city);
        return cityWeather;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Ops ... Algo deu errado.',
            text: error.message,
        });
    }
}

const forecastContainerDays = async (weatherData) => {
    const data = new Date(weatherData.days[0].datetime);
    const arrayDays = [];
    for (let i = 1; i < 4; i += 1) {
        const objDay = {
            datetime: weatherData.days[i].datetime,
            tempmin: `${weatherData.days[i].tempmin}º`,
            tempmax: `${weatherData.days[i].tempmax}º`,
            conditions: await translate(weatherData.days[i].conditions),
            icon: weatherData.days[i].icon,
        }
        arrayDays.push(objDay);
    }
    return arrayDays;
}

const createForecastContainer = (daysAPI) => {
    daysAPI.forEach((day) => {
        const tempText = document.createElement('div');
        const tempBox = document.createElement('div');
        tempBox.id = 'temp-box';
        const dayOfTheWeek = new Date(day.datetime);
        const dayOutput = document.createElement('h1');
        dayOutput.innerText = days[dayOfTheWeek.getDay()];
        const mainBox = document.createElement('div');
        mainBox.classList.add('forecast-day')
        const tempMax = document.createElement('p');
        tempMax.innerText = `máx : ${day.tempmax}`;
        tempMax.style.fontWeight = 'bold';
        const tempMin = document.createElement('p');
        tempMin.innerText = `min : ${day.tempmin}`;
        const img = document.createElement('img');
        img.src = `./images/icons/${day.icon}.png`;
        const condition = document.createElement('p');
        condition.innerText = day.conditions;
        condition.style.fontStyle = 'italic';
        tempText.id = 'temp-text';
        tempText.appendChild(tempMax);
        tempText.appendChild(tempMin);
        mainBox.appendChild(dayOutput);
        mainBox.appendChild(tempBox);
        tempBox.appendChild(tempText);
        tempBox.appendChild(img);
        mainBox.appendChild(condition);

        forecastContainer.appendChild(mainBox);
    });
    forecastContainer.style.display = 'flex';
}