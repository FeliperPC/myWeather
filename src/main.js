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

const days = ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'];

btnSearch.addEventListener('click', async () => {
    const cityWeather = await getAPIweather();
    createWeatherContainer(cityWeather);
});

btnForecast.addEventListener('click',async ()=>{
   const cityWeather = await getAPIweather();
   forecastFilter(cityWeather);
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
    try{
        const cityWeather = await weather(city);
        return cityWeather;
    } catch(error){
        Swal.fire({
            icon: 'error',
            title:'Ops ... Algo deu errado.',
            text : error.message,
        });
    }
} 

const forecastFilter = (weatherData) => {
    const data = new Date(weatherData.days[0].datetime);
    
}