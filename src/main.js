import './style.css';
import Swal from 'sweetalert2';
import weather from './weather.js'

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

btnSearch.addEventListener('click', async () => {
    const cityWeather = await getAPIweather();
    createWeatherContainer(cityWeather);
});

btnForecast.addEventListener('click', async () => {
    const cityWeather = await getAPIweather();
    const daysForecast = forecastContainerDays(cityWeather);
    createForecastContainer(daysForecast);
});

const createWeatherContainer = (objData) => {
    weatherContainer.style.display = 'flex';
    cityOutput.innerText = objData.address;
    countryOutput.innerText = objData.resolvedAddress.split(',')[2];
    tempOutput.innerText = objData.currentConditions.temp;
    descriptionOutput.innerText = objData.currentConditions.conditions;
    imgIconOutput.src = `./images/icons/${objData.currentConditions.icon}.png`;
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

const forecastContainerDays = (weatherData) => {
    const data = new Date(weatherData.days[0].datetime);
    const arrayDays = [];
    for (let i = 1; i < 4; i += 1) {
        const objDay = {
            datetime: weatherData.days[i].datetime,
            tempmin: weatherData.days[i].tempmin,
            tempmax: weatherData.days[i].tempmax,
            conditions: weatherData.days[i].conditions,
            icon: weatherData.days[i].icon,
        }
        arrayDays.push(objDay);
    }
    return arrayDays;
}

const createForecastContainer = (daysAPI) => {
    daysAPI.forEach((day)=>{
        const dayBox = document.createElement('div');
        const dayOfTheWeek = new Date(day.datetime);
        const dayOutput = document.createElement('h1');
        dayOutput.id = 'forecast-day';
        dayOutput.innerText = days[dayOfTheWeek.getDay()];
        const tempMax = document.createElement('p');
        tempMax.innerText =`máx : ${day.tempmax}`;
        tempMax.style.fontWeight ='bold';
        const tempMin = document.createElement('p');
        tempMin.innerText = `min : ${day.tempmin}`;
        const img = document.createElement('img');
        img.src = `./images/icons/${day.icon}.png`;
        const condition = document.createElement('p');
        condition.innerText = day.conditions;
        condition.id = 'condition-forecast';

        dayBox.appendChild(dayOutput);
        dayBox.appendChild(tempMax);
        dayBox.appendChild(tempMin);
        dayBox.appendChild(condition);
        forecastContainer.appendChild(dayBox);
        forecastContainer.appendChild(img);
    });
    forecastContainer.style.display='flex';
}