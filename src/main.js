import './style.css';
import Swal from 'sweetalert2';
import weather from './weather.js'

const btnSearch = document.querySelector('#search-button');
const weatherContainer = document.querySelector('#weather-container');

btnSearch.addEventListener('click', async () => {
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
          
}   