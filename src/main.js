import './style.css';
import Swal from 'sweetalert2';
import weather from './weather.js'

const btnSearch = document.querySelector('#search-button');
const cityOutput = document.querySelector('#city');
const countryOutput = document.querySelector('#country');
const tempOutput = document.querySelector('#temp');
const descriptionOutput = document.querySelector('#temp-description');
const imgIconOutput = document.querySelector('#img-icon');

btnSearch.addEventListener('click', async () => {
    document.querySelector('#weather-container').style.display = 'block';
    const city = document.querySelector('#input-city').value;
    try{
        const weatherFromCity = await weather(city);
        updateInfoContainer(weatherFromCity);
    } catch(error){
        Swal.fire({
            icon: 'error',
            title:'Ops ... Algo deu errado.',
            text : error.message,
        });
    }
});

const updateInfoContainer = (objData) => {
    cityOutput.innerText = objData.address;
    countryOutput.innerText = objData.resolvedAddress.split(',')[2];
    tempOutput.innerText = objData.currentConditions.temp;
    descriptionOutput.innerText = objData.currentConditions.conditions;
    imgIconOutput.src = `./images/icons/${objData.currentConditions.icon}.png`;
}   