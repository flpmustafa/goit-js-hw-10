import './css/styles.css';
import Notiflix from 'notiflix';
import {fetchCountries} from './fetchCountries';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const textInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
countryList.style.padding = '0';

const countryInfo = document.querySelector('.country-info');


function clearData(output) {
    output.innerHTML = '';
  }

const seachCountry = ev => {
    const name = textInput.value.trim();
    
    fetchCountries(name)
    .then(data => { 
        createMarkup(data);
    })
    .catch(error => {
        if (name !== '') {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        }
    });
    ev.preventDefault();
 }

function createMarkup(arr) {
    if (arr.length > 10) {
        clearData(countryList);
        clearData(countryInfo);

        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else 
    if (arr.length > 1 && arr.length <= 10) {
        clearData(countryList);
        clearData(countryInfo);
    

    const markupStart = arr.map(({
        name,
        flags,
    }) => 
    `<li style="display: flex; gap: 10px; align-items: center;">
    <img src="${flags.svg}" alt="${name.official}" width="60" height="30">
    <p>${name.official}</p>
    </li>`).join('');

    countryList.insertAdjacentHTML('beforeend', markupStart)
} else {
    clearData(countryList);
    clearData(countryInfo);
    
    const markupEnd = arr.map(({
        name,
        flags,
        capital,
        population,
        languages,  
    }) => 
    `
    <div class="country-prew">
            <img 
                src="${flags.svg}" 
                alt="${name.official}" 
                width="60">
        <div class="country-descr">    
            <h3>${name.official}</h3>
            <p><b>Capital:&nbsp</b>${capital}</p>
            <p><b>Population:&nbsp</b>${population}</p>  
            <p><b>languages:&nbsp</b>${Object.values(languages)}</p>
    </div>
    </div>`).join('');

    countryList.insertAdjacentHTML('beforeend', markupEnd);
}
}

textInput.addEventListener('input', debounce(seachCountry, DEBOUNCE_DELAY));


